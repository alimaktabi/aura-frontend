import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginByExplorerCode,
  pullEncryptedUserData,
} from '../../api/login.service';
import { AuthDataWithPassword } from 'types';
import { selectAuthData } from './selectors.ts';
import { RootState } from '../index.ts';
import { encryptData } from '../../utils/crypto.ts';

//TODO: add a way to reload brightId backup
export const getBrightIdBackupThunk = createAsyncThunk<
  string,
  { authKey: string }
>('profile/getBrightIdBackup', async ({ authKey }) => {
  try {
    return (await pullEncryptedUserData(authKey)).data;
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
    await dispatch(getBrightIdBackupThunk({ authKey: brightIdData.authKey }));
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
