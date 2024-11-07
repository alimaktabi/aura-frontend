import { LOCATION_ORIGIN } from 'constants/index';

import { IS_PRODUCTION } from '../utils/env';

export const AURA_NODE_URL_PROXY = `${LOCATION_ORIGIN}/auranode${
  IS_PRODUCTION ? '' : '-test'
}`;

export const AURA_NODE_URL = IS_PRODUCTION
  ? 'https://aura-node.brightid.org'
  : 'https://aura-test.brightid.org';
