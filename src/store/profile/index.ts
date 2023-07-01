import { createSlice } from '@reduxjs/toolkit';
import {
  getBrightIdBackupThunk,
  loginByExplorerCodeThunk,
  refreshKeyPairThunk,
} from './actions.ts';
import { AuthDataWithPassword } from '../../types';

export type ProfileState = {
  //TODO: rename this to authData
  auth: AuthDataWithPassword | null;
  brightIdBackupEncrypted: string | null;
};

const initialProfileState: ProfileState = {
  auth: null,
  brightIdBackupEncrypted: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginByExplorerCodeThunk.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
    builder.addCase(refreshKeyPairThunk.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
    builder.addCase(getBrightIdBackupThunk.fulfilled, (state, action) => {
      state.brightIdBackupEncrypted = action.payload;
    });
  },
});
