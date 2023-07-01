import axios from 'axios';

export const backendApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const brightIdNodeApi = axios.create({
  baseURL: 'https://app.brightid.org/',
  // @ts-ignore
  mode: 'no-cors',
});

export const auraBrightIdNodeApi = axios.create({
  baseURL: import.meta.env.VITE_AURA_NODE_URL,
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
