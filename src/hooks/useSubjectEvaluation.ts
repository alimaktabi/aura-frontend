import { getConfidenceValueOfAuraRatingObject } from 'constants/index';
import { SubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { SubjectOutboundEvaluationsContext } from 'contexts/SubjectOutboundEvaluationsContext';
import { useContext, useMemo } from 'react';

export const useSubjectEvaluationFromContext = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string | undefined;
  toSubjectId: string;
}) => {
  const inboundEvaluationsContext = useContext(
    SubjectInboundEvaluationsContext,
  );
  const outboundEvaluationsContext = useContext(
    SubjectOutboundEvaluationsContext,
  );

  const rating = useMemo(() => {
    if (inboundEvaluationsContext?.subjectId === toSubjectId) {
      const ratingObject = inboundEvaluationsContext.ratings?.find(
        (r) => r.fromBrightId === fromSubjectId,
      );
      if (ratingObject) {
        return ratingObject;
      }
    }
    if (outboundEvaluationsContext?.subjectId === fromSubjectId) {
      const ratingObject = outboundEvaluationsContext?.ratings?.find(
        (r) => r.toBrightId === toSubjectId,
      );
      if (ratingObject) {
        return ratingObject;
      }
    }
    return null;
  }, [
    fromSubjectId,
    inboundEvaluationsContext,
    outboundEvaluationsContext,
    toSubjectId,
  ]);

  const connectionInfo = useMemo(() => {
    if (inboundEvaluationsContext?.subjectId === toSubjectId) {
      const ratingObject = inboundEvaluationsContext.connections?.find(
        (conn) => conn.id === fromSubjectId,
      );
      if (ratingObject) {
        return ratingObject;
      }
    }
    if (outboundEvaluationsContext?.subjectId === fromSubjectId) {
      const ratingObject = outboundEvaluationsContext?.connections?.find(
        (conn) => conn.id === toSubjectId,
      );
      if (ratingObject) {
        return ratingObject;
      }
    }
    return null;
  }, [
    fromSubjectId,
    inboundEvaluationsContext,
    outboundEvaluationsContext,
    toSubjectId,
  ]);

  const confidenceValue = useMemo(
    () => getConfidenceValueOfAuraRatingObject(rating),
    [rating],
  );

  const ratingNumber = useMemo(
    () => rating && Number(rating?.rating),
    [rating],
  );

  if (
    inboundEvaluationsContext?.subjectId !== toSubjectId &&
    outboundEvaluationsContext?.subjectId !== fromSubjectId
  ) {
    throw new Error('proper EvaluationsContext not provided');
  }

  return {
    rating,
    loading:
      (inboundEvaluationsContext?.subjectId === toSubjectId &&
        inboundEvaluationsContext?.loading) ||
      (outboundEvaluationsContext?.subjectId === fromSubjectId &&
        outboundEvaluationsContext?.loading),
    ratingNumber,
    confidenceValue,
    connectionInfo,
  };
};
