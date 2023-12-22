import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthDataWithPassword } from 'types';

import {
  loginByExplorerCode,
  pullEncryptedUserData,
} from '../../api/login.service';
import { encryptData, hash } from '../../utils/crypto';
import { RootState } from '../index';
import { selectAuthData } from './selectors';

//TODO: add a way to reload brightId backup
export const getBrightIdBackupThunk = createAsyncThunk<
  string,
  { authKey: string }
>('profile/getBrightIdBackup', async ({ authKey }) => {
  try {
    const backupData = (await pullEncryptedUserData(authKey)).data;
    console.log({ backupData });
    return backupData;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const loginByExplorerCodeThunk = createAsyncThunk<
  AuthDataWithPassword,
  { explorerCode: string; password: string }
>(
  'profile/loginByExplorerCode',
  async ({ explorerCode, password }, { dispatch }) => {
    const brightIdData = await loginByExplorerCode(explorerCode, password);
    const authKey = hash(brightIdData.brightId + password);
    await dispatch(getBrightIdBackupThunk({ authKey }));
    return {
      ...brightIdData,
      password,
    };
  },
);
export const refreshKeyPairThunk = createAsyncThunk<
  AuthDataWithPassword,
  void,
  { state: RootState }
>('profile/refreshKeyPair', async (_args, { getState }) => {
  const authData = selectAuthData(getState());
  if (!authData) throw new Error('Not Authenticated');
  const password = authData.password;
  const explorerCode = encryptData(authData.brightId, password);
  const brightIdData = await loginByExplorerCode(explorerCode, password);
  return {
    ...brightIdData,
    password,
  };
});

export const SET_ = 'SET_';

export const resetStore = () => ({
  type: SET_,
});
