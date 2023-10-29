import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import { useEffect, useMemo, useState } from 'react';

import { BrightIdProfile, getBrightIdProfile } from '../api/auranode.service';

export const useSubjectInfo = (subjectId: string | null | undefined) => {
  const [brightIdProfile, setBrightIdProfile] =
    useState<BrightIdProfile | null>(null);

  const joinedDateString = useMemo(() => {
    const today = new Date();
    if (!brightIdProfile?.createdAt) {
      return '';
    }
    const reg = new Date(brightIdProfile.createdAt);

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
  }, [brightIdProfile]);

  useEffect(() => {
    let mounted = true;
    setBrightIdProfile(null);
    if (subjectId) {
      getBrightIdProfile(subjectId).then((res) => {
        if (mounted) setBrightIdProfile(res.data);
      });
    }
    return () => {
      mounted = false;
    };
  }, [subjectId]);

  const userHasRecovery = useMemo(() => {
    if (!brightIdProfile) return null;
    return !!brightIdProfile.verifications.find(
      (verification) => verification.name === 'SocialRecoverySetup',
    );
  }, [brightIdProfile]);

  const [auraScore, level] = useMemo(() => {
    if (!brightIdProfile) return [null, null];
    const verifications = brightIdProfile.verifications;
    const auraVerification = verifications.find(
      (verification) => verification.name === 'Aura',
    );
    return [
      auraVerification?.score ?? null,
      auraVerification?.level ?? 'Not yet',
    ];
  }, [brightIdProfile]);

  return {
    ...useSubjectBasicInfo(subjectId),
    level,
    userHasRecovery,
    auraScore,
    joinedDateString,
    brightIdProfile,
  };
};
