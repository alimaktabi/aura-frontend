import useBrightIdVerificationData from 'hooks/useBrightIdVerificationData';
import { useSubjectName } from 'hooks/useSubjectName';
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
  const { auraLevel, userHasRecovery, auraScore } = useBrightIdVerificationData(
    brightIdProfile?.verifications,
  );

  return {
    name: useSubjectName(subjectId),
    auraLevel,
    userHasRecovery,
    auraScore,
    joinedDateString,
    brightIdProfile,
    loading: brightIdProfile === null,
  };
};
