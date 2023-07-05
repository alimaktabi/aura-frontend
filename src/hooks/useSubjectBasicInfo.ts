import { useSelector } from 'react-redux';
import {
  selectAuthData,
  selectBrightIdBackup,
} from '../store/profile/selectors.ts';
import { useEffect, useMemo, useState } from 'react';
import { AuraPublicProfile } from '../types';
import { getVerifications } from '../api/auranode.service.ts';
import { getProfile } from '../api/connections.service.ts';

export const useSubjectBasicInfo = (subjectId: string | null | undefined) => {
  const authData = useSelector(selectAuthData);
  const brightIdBackup = useSelector(selectBrightIdBackup);
  const isOwn = useMemo(() => {
    return subjectId === authData?.brightId;
  }, [authData?.brightId, subjectId]);
  const [tier, setTier] = useState<string | null>(null);
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
      return diffYears + ' year(s)';
    }

    const difMonths = Math.floor(difDate / (12 * 24 * 3600 * 1000));
    if (difMonths > 0) {
      return difMonths + ' month(s)';
    }

    return '< 1 month';
  }, [auraPublicProfile]);

  useEffect(() => {
    let mounted = true;
    if (subjectId) {
      getVerifications(subjectId).then((verificationsResponse) => {
        if (mounted) {
          const verifications = verificationsResponse.data.verifications;
          const auraVerification = verifications.find(
            (verification) => verification.name === 'Aura',
          );
          setTier(auraVerification?.level ?? 'Not yet');
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
    tier,
    userHasRecovery,
    auraScore,
    name: profileInfo?.name ?? profileInfo?.id ?? 'Unknown',
    joinedDateString,
    auraPublicProfile,
    isConnection: !!connectionInfo,
  };
};
