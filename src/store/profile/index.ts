import { createSlice } from '@reduxjs/toolkit';
import {
  getBrightIdBackupThunk,
  loginByExplorerCodeThunk,
  refreshKeyPairThunk,
} from './actions.ts';
import { AuthDataWithPassword } from '../../types';
import { RESET_STORE } from 'BrightID/actions';

export type ProfileState = {
  //TODO: rename this to authData
  authData: AuthDataWithPassword | null;
  brightIdBackupEncrypted: string | null;
};

const initialProfileState: ProfileState = {
  authData: null,
  brightIdBackupEncrypted: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginByExplorerCodeThunk.fulfilled, (state, action) => {
        state.authData = action.payload;
      })
      .addCase(refreshKeyPairThunk.fulfilled, (state, action) => {
        state.authData = action.payload;
      })
      .addCase(getBrightIdBackupThunk.fulfilled, (state, action) => {
        state.brightIdBackupEncrypted = action.payload;
      })
      .addMatcher(
        (action) => action.type === RESET_STORE,
        () => {
          return initialProfileState;
        },
      );
  },
});
