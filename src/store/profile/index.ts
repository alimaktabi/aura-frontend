import { createSlice } from '@reduxjs/toolkit';
import { RESET_STORE } from 'BrightID/actions';

import { AuthDataWithPassword } from '../../types';
import {
  getBrightIdBackupThunk,
  loginByExplorerCodeThunk,
  refreshKeyPairThunk,
} from './actions';

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
        console.log('loginByExplorerCodeThunk.fulfilled');
        console.log(state);
      })
      .addCase(refreshKeyPairThunk.fulfilled, (state, action) => {
        state.authData = action.payload;
      })
      .addCase(getBrightIdBackupThunk.fulfilled, (state, action) => {
        state.brightIdBackupEncrypted = action.payload;
        console.log('getBrightIdBackupThunk.fulfilled');
        console.log(state);
      })
      .addMatcher(
        (action) => action.type === RESET_STORE,
        () => {
          console.log('logout called');
          return initialProfileState;
        },
      );
  },
});
