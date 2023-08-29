import React, { useContext, useEffect, useState } from 'react';
import {
  button,
  div,
  FlatList,
  p,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'store/hooks';
import { selectActiveDevices } from 'BrightID/reducer/devicesSlice';
import { fontSize } from 'BrightID/theme/fonts';
import {
  BLACK,
  BLUE,
  DARK_ORANGE,
  DARKER_GREY,
  GREY,
  ORANGE,
  RED,
  WHITE,
} from 'BrightID/theme/colors';
import { DEVICE_LARGE } from 'BrightID/utils/deviceConstants';
import { NodeApiContext } from 'BrightID/components/NodeApiGate';
import {
  removeDevice,
  selectIsPrimaryDevice,
  selectKeypair,
  setLastSyncTime,
  setPrimaryDevice,
} from 'BrightID/actions';
import { qrCodeURL_types } from 'BrightID/utils/constants';
import {
  clearImportChannel,
  getOtherSideDeviceInfo,
  pollImportChannel,
} from 'BrightID/components/Onboarding/ImportFlow/thunks/channelThunks.ts';
import {
  resetRecoveryData,
  selectRecoveryChannel,
  uploadCompletedByOtherSide,
} from 'BrightID/components/Onboarding/RecoveryFlow/recoveryDataSlice.ts';
import {
  uploadAllInfoAfter,
  uploadDeviceInfo,
} from 'BrightID/components/Onboarding/ImportFlow/thunks/channelUploadThunks.ts';

/* Description */

/* ======================================== */

/**
 * Screen for listing devices
 */

/* Devices Screen */

/* ======================================== */
export const DevicesScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const api = useContext(NodeApiContext);
  const { publicKey: signingKey } = useSelector(selectKeypair);
  const devices = useSelector(selectActiveDevices).sort((a, _b) =>
    a.signingKey === signingKey ? -1 : 1,
  );
  const settings = useSelector((state) => state.settings);
  const syncCompleted = useSelector(uploadCompletedByOtherSide);
  const isPrimary = useSelector(selectIsPrimaryDevice);
  const { url, channelId } = useSelector(selectRecoveryChannel);

  const shortenSigningKey = (s) => `${s.slice(0, 6)}...${s.slice(-6)}`;
  const isCurrentDevice = (d) => d.signingKey === signingKey;
  const getName = (d) =>
    isCurrentDevice(d) ? 'Current device' : d.name || 'Unknown name';
  const [waiting, setWaiting] = useState(!!route.params?.syncing);

  useEffect(() => {
    const runEffect = async () => {
      const { isPrimaryDevice: otherPrimary, lastSyncTime } =
        await getOtherSideDeviceInfo(url, channelId);
      if (otherPrimary && isPrimary) {
        setWaiting(false);
        dispatch(resetRecoveryData());
        alert('Both primary');
      } else if (!otherPrimary && !isPrimary) {
        setWaiting(false);
        dispatch(resetRecoveryData());
        alert('No primary device');
      }
      if (!isPrimary) {
        await dispatch(uploadDeviceInfo());
      }
      const after = isPrimary ? lastSyncTime : settings.lastSyncTime;
      await dispatch(uploadAllInfoAfter(after));
      dispatch(pollImportChannel());
    };
    const showConfirmDialog = () => {
      return alert(
        t('common.alert.title.pleaseConfirm'),
        t('devices.alert.confirmSync'),
        [
          {
            text: t('common.alert.yes'),
            onClick: () => {
              runEffect();
            },
          },
          {
            text: t('common.alert.no'),
            onClick: () => {
              navigation.navigate('HomeScreen');
            },
          },
        ],
      );
    };
    if (route.params?.asScanner) {
      showConfirmDialog();
    }
  }, [
    dispatch,
    navigation,
    route.params?.asScanner,
    isPrimary,
    settings.lastSyncTime,
    t,
    url,
    channelId,
  ]);

  useEffect(() => {
    setWaiting(!!route.params?.syncing);
  }, [route.params?.syncing]);

  useFocusEffect(() => {
    // this is triggered when navigating back from sync code screen
    if (waiting && syncCompleted) {
      alert(t('common.alert.info'), t('devices.text.syncCompleted'));
      clearImportChannel();
      setWaiting(false);
      if (!isPrimary) {
        dispatch(setLastSyncTime(Date.now()));
      }
      dispatch(resetRecoveryData());
    }
  });

  const sync = () => {
    navigation.navigate('SyncCode', {
      urlType: qrCodeURL_types.SYNC,
      action: 'sync',
    });
  };

  const remove = (device) => {
    alert(
      t('common.alert.title.pleaseConfirm'),
      t('devices.alert.confirmRemove', { name: getName(device) }),
      [
        {
          text: t('common.alert.yes'),
          onClick: () => {
            api.removeSigningKey(device.signingKey).then(() => {
              dispatch(removeDevice(device.signingKey));
            });
          },
        },
        {
          text: t('common.alert.no'),
        },
      ],
    );
  };

  const renderItem = ({ item: device, index }) => (
    <div testID={`device-${index}`} style={styles.deviceContainer}>
      <div testID={getName(device)} style={styles.deviceLabelContainer}>
        <div style={styles.deviceNameContainer}>
          <p style={styles.deviceNameText}>{getName(device)}</p>
          {isCurrentDevice(device) && (
            <p style={styles.devicePrimaryText}>
              &nbsp;({isPrimary ? 'Primary' : 'Secondary'})
            </p>
          )}
        </div>
        <div style={styles.deviceSigningKeyContainer}>
          <p style={styles.deviceSigningKeyText}>
            {shortenSigningKey(device.signingKey)}
          </p>
        </div>
      </div>
      {!isCurrentDevice(device) && (
        <div style={styles.removeBtnContainer}>
          <button
            style={styles.removeBtn}
            testID={`RemoveDeviceBtn-${index}`}
            onClick={() => remove(device)}
          >
            <Material
              name="delete"
              size={DEVICE_LARGE ? 22 : 20}
              color={BLUE}
            />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={ORANGE}
        animated={true}
      />
      <div style={styles.orangeTop} />
      <ScrollView style={styles.container} testID="DevicesScreen">
        <div style={styles.devicesContainer}>
          <p style={styles.description}>{t('devices.text.listDescription')}</p>
          <FlatList
            data={devices}
            renderItem={renderItem}
            keyExtractor={(item) => item.signingKey}
          />
          {waiting ? (
            <div style={styles.waitingContainer}>
              <p style={styles.waitingMessage}>
                {t('devices.text.waitSyncing')}
              </p>
              <Spinner
                isVisible={waiting}
                size={DEVICE_LARGE ? 48 : 42}
                type="Wave"
                color={BLUE}
              />
            </div>
          ) : (
            <button style={styles.syncBtn} testID="SyncBtn" onClick={sync}>
              <div style={styles.syncBtnContainer}>
                <Material
                  name="sync"
                  size={DEVICE_LARGE ? 22 : 20}
                  color={WHITE}
                />
                <p style={styles.syncText}>Sync Devices</p>
              </div>
            </button>
          )}
          <div style={styles.primaryDeviceSwitchContainer}>
            <p
              style={styles.primaryDeviceSwitchLabel}
              onClick={() => {
                dispatch(setPrimaryDevice(!isPrimary));
              }}
            >
              {t('devices.text.switchPrimaryLabel')}
            </p>
            <CheckBox
              style={styles.primaryDeviceSwitch}
              tintColors={{ false: GREY, true: ORANGE }}
              onValueChange={(value) => {
                dispatch(setPrimaryDevice(value));
              }}
              value={isPrimary}
            />
          </div>
          <p style={styles.infoText}>
            <p style={styles.noticeText}>{t('devices.text.notice')}</p>
            {t('devices.text.primaryDeviceNotice')}
          </p>
        </div>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  orangeTop: {
    backgroundColor: ORANGE,
    height: DEVICE_LARGE ? 70 : 65,
    width: '100%',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    borderTopLeftRadius: 58,
    marginTop: -58,
    overflow: 'hidden',
    zIndex: 2,
  },
  devicesContainer: {
    padding: 30,
  },
  deviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  deviceLabelContainer: {
    flexDirection: 'column',
    flex: 10,
    alignItems: 'flex-start',
  },
  deviceNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  deviceSigningKeyContainer: {},
  removeBtnContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  deviceNameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[16],
    color: BLACK,
  },
  devicePrimaryText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    fontSize: fontSize[16],
    color: BLACK,
  },
  deviceSigningKeyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[14],
    color: BLUE,
  },
  description: {
    fontSize: fontSize[16],
    padding: 10,
    marginBottom: 20,
  },
  syncBtn: {
    // flex: 1,
  },
  removeBtn: {},
  syncBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderRadius: 10,
    backgroundColor: BLUE,
    padding: 10,
    marginTop: 30,
  },
  syncText: {
    color: WHITE,
    fontFamily: 'Poppins-Bold',
    paddingLeft: 10,
    fontSize: fontSize[14],
  },
  waitingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  waitingMessage: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: fontSize[14],
    color: BLUE,
  },
  primaryDeviceSwitchContainer: {
    marginTop: DEVICE_LARGE ? 10 : 8,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  primaryDeviceSwitchLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[12],
    color: DARK_ORANGE,
  },
  primaryDeviceSwitch: {
    flex: 1,
  },
  noticeText: {
    fontSize: fontSize[13],
    color: RED,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize[12],
    color: DARKER_GREY,
  },
});

export default DevicesScreen;
