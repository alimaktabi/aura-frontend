import { Verifications } from 'api/auranode.service';
import { useMemo } from 'react';

import { EvaluationCategory } from '../types/dashboard';

export const getUserHasRecovery = (
  verifications: Verifications | undefined,
) => {
  if (!verifications) return null;
  return !!verifications.find(
    (verification) => verification.name === 'SocialRecoverySetup',
  );
};
//TODO: filter aura verification based on evaluationCategory and make it required parameter
export const getAuraVerificationScore = (
  verifications: Verifications | undefined,
  evaluationCategory: EvaluationCategory,
): number | null => {
  if (!verifications) return null;
  const auraVerification = verifications.find(
    (verification) => verification.name === 'Aura',
  );
  return (
    auraVerification?.domains
      ?.find((d) => d.name === 'BrightID')
      ?.categories.find((c) => c.name === evaluationCategory)?.score ?? null
  );
};
export const getAuraVerificationLevel = (
  verifications: Verifications | undefined,
  evaluationCategory: EvaluationCategory,
): number | null => {
  if (!verifications) return null;
  const auraVerification = verifications.find(
    (verification) => verification.name === 'Aura',
  );
  return (
    auraVerification?.domains
      ?.find((d) => d.name === 'BrightID')
      ?.categories.find((c) => c.name === evaluationCategory)?.level ?? null
  );
};

export default function useParseBrightIdVerificationData(
  verifications: Verifications | undefined,
  evaluationCategory: EvaluationCategory,
) {
  const userHasRecovery = useMemo(
    () => getUserHasRecovery(verifications),
    [verifications],
  );
  const auraLevel = useMemo(
    () => getAuraVerificationLevel(verifications, evaluationCategory),
    [evaluationCategory, verifications],
  );
  const auraScore = useMemo(
    () => getAuraVerificationScore(verifications, evaluationCategory),
    [evaluationCategory, verifications],
  );
  return {
    userHasRecovery,
    auraScore,
    auraLevel,
  };
}
