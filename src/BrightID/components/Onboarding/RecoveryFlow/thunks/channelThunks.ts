import { hash } from 'BrightID/utils/encoding';
import ChannelAPI from 'BrightID/api/channelService';
import { selectBaseUrl } from 'BrightID/reducer/settingsSlice';
import { setRecoveryChannel } from 'BrightID/components/Onboarding/RecoveryFlow/recoveryDataSlice.ts';
import { uploadRecoveryData } from 'BrightID/utils/recovery';
import { AppDispatch, GetState } from 'store';

// CONSTANTS

export const CHANNEL_POLL_INTERVAL = 3000;

// THUNKS

export const createRecoveryChannel =
  () => async (dispatch: AppDispatch, getState: GetState) => {
    try {
      const { recoveryData } = getState();
      const baseUrl = selectBaseUrl(getState());
      const url = new URL(`${baseUrl}/profile`);
      // use this for local running profile service
      // const url = new URL(`http://10.0.2.2:3000/`);
      const channelApi = new ChannelAPI(url.href);
      const channelId = hash(recoveryData.aesKey);
      console.log(`created channel ${channelId} for recovery data`);
      dispatch(setRecoveryChannel({ channelId, url }));
      await uploadRecoveryData(recoveryData, channelApi);
      console.log(`Finished uploading recovery data to channel ${channelId}`);
    } catch (e) {
      const msg = 'Profile data already exists in channel';
      if (!String(e).startsWith(msg)) {
        throw e;
      }
    }
  };
