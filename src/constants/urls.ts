import { LOCATION_ORIGIN } from 'constants/index';

export const AURA_NODE_URL_PROXY = `${LOCATION_ORIGIN}/auranode`;

if (!process.env.REACT_APP_AURA_NODE_URL) {
  throw new Error('REACT_APP_AURA_NODE_URL not provided');
}
export const AURA_NODE_URL = process.env.REACT_APP_AURA_NODE_URL;
