import {
  clearImportChannel,
  createSyncChannel,
  pollImportChannel,
  setupSync,
} from 'BrightID/components/Onboarding/ImportFlow/thunks/channelThunks';
import {
  resetRecoveryData,
  selectRecoveryStep,
  setRecoverStep,
  uploadCompletedByOtherSide,
} from 'BrightID/components/Onboarding/RecoveryFlow/recoveryDataSlice';
import { RecoveryErrorType } from 'BrightID/components/Onboarding/RecoveryFlow/RecoveryError';
import { createRecoveryChannel } from 'BrightID/components/Onboarding/RecoveryFlow/thunks/channelThunks';
import {
  setRecoveryKeys,
  setupRecovery,
} from 'BrightID/components/Onboarding/RecoveryFlow/thunks/recoveryThunks';
import { setUserId, userSelector } from 'BrightID/reducer/userSlice';
import {
  recover_steps,
  RecoveryCodeScreenAction,
  urlTypesOfActions,
} from 'BrightID/utils/constants';
import { getExplorerCode } from 'BrightID/utils/explorer';
import { buildRecoveryChannelQrUrl } from 'BrightID/utils/recovery';
import { LOCATION_ORIGIN } from 'constants/index';
import { AURA_NODE_URL } from 'constants/urls';
import qrcode from 'qrcode';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'store/hooks';
import { loginByExplorerCodeThunk } from 'store/profile/actions';
import { selectIsLoggedIn } from 'store/profile/selectors';
import { RoutePath } from 'types/router';
import { copyToClipboard } from 'utils/copyToClipboard';
import { __DEV__ } from 'utils/env';

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
        : RecoveryCodeScreenAction.ADD_SUPER_USER_APP,
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

    async function runEffect() {
      if (step === recover_steps.NOT_STARTED) {
        dispatch(setRecoverStep(recover_steps.INITIALIZING));
        try {
          // if (action === 'recovery') {
          //   if (!id) {
          //     console.log(`initializing recovery process`);
          //     runRecoveryEffect();
          //   } else {
          //     console.log(`Not starting recovery process, user has id!`);
          //   }
          // } else
          if (action === RecoveryCodeScreenAction.ADD_SUPER_USER_APP) {
            console.log(`initializing import process`);
            await runImportEffect();
            dispatch(setRecoverStep(recover_steps.INITIALIZED));
          } else if (action === RecoveryCodeScreenAction.SYNC) {
            console.log(`initializing sync process`);
            await runSyncEffect();
            dispatch(setRecoverStep(recover_steps.INITIALIZED));
          } else {
            dispatch(setRecoverStep(recover_steps.NOT_STARTED));
          }
        } catch (_e) {
          dispatch(setRecoverStep(recover_steps.NOT_STARTED));
        }
      }
    }

    runEffect();
  }, [action, dispatch, id, step]);

  // set QRCode and SVG
  useEffect(() => {
    if (recoveryData.channel.url && recoveryData.aesKey) {
      const channelUrl = recoveryData.channel.url;
      const newQrUrl = buildRecoveryChannelQrUrl({
        aesKey: recoveryData.aesKey,
        url: channelUrl.href.startsWith(LOCATION_ORIGIN)
          ? {
              href: channelUrl.href.replace(
                LOCATION_ORIGIN + '/auranode',
                AURA_NODE_URL,
              ),
            }
          : channelUrl,
        t: urlTypesOfActions[action],
        changePrimaryDevice: false,
        name: 'Aura',
      });
      console.log(`new qrCode url: ${newQrUrl.href}`);
      setQrUrl(newQrUrl);
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
      if (action === RecoveryCodeScreenAction.ADD_SUPER_USER_APP) {
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
  const userIsLogged = useSelector(selectIsLoggedIn); // Your hook to get login status
  const routerLocation = useLocation();
  const redirectAfterLogin = useCallback(() => {
    if (routerLocation.pathname === RoutePath.LOGIN) {
      const next = query.get('next');
      navigate(next ?? RoutePath.DASHBOARD, { replace: true });
    }
  }, [routerLocation.pathname, navigate, query]);
  useEffect(() => {
    if (action === RecoveryCodeScreenAction.ADD_SUPER_USER_APP) {
      if (userIsLogged) {
        redirectAfterLogin();
      } else if (recoveryData.id && user.password) {
        setImportedUserData(true);
        clearImportChannel();
        dispatch(setRecoveryKeys());
        dispatch(resetRecoveryData());
        dispatch(setUserId(recoveryData.id));
        const explorerCode = getExplorerCode(recoveryData.id, user.password);
        console.log({ explorerCode });
        dispatch(
          loginByExplorerCodeThunk({ explorerCode, password: user.password }),
        ).then(redirectAfterLogin);
      }
    } else if (action === RecoveryCodeScreenAction.SYNC && isScanned) {
      navigate({
        pathname: '/devices',
        search: `?${createSearchParams({
          syncing: 'true',
          asScanner: 'false',
        })})`,
      });
    }
  }, [
    action,
    dispatch,
    isScanned,
    navigate,
    query,
    recoveryData.id,
    redirectAfterLogin,
    user,
    userIsLogged,
  ]);
  const universalLink = useMemo(
    () =>
      qrUrl
        ? `https://app.brightid.org/connection-code/${encodeURIComponent(
            qrUrl.href,
          )}`
        : null,
    [qrUrl],
  );

  useEffect(() => {
    if (universalLink) {
      qrcode.toString(universalLink, (_err, qr) => setQrSvg(qr));
    }
  }, [universalLink]);
  const copyQr = () => {
    if (!universalLink) return;

    let alertText = '';
    let clipboardMsg = '';
    switch (action) {
      case RecoveryCodeScreenAction.ADD_SUPER_USER_APP:
        alertText = 'Open this link with the BrightID app.';
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
    copyToClipboard(universalLink);

    if (__DEV__) {
      clipboardMsg = universalLink;
    }

    alert(alertText + '\n' + clipboardMsg);
  };

  return (
    <>
      {importedUserData ? (
        <div className="card">Logging in to Arua...</div>
      ) : (
        <div>
          <p className="card mb-2">
            Please scan this QR code using your other device
          </p>
          {qrSvg ? (
            <div>
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(qrSvg)}`}
                alt="qrcode"
              />
              {universalLink && (
                <div className="card mt-2 break-words">
                  <p>Or open this link on your mobile phone:</p>
                  <a
                    className="mt-2 text-blue-900 underline"
                    href={universalLink}
                  >
                    {universalLink}
                  </a>
                  <button className="btn mt-4" onClick={copyQr}>
                    Copy
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>loading...</div>
          )}
        </div>
      )}
    </>
  );
};

export default RecoveryCodeScreen;
