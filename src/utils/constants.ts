import { AuraRating, ConnectionLevel } from 'types';

const AURA_NODE_URL = import.meta.env.VITE_AURA_NODE_URL;
if (!AURA_NODE_URL) {
  throw Error('VITE_AURA_NODE_URL not provided');
}
export { AURA_NODE_URL };

export const CONNECTION_SEARCH_SEED = 5;

export const TOAST_SUCCESS = 'success';
export const TOAST_ERROR = 'danger';

// eslint-disable-next-line no-unused-vars
export const connectionLevelMap: { [c in ConnectionLevel]: number } = {
  reported: 0,
  suspicious: 1,
  'just met': 2,
  'already known': 3,
  recovery: 4,
};

export function getConfidenceValue(auraRating: AuraRating | null | undefined) {
  if (!auraRating) return auraRating;
  const score = Math.abs(Number(auraRating.rating));
  if (score >= 4) return 'Very High';
  if (score >= 3) return 'High';
  if (score >= 2) return 'Medium';
  if (score >= 1) return 'Low';
  return 'Very Low';
}

export const IS_PRODUCTION =
  (import.meta.env.VITE_VERCEL_ENV || import.meta.env.NODE_ENV) ===
  'production';
export const __DEV__ =
  (import.meta.env.VITE_VERCEL_ENV || import.meta.env.NODE_ENV) ===
  'development';
export const brightIdBaseURL = 'http://184.72.224.75';

export const RATING_INBOUND_STAT = 'ri';
export const RATING_OUTBOUND_STAT = 'ro';
export const ENERGY_INBOUND_STAT = 'ei';
export const ENERGY_OUTBOUND_STAT = 'eo';

export const MUTUAL_CONNECTIONS_TEST_NAMESPACE = 'mutual-connections-';
