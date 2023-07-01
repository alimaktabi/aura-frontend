import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index.ts';
import { decryptUserData } from '../../utils/crypto.ts';

export const selectPrivateKey = createSelector(
  (state: RootState) => state.profile,
  (profile) => profile.auth?.privateKey,
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
