import { toByteArray } from 'base64-js';
import nacl from 'tweetnacl';

import { store } from '../store';
import { selectPrivateKey } from '../store/profile/selectors';

export const encryptStringWithPrivateKey = (data: string) => {
  const privateKey = selectPrivateKey(store.getState());

  if (!privateKey) {
    throw new Error('need secret key stored');
  }

  const utf8Encode = new TextEncoder();
  return nacl.sign(utf8Encode.encode(data), toByteArray(privateKey));
};
export const encryptDataWithPrivateKey = (data: any) => {
  return encryptStringWithPrivateKey(JSON.stringify(data));
};
