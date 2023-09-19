import axios from 'axios';
import { AURA_NODE_URL_PROXY } from 'constants/urls';

export const backendApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const recoveryApi = axios.create({
  baseURL: '/brightid',
  // @ts-ignore
  mode: 'no-cors',
});

export const brightIdNodeApi = axios.create({
  baseURL: 'https://app.brightid.org/',
  // @ts-ignore
  mode: 'no-cors',
});

export const auraBrightIdNodeApi = axios.create({
  baseURL: AURA_NODE_URL_PROXY,
  // @ts-ignore
  mode: 'no-cors',
});

export const isThereProblemWithEncryption = (errorMessage?: string) => {
  if (typeof errorMessage !== 'string') return false;
  return (
    errorMessage.includes('Could not decrypt using publicKey') ||
    errorMessage.includes('TypeError [ERR_INVALID_ARG_TYPE]') ||
    errorMessage.includes('Could not decode data')
  );
};
