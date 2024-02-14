import { getConfidenceValueOfAuraRatingObject } from 'constants/index';
import { useSubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { useMemo } from 'react';

export const useSubjectEvaluationFromContext = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string | undefined;
  toSubjectId: string;
}) => {
  const { inboundRatings, loading, inboundConnections } =
    useSubjectInboundEvaluationsContext(toSubjectId);

  const rating = useMemo(() => {
    const ratingObject = inboundRatings?.find(
      (r) => r.fromBrightId === fromSubjectId,
    );
    return ratingObject ?? null;
  }, [fromSubjectId, inboundRatings]);

  const inboundConnectionInfo = useMemo(() => {
    return (
      inboundConnections?.find((conn) => conn.id === fromSubjectId) ?? null
    );
  }, [fromSubjectId, inboundConnections]);

  const confidenceValue = useMemo(
    () => getConfidenceValueOfAuraRatingObject(rating),
    [rating],
  );

  const ratingNumber = useMemo(
    () => rating && Number(rating?.rating),
    [rating],
  );

  return {
    rating,
    loading,
    ratingNumber,
    confidenceValue,
    inboundConnectionInfo,
  };
};
