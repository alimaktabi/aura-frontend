import {
  decryptData,
  decryptUserData,
  generateB64Keypair,
  hash,
} from 'utils/crypto';
import { backendApi, recoveryApi } from './index';
import { AuthData } from '../types';

export async function pullDecryptedUserData(key: string, password: string) {
  return decryptUserData((await pullEncryptedUserData(key)).data, password);
}

export function pullEncryptedUserData(key: string) {
  return recoveryApi.get<string>(`/backups/${key}/data`);
}

export async function pullProfilePhoto(
  key: string,
  brightId: string,
  password: string,
) {
  try {
    const encryptedUserPicture = await recoveryApi.get(
      `/backups/${key}/${brightId}`,
    );
    return decryptData(encryptedUserPicture.data, password);
  } catch (error) {
    console.log(error);
    throw error;
  }
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
