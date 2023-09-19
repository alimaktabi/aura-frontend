import { createSelector } from '@reduxjs/toolkit';
import { decryptUserData } from 'utils/crypto';

import { BrightIdBackup } from '../../types';
import { RootState } from '..';

export const selectAuthData = createSelector(
  (state: RootState) => state.profile,
  (profile) => profile.authData,
);
export const selectPrivateKey = createSelector(
  (state: RootState) => state.profile,
  (profile) => profile.authData?.privateKey,
);

export const selectIsLoggedIn = createSelector(
  (state: RootState) => state.profile,
  (profile) => !!profile.authData,
);
export const selectBrightIdBackup = createSelector(
  (state: RootState) => state.profile,
  (profile) => {
    const backupEncrypted = profile.brightIdBackupEncrypted;
    const password = profile.authData?.password;
    if (!backupEncrypted || !password) return null;
    return decryptUserData(backupEncrypted, password) as BrightIdBackup;
  },
);
