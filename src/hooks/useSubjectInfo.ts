import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import { useEffect, useMemo, useState } from 'react';

import { getVerifications } from '../api/auranode.service';
import { getProfile } from '../api/connections.service';
import { AuraPublicProfile } from '../types';

export const useSubjectInfo = (subjectId: string | null | undefined) => {
  const [level, setLevel] = useState<string | null>(null);
  const [auraScore, setAuraScore] = useState<number | null>(null);
  const [userHasRecovery, setUserHasRecovery] = useState<boolean | null>(null);

  const [auraPublicProfile, setAuraPublicProfile] =
    useState<AuraPublicProfile | null>(null);

  const joinedDateString = useMemo(() => {
    const today = new Date();
    if (!auraPublicProfile?.brightIdDate) {
      return '';
    }
    const reg = new Date(auraPublicProfile.brightIdDate);

    const difDate = today.getTime() - reg.getTime();
    const diffYears = Math.floor(difDate / (365 * 24 * 3600 * 1000));
    if (diffYears > 0) {
      return diffYears === 1 ? '1 year' : diffYears + ' years';
    }

    const difMonths = Math.floor(difDate / (12 * 24 * 3600 * 1000));
    if (difMonths > 0) {
      return difMonths === 1 ? '1 month' : difMonths + ' months';
    }

    return '< 1 month';
  }, [auraPublicProfile]);

  useEffect(() => {
    let mounted = true;
    setLevel(null);
    setUserHasRecovery(null);
    setAuraPublicProfile(null);
    setAuraScore(null);
    if (subjectId) {
      getVerifications(subjectId).then((verificationsResponse) => {
        if (mounted) {
          const verifications = verificationsResponse.data.verifications;
          const auraVerification = verifications.find(
            (verification) => verification.name === 'Aura',
          );
          setLevel(auraVerification?.level ?? 'Not yet');
          if (auraVerification?.score !== undefined) {
            setAuraScore(auraVerification.score);
          }
          setUserHasRecovery(
            !!verifications.find(
              (verification) => verification.name === 'SocialRecoverySetup',
            ),
          );
        }
        getProfile(subjectId).then((res) => {
          if (mounted) setAuraPublicProfile(res);
        });
      });
    }
    return () => {
      mounted = false;
    };
  }, [subjectId]);

  return {
    ...useSubjectBasicInfo(subjectId),
    level,
    userHasRecovery,
    auraScore,
    joinedDateString,
    auraPublicProfile,
  };
};
