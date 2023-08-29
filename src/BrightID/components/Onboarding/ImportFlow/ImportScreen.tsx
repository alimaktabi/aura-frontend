import React, { useEffect } from 'react';
import { div, p, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';
import { useTranslation } from 'react-i18next';
import { setPrimaryDevice, setUserId } from 'BrightID/actions';
import { useDispatch, useSelector } from 'store/hooks';
import { BLACK, ORANGE } from 'BrightID/theme/colors';
import { fontSize } from 'BrightID/theme/fonts';
import { DEVICE_LARGE } from 'BrightID/utils/deviceConstants';
import { setRecoveryKeys } from 'BrightID/components/Onboarding/RecoveryFlow/thunks/recoveryThunks.ts';
import {
  resetRecoveryData,
  setRecoveryError,
  uploadCompletedByOtherSide,
} from 'BrightID/components/Onboarding/RecoveryFlow/recoveryDataSlice.ts';
import { clearImportChannel } from 'BrightID/components/Onboarding/ImportFlow/thunks/channelThunks.ts';
import { RecoveryErrorType } from 'BrightID/components/Onboarding/RecoveryFlow/RecoveryError';

/* Component to track import restore */
const ImportScreen = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const recoveryData = useSelector((state) => state.recoveryData);
  const importCompleted = useSelector(uploadCompletedByOtherSide);

  useEffect(() => {
    if (importCompleted) {
      clearImportChannel();
      try {
        dispatch(setRecoveryKeys());
        dispatch(setPrimaryDevice(!!route.params.changePrimaryDevice));
        dispatch(resetRecoveryData());
        dispatch(setUserId(recoveryData.id));
      } catch (err) {
        const errorString = err instanceof Error ? err.message : `${err}`;
        dispatch(
          setRecoveryError({
            errorType: RecoveryErrorType.GENERIC,
            errorMessage: errorString,
          }),
        );
      }
    }
  }, [recoveryData, dispatch, importCompleted]);

  return (
    <div style={styles.container}>
      <div style={styles.waitingContainer}>
        <p style={styles.infoText}>{t('import.text.waitImporting')}</p>
        <Spinner
          isVisible={true}
          size={DEVICE_LARGE ? 64 : 44}
          type="Wave"
          color={ORANGE}
        />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: BLACK,
    fontSize: fontSize[16],
    maxWidth: '90%',
  },
});

export default ImportScreen;
