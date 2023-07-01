import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { decryptUserData } from 'utils/crypto';

export const selectAuthData = createSelector(
  (state: RootState) => state.profile,
  (profile) => profile.auth,
);
export const selectPrivateKey = createSelector(
  (state: RootState) => state.profile,
  (profile) => profile.auth?.privateKey,
);

export const selectIsLoggedIn = createSelector(
  (state: RootState) => state.profile,
  (profile) => !!profile.auth,
);
export const selectBrightIdBackup = createSelector(
  (state: RootState) => state.profile,
  (profile) => {
    const backupEncrypted = profile.brightIdBackupEncrypted;
    const password = profile.auth?.password;
    if (!backupEncrypted || !password) return null;
    return decryptUserData(backupEncrypted, password);
  },
);
