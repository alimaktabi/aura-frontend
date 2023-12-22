import { createSlice } from '@reduxjs/toolkit';
import { RESET_STORE } from 'BrightID/actions';

import { AuthDataWithPassword } from '../../types';
import {
  getBrightIdBackupThunk,
  loginByExplorerCodeThunk,
  refreshKeyPairThunk,
} from './actions';

export type ProfileState = {
  authData: AuthDataWithPassword | null;
  brightIdBackupEncrypted: string | null;
  splashScreenShown: boolean;
  playerOnboardingScreenShown: boolean;
};

const initialProfileState: ProfileState = {
  authData: null,
  brightIdBackupEncrypted: null,
  splashScreenShown: false,
  playerOnboardingScreenShown: false,
};
export const SET_SPLASH_SCREEN_SHOWN = 'SET_SPLASH_SCREEN_SHOWN';

export const setSplashScreenShown = (value: boolean) => ({
  type: SET_SPLASH_SCREEN_SHOWN,
  payload: value,
});
export const SET_PLAYER_ONBOARDING_SCREEN_SHOWN =
  'SET_PLAYER_ONBOARDING_SCREEN_SHOWN';

export const setPlayerOnboardingScreenShown = (value: boolean) => ({
  type: SET_PLAYER_ONBOARDING_SCREEN_SHOWN,
  payload: value,
});

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
      )
      .addMatcher(
        (action) => action.type === SET_SPLASH_SCREEN_SHOWN,
        (state, action) => {
          state.splashScreenShown = action.payload;
        },
      )
      .addMatcher(
        (action) => action.type === SET_PLAYER_ONBOARDING_SCREEN_SHOWN,
        (state, action) => {
          state.playerOnboardingScreenShown = action.payload;
        },
      );
  },
});
