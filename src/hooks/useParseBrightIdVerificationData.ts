import { AuraVerificationString, Verifications } from 'api/auranode.service';
import { useMemo } from 'react';

export const getUserHasRecovery = (
  verifications: Verifications | undefined,
) => {
  if (!verifications) return null;
  return !!verifications.find(
    (verification) => verification.name === 'SocialRecoverySetup',
  );
};
export const getAuraVerificationScore = (
  verifications: Verifications | undefined,
): number | null => {
  if (!verifications) return null;
  const auraVerification = verifications.find(
    (verification) => verification.name === 'Aura',
  );
  return auraVerification?.score ?? null;
};
export const getAuraVerificationLevel = (
  verifications: Verifications | undefined,
): AuraVerificationString | null => {
  if (!verifications) return null;
  const auraVerification = verifications.find(
    (verification) => verification.name === 'Aura',
  );
  return auraVerification?.level ?? '-';
};

export default function useParseBrightIdVerificationData(
  verifications: Verifications | undefined,
) {
  const userHasRecovery = useMemo(
    () => getUserHasRecovery(verifications),
    [verifications],
  );
  const auraLevel = useMemo(
    () => getAuraVerificationLevel(verifications),
    [verifications],
  );
  const auraScore = useMemo(
    () => getAuraVerificationScore(verifications),
    [verifications],
  );
  return {
    userHasRecovery,
    auraScore,
    auraLevel,
  };
}
