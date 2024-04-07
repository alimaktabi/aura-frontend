import { AuraRating, ConnectionLevel } from 'types';
import { PreferredView, ProfileViewAs } from 'types/dashboard';

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
export const getViewModeSubjectBackgroundColorClass = (
  viewMode: PreferredView,
) => {
  switch (viewMode) {
    case PreferredView.PLAYER:
      return 'bg-pastel-orange';
    case PreferredView.TRAINER:
      return 'bg-pastel-purple';
    case PreferredView.MANAGER:
      return 'bg-pastel-green';
    default:
      return 'bg-[#999999]';
  }
};
export const getViewModeSubjectBorderColorClass = (viewMode: PreferredView) => {
  switch (viewMode) {
    case PreferredView.PLAYER:
      return 'border-pastel-orange';
    case PreferredView.TRAINER:
      return 'border-pastel-purple';
    case PreferredView.MANAGER:
      return 'border-pastel-green';
    default:
      return 'border-[#999999]';
  }
};
export const getViewModeSubjectTextColorClass = (viewMode: PreferredView) => {
  switch (viewMode) {
    case PreferredView.PLAYER:
      return 'text-pastel-orange';
    case PreferredView.TRAINER:
      return 'text-pastel-purple';
    case PreferredView.MANAGER:
      return 'text-pastel-green';
    default:
      return 'text-[#999999]';
  }
};
export const getViewModeBackgroundColorClass = (viewMode: PreferredView) => {
  switch (viewMode) {
    case PreferredView.PLAYER:
      return 'bg-pastel-purple';
    case PreferredView.TRAINER:
      return 'bg-pastel-green';
    case PreferredView.MANAGER:
      return 'bg-pastel-blue';
    default:
      return 'bg-[#999999]';
  }
};
export const getViewModeBorderColorClass = (viewMode: PreferredView) => {
  switch (viewMode) {
    case PreferredView.PLAYER:
      return 'border-pastel-purple';
    case PreferredView.TRAINER:
      return 'border-pastel-green';
    case PreferredView.MANAGER:
      return 'border-pastel-blue';
    default:
      return 'border-[#999999]';
  }
};
export const getViewModeTextColorClass = (viewMode: PreferredView) => {
  switch (viewMode) {
    case PreferredView.PLAYER:
      return 'text-pastel-purple';
    case PreferredView.TRAINER:
      return 'text-pastel-green';
    case PreferredView.MANAGER:
      return 'text-pastel-blue';
    default:
      return 'text-[#999999]';
  }
};

export const viewModeToSubjectViewMode: {
  [key in PreferredView]: PreferredView;
} = {
  // first property is just for avoiding type errors
  [PreferredView.PLAYER]: PreferredView.PLAYER,
  [PreferredView.TRAINER]: PreferredView.PLAYER,
  [PreferredView.MANAGER]: PreferredView.TRAINER,
};
export const viewModeToViewAs: {
  [key in PreferredView]: ProfileViewAs;
} = {
  [PreferredView.PLAYER]: ProfileViewAs.SUBJECT,
  [PreferredView.TRAINER]: ProfileViewAs.PLAYER,
  [PreferredView.MANAGER]: ProfileViewAs.TRAINER,
};
export const viewAsToViewMode: {
  [key in ProfileViewAs]: PreferredView;
} = {
  [ProfileViewAs.SUBJECT]: PreferredView.PLAYER,
  [ProfileViewAs.PLAYER]: PreferredView.TRAINER,
  [ProfileViewAs.TRAINER]: PreferredView.MANAGER,
  [ProfileViewAs.MANAGER]: PreferredView.MANAGER,
};

export const subjectViewAsIcon: {
  [key in ProfileViewAs]: string;
} = {
  [ProfileViewAs.SUBJECT]: '/assets/images/Dashboard/brightid-icon.svg',
  [ProfileViewAs.PLAYER]: '/assets/images/Dashboard/account-icon.svg',
  [ProfileViewAs.TRAINER]: '/assets/images/Dashboard/trainer-icon.svg',
  [ProfileViewAs.MANAGER]: '/assets/images/Dashboard/manager-icon.svg',
};

export const preferredViewIcon = {
  [PreferredView.PLAYER]: '/assets/images/Dashboard/account-icon.svg',
  [PreferredView.TRAINER]: '/assets/images/Dashboard/trainer-icon.svg',
  [PreferredView.MANAGER]: '/assets/images/Dashboard/manager-icon.svg',
} as const;
