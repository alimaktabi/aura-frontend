import { getConfidenceValueOfAuraRatingObject } from 'constants/index';
import { useInboundRatings } from 'hooks/useSubjectRatings';
import { useMemo } from 'react';

export const useSubjectRating = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string | undefined;
  toSubjectId: string;
}) => {
  const { inboundRatings, loading } = useInboundRatings(toSubjectId);

  const rating = useMemo(() => {
    const ratingObject = inboundRatings?.find(
      (r) => r.fromBrightId === fromSubjectId,
    );
    return ratingObject ?? null;
  }, [fromSubjectId, inboundRatings]);

  const confidenceValue = useMemo(
    () => getConfidenceValueOfAuraRatingObject(rating),
    [rating],
  );

  return { rating, loading, confidenceValue };
};
