import { AuraRating, ConnectionLevel } from 'types';

// eslint-disable-next-line no-restricted-globals
export const LOCATION_ORIGIN = location.origin;
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

export function getTextClassNameOfAuraRatingNumber(
  rating: number | null | undefined,
) {
  if (!rating) return '';
  return Math.abs(rating) > 2 ? 'text-white' : 'text-black';
}

export function getTextClassNameOfAuraRatingObject(
  auraRating: AuraRating | null | undefined,
) {
  if (!auraRating) return auraRating;
  return getTextClassNameOfAuraRatingNumber(Number(auraRating.rating));
}

export function getThumbsIconPathOfAuraRatingNumber(
  rating: number | null | undefined,
) {
  if (!rating) return '';
  if (rating > 2) return '/assets/images/Shared/thumbs-up-white.svg';
  else if (rating > 0) return '/assets/images/Shared/thumbs-up-black.svg';
  else if (rating > -2) return '/assets/images/Shared/thumbs-down-black.svg';
  else return '/assets/images/Shared/thumbs-down-white.svg';
}

export function getThumbsIconPathOfAuraObject(
  auraRating: AuraRating | null | undefined,
) {
  if (!auraRating) return auraRating;
  return getThumbsIconPathOfAuraRatingNumber(Number(auraRating.rating));
}

export function getBgClassNameOfAuraRatingNumber(
  rating: number | null | undefined,
) {
  if (!rating) return '';
  return (rating > 0 ? 'bg-pl' : 'bg-nl') + Math.ceil(Math.abs(rating));
}

export function getBgClassNameOfAuraRatingObject(
  auraRating: AuraRating | null | undefined,
) {
  if (!auraRating) return auraRating;
  return getBgClassNameOfAuraRatingNumber(Number(auraRating.rating));
}

export function getConfidenceValueOfAuraRatingNumber(
  rating: number | null | undefined,
) {
  if (rating === null || rating === undefined) return rating;
  const score = Math.abs(rating);
  if (score >= 4) return 'Very High';
  if (score >= 3) return 'High';
  if (score >= 2) return 'Medium';
  if (score >= 1) return 'Low';
  return 'Very Low';
}

export function getConfidenceValueOfAuraRatingObject(
  auraRating: AuraRating | null | undefined,
) {
  if (!auraRating) return auraRating;
  return getConfidenceValueOfAuraRatingNumber(Number(auraRating.rating));
}

export const brightIdBaseURL = 'http://184.72.224.75';

export const RATING_INBOUND_STAT = 'ri';
export const RATING_OUTBOUND_STAT = 'ro';
export const ENERGY_INBOUND_STAT = 'ei';
export const ENERGY_OUTBOUND_STAT = 'eo';

export const MUTUAL_CONNECTIONS_TEST_NAMESPACE = 'mutual-connections-';

export const PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING = 3;
export const SUBJECTS_EVALUATION_ONBOARDING_GUIDE_STEP_COUNT = 4;
