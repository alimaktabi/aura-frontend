import { MyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { SubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import useParseBrightIdVerificationData from 'hooks/useParseBrightIdVerificationData';
import { useContext, useEffect, useState } from 'react';

import { getBrightIdProfile, Verifications } from '../api/auranode.service';
import { EvaluationCategory } from '../types/dashboard';

export const useSubjectVerifications = (
  subjectId: string | null | undefined,
  evaluationCategory: EvaluationCategory,
) => {
  const [verifications, setVerifications] = useState<Verifications | undefined>(
    undefined,
  );

  const myEvaluationsContext = useContext(MyEvaluationsContext);
  const subjectInboundEvaluationsContext = useContext(
    SubjectInboundEvaluationsContext,
  );

  useEffect(() => {
    let mounted = true;
    if (
      (myEvaluationsContext !== null &&
        myEvaluationsContext.myConnections === null) ||
      (subjectInboundEvaluationsContext !== null &&
        subjectInboundEvaluationsContext.connections === null)
    )
      return;
    const verificationDataFromConnectionsEndpoint =
      myEvaluationsContext?.myConnections?.find((c) => c.id === subjectId)
        ?.verifications ||
      subjectInboundEvaluationsContext?.connections?.find(
        (c) => c.id === subjectId,
      )?.verifications;
    if (verificationDataFromConnectionsEndpoint) {
      setVerifications(verificationDataFromConnectionsEndpoint);
      return;
    }
    setVerifications(undefined);
    if (subjectId) {
      getBrightIdProfile(subjectId).then((res) => {
        if (mounted) setVerifications(res.data.verifications);
      });
    }
    return () => {
      mounted = false;
    };
  }, [myEvaluationsContext, subjectId, subjectInboundEvaluationsContext]);

  const { auraLevel, userHasRecovery, auraScore } =
    useParseBrightIdVerificationData(verifications, evaluationCategory);

  return {
    auraLevel,
    userHasRecovery,
    auraScore,
    loading: verifications === undefined,
  };
};
