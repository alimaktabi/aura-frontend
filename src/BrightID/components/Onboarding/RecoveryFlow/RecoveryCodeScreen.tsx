import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'store/hooks';
import { RecoveryErrorType } from 'BrightID/components/Onboarding/RecoveryFlow/RecoveryError.ts';
import { setupRecovery } from 'BrightID/components/Onboarding/RecoveryFlow/thunks/recoveryThunks.ts';
import { buildRecoveryChannelQrUrl } from 'BrightID/utils/recovery';
import { createRecoveryChannel } from 'BrightID/components/Onboarding/RecoveryFlow/thunks/channelThunks.ts';
import qrcode from 'qrcode';
import {
  resetRecoveryData,
  selectRecoveryStep,
  setRecoverStep,
  uploadCompletedByOtherSide,
} from 'BrightID/components/Onboarding/RecoveryFlow/recoveryDataSlice.ts';
import {
  clearImportChannel,
  createSyncChannel,
  pollImportChannel,
  setupSync,
} from 'BrightID/components/Onboarding/ImportFlow/thunks/channelThunks.ts';
import {
  recover_steps,
  RecoveryCodeScreenAction,
  urlTypesOfActions,
} from 'BrightID/utils/constants';
import { setUserId, userSelector } from 'BrightID/reducer/userSlice';
import { __DEV__, AURA_PRODUCTION_NODE_URL } from 'utils/constants.ts';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { loginByExplorerCodeThunk } from 'store/profile/actions.ts';
import { getExplorerCode } from 'BrightID/utils/explorer.ts';
import { RoutePath } from 'Routes.tsx';

/**
 * Recovery Code screen of BrightID/
 *
 * displays a qrcode
 */

