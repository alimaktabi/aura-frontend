import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginByExplorerCode,
  pullEncryptedUserData,
} from '../../api/login.service';
import { AuthDataWithPassword } from 'types';

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
