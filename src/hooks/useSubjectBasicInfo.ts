import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { getVerifications } from '../api/auranode.service';
import { getProfile } from '../api/connections.service';
import {
  selectAuthData,
  selectBrightIdBackup,
} from '../store/profile/selectors';
import { AuraPublicProfile } from '../types';

export const useSubjectBasicInfo = (subjectId: string | null | undefined) => {
  const authData = useSelector(selectAuthData);
  const brightIdBackup = useSelector(selectBrightIdBackup);
  const isOwn = useMemo(() => {
    return subjectId === authData?.brightId;
  }, [authData?.brightId, subjectId]);
  const [level, setLevel] = useState<string | null>(null);
  const [auraScore, setAuraScore] = useState<number | null>(null);
  const [userHasRecovery, setUserHasRecovery] = useState<boolean | null>(null);

  const connectionInfo = useMemo(
    () => brightIdBackup?.connections.find((conn) => conn.id === subjectId),
    [brightIdBackup?.connections, subjectId],
  );
  const profileInfo = useMemo(
    () => (isOwn ? brightIdBackup?.userData : connectionInfo),
    [brightIdBackup?.userData, connectionInfo, isOwn],
  );

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
    level,
    userHasRecovery,
    auraScore,
    name: profileInfo?.name ?? profileInfo?.id ?? 'Unknown User',
    joinedDateString,
    auraPublicProfile,
    isConnection: !!connectionInfo,
  };
};