const RecoveryCodeScreen = () => {
  const { action: actionParam } = useParams();
  const action: RecoveryCodeScreenAction = useMemo(
    () =>
      actionParam
        ? (actionParam as RecoveryCodeScreenAction)
        : RecoveryCodeScreenAction.IMPORT,
    [actionParam],
  );
  const navigate = useNavigate();
  const [qrUrl, setQrUrl] = useState<{ href: string } | null>(null);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const recoveryData = useSelector((state) => state.recoveryData);
  const { id } = useSelector(userSelector);
  const isScanned = useSelector(
    (state) =>
      uploadCompletedByOtherSide(state) ||
      state.recoveryData.recoveredConnections ||
      state.recoveryData.recoveredGroups ||
      state.recoveryData.recoveredBlindSigs,
  );
  const dispatch = useDispatch();
  const step = useSelector(selectRecoveryStep);

  // start polling recovery channel to get sig and mutual info
  // useEffect(() => {
  //   if (
  //     action === 'recovery' &&
  //     recoveryData.recoverStep === recover_steps.POLLING_SIGS &&
  //     !recoveryData.channel.pollTimerId
  //   ) {
  //     dispatch(pollRecoveryChannel());
  //   }
  // }, [
  //   action,
  //   dispatch,
  //   recoveryData.channel.pollTimerId,
  //   recoveryData.recoverStep,
  // ]);

  // create recovery data and start polling channel
  useEffect(() => {
    // const runRecoveryEffect = async () => {
    //   // create publicKey, secretKey, aesKey for user
    //   await dispatch(setupRecovery());
    //   // create channel and upload new publicKey to get signed by the scanner
    //   await dispatch(createRecoveryChannel());
    //   dispatch(setRecoverStep(recover_steps.POLLING_SIGS));
    // };
    const runImportEffect = async () => {
      // create publicKey, secretKey, aesKey for user
      await dispatch(setupRecovery());
      // create channel and upload new publicKey to be added as a new signing key by the scanner
      await dispatch(createRecoveryChannel());
      // start polling channel to get connections/groups/blindsigs info
      dispatch(pollImportChannel());
    };
    const runSyncEffect = async () => {
      // create a new aesKey
      await dispatch(setupSync());
      // create channel and upload lastSyncTime to the channel if it is not primary device
      // or poll lastSyncTime from other side if it is and then upload connections/groups/blindsigs
      // added after lastSyncTime to the channel
      await dispatch(createSyncChannel());
      // start polling channel to get new connections/groups/blindsigs info
      dispatch(pollImportChannel());
    };

    if (step === recover_steps.NOT_STARTED) {
      // if (action === 'recovery') {
      //   if (!id) {
      //     console.log(`initializing recovery process`);
      //     runRecoveryEffect();
      //   } else {
      //     console.log(`Not starting recovery process, user has id!`);
      //   }
      // } else
      if (action === RecoveryCodeScreenAction.IMPORT) {
        console.log(`initializing import process`);
        runImportEffect();
      } else if (action === RecoveryCodeScreenAction.SYNC) {
        console.log(`initializing sync process`);
        runSyncEffect();
      }
    }
  }, [action, dispatch, id, step]);

  // set QRCode and SVG
  useEffect(() => {
    if (recoveryData.channel.url && recoveryData.aesKey) {
      const channelUrl = recoveryData.channel.url;
      const newQrUrl = buildRecoveryChannelQrUrl({
        aesKey: recoveryData.aesKey,
        url: channelUrl.href.startsWith(location.origin)
          ? {
              href: channelUrl.href.replace(
                location.origin + '/auranode',
                AURA_PRODUCTION_NODE_URL,
              ),
            }
          : channelUrl,
        t: urlTypesOfActions[action],
        changePrimaryDevice: false,
      });
      console.log(`new qrCode url: ${newQrUrl.href}`);
      setQrUrl(newQrUrl);
      qrcode.toString(newQrUrl.href, (_err, qr) => setQrSvg(qr));
    }
  }, [action, recoveryData.aesKey, recoveryData.channel.url]);

  // track errors
  useEffect(() => {
    if (recoveryData.errorType !== RecoveryErrorType.NONE) {
      // something went wrong. Show error message to user and stop recovery process
      let message;
      switch (recoveryData.errorType) {
        case RecoveryErrorType.MISMATCH_ID:
          message = 'Your recovery connections selected different accounts';
          break;
        case RecoveryErrorType.GENERIC:
        default:
          // use untranslated errorMessage from state if available, generic message otherwise
          message =
            recoveryData.errorMessage !== ''
              ? recoveryData.errorMessage
              : 'An unknown error occured';
      }
      alert('Account recovery failed: ' + message);
      if (action === RecoveryCodeScreenAction.IMPORT) {
        clearImportChannel();
      }
      dispatch(resetRecoveryData());
      dispatch(setRecoverStep(recover_steps.ERROR));
      navigate(-1);
    }
  }, [
    action,
    dispatch,
    navigate,
    recoveryData.errorMessage,
    recoveryData.errorType,
  ]);

  const user = useSelector((state) => state.user);
  const [query] = useSearchParams();
  const [importedUserData, setImportedUserData] = useState(false);
  useEffect(() => {
    if (
      action === RecoveryCodeScreenAction.IMPORT &&
      recoveryData.id &&
      user.password
    ) {
      setImportedUserData(true);
      dispatch(setUserId(recoveryData.id));
      const explorerCode = getExplorerCode(recoveryData.id, user.password);
      console.log({ explorerCode });
      dispatch(
        loginByExplorerCodeThunk({ explorerCode, password: user.password }),
      ).then(() => {
        if (location.pathname === RoutePath.LOGIN) {
          const next = query.get('next');
          navigate(next ?? RoutePath.DASHBOARD, { replace: true });
        }
      });
    } else if (action === RecoveryCodeScreenAction.SYNC && isScanned) {
      navigate({
        pathname: '/devices',
        search: `?${createSearchParams({
          syncing: 'true',
          asScanner: 'false',
        })})`,
      });
    }
  }, [action, dispatch, isScanned, navigate, query, recoveryData.id, user]);

  const copyQr = () => {
    if (!qrUrl) return;
    const universalLink = `https://app.brightid.org/connection-code/${encodeURIComponent(
      qrUrl.href,
    )}`;

    let alertText = '';
    let clipboardMsg = '';
    switch (action) {
      case RecoveryCodeScreenAction.IMPORT:
        alertText =
          'Open this link with the BrightID app that should be imported.';
        clipboardMsg = universalLink;
        break;
      case RecoveryCodeScreenAction.SYNC:
        alertText =
          'Open this link with the BrightID app that should be synced.';
        clipboardMsg = universalLink;
        break;
      default:
        break;
    }

    if (__DEV__) {
      clipboardMsg = universalLink;
    }

    alert(alertText + '\n' + clipboardMsg);
  };

  return (
    <>
      {importedUserData ? (
        <div>Logging in to Arua...</div>
      ) : (
        <div>
          <p>Please scan this QR code using your other device</p>
          {qrSvg ? (
            <div>
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(qrSvg)}`}
              />
              <button onClick={copyQr}>Copy</button>
              {__DEV__ && (
                <div>
                  <span>{qrUrl?.href}</span>
                </div>
              )}
            </div>
          ) : (
            <div>loading...</div>
          )}
          <p>This QR code should be scanned using your other device</p>
        </div>
      )}
    </>
  );
};

export default RecoveryCodeScreen;
