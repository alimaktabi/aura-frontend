import {
  decryptData,
  decryptUserData,
  generateB64Keypair,
  hash,
} from 'utils/crypto';

import { AuthData } from '../types';
import { backendApi, recoveryApi } from './index';

export async function pullDecryptedUserData(key: string, password: string) {
  return decryptUserData((await pullEncryptedUserData(key)).data, password);
}

export function pullEncryptedUserData(key: string) {
  return recoveryApi.get<string>(`/backups/${key}/data`);
}

export const loginByExplorerCode = async (
  explorerCode: string,
  password: string,
): Promise<AuthData> => {
  const brightId = decryptData(explorerCode, password);

  if (!brightId) {
    throw new Error('incorrect explorerCode or password');
  }

  const authKey = hash(brightId + password);

  const { publicKey, privateKey } = generateB64Keypair();

  const body = {
    publicKey,
    brightId,
    key: authKey,
    password,
  };
  console.log(body);
  await backendApi.post('/v1/connect/explorer-code', body);

  return {
    privateKey,
    publicKey,
    brightId,
  };
};
