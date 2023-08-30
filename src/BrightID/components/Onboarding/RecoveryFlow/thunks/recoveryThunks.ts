import nacl from 'tweetnacl';
import { urlSafeRandomKey } from 'BrightID/utils/encoding';
import { setKeypair } from 'BrightID/actions';
import { init } from '../recoveryDataSlice';
import { verifyKeypair } from 'BrightID/utils/cryptoHelper';
import { AppDispatch, GetState } from 'store';

// HELPERS

const THREE_DAYS = 259200000;

const pastLimit = (timestamp: number) => timestamp + THREE_DAYS < Date.now();

// THUNKS

export const setupRecovery =
  () => async (dispatch: AppDispatch, getState: GetState) => {
    console.log(`Setting up recovery...`);
    const { recoveryData } = getState();
    // setup recovery data
    if (!recoveryData.timestamp || pastLimit(recoveryData.timestamp)) {
      const { publicKey, secretKey } = await nacl.sign.keyPair();
      const aesKey = await urlSafeRandomKey(16);
      // setup recovery data slice with new keypair
      console.log('hi1');
      console.log({ publicKey, secretKey, aesKey });
      dispatch(init({ publicKey, secretKey, aesKey }));
    } else {
      // we should already have valid recovery data. double-check required data is available.
      const { publicKey, secretKey } = recoveryData;
      try {
        verifyKeypair({ publicKey, secretKey });
      } catch (e) {
        // Existing keys don't work, set up new keys.
        const { publicKey, secretKey } = await nacl.sign.keyPair();
        const aesKey = await urlSafeRandomKey(16);
        // setup recovery data slice with new keypair
        console.log('hi2');
        console.log({ publicKey, secretKey, aesKey });
        dispatch(init({ publicKey, secretKey, aesKey }));
      }
    }
  };

export const setRecoveryKeys =
  () => (dispatch: AppDispatch, getState: GetState) => {
    const { publicKey, secretKey } = getState().recoveryData;
    verifyKeypair({ publicKey, secretKey });
    dispatch(setKeypair({ publicKey, secretKey }));
  };
