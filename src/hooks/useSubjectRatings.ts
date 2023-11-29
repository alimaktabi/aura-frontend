import { useEffect, useMemo, useState } from 'react';

import { getInboundRatings, getOutboundRatings } from '../api/rate.service';
import { AuraRating } from '../types';

export const useInboundRatings = (subjectId: string | null | undefined) => {
  const [inboundRatings, setInboundRatings] = useState<AuraRating[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const [refreshCounter, setRefreshCounter] = useState(0);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setInboundRatings(null);
    if (subjectId) {
      getInboundRatings(subjectId).then((ratings) => {
        if (mounted) {
          setLoading(false);
          setInboundRatings(ratings);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [subjectId, refreshCounter]);

  const inboundPositiveRatingsCount = useMemo(
    () => inboundRatings?.filter((r) => Number(r.rating) > 0).length,
    [inboundRatings],
  );
  const inboundNegativeRatingsCount = useMemo(
    () => inboundRatings?.filter((r) => Number(r.rating) < 0).length,
    [inboundRatings],
  );

  const inboundRatingsStatsString = useMemo(() => {
    return `${inboundPositiveRatingsCount ?? '...'} Pos / ${
      inboundNegativeRatingsCount ?? '...'
    } Neg`;
  }, [inboundNegativeRatingsCount, inboundPositiveRatingsCount]);

  return {
    refresh: () => setRefreshCounter((c) => c + 1),
    loading,
    inboundRatings,
    inboundPositiveRatingsCount,
    inboundNegativeRatingsCount,
    inboundRatingsStatsString,
  };
};

export const useOutboundRatings = (subjectId: string | null | undefined) => {
  const [outboundRatings, setOutboundRatings] = useState<AuraRating[] | null>(
    null,
  );
  useEffect(() => {
    let mounted = true;
    setOutboundRatings(null);
    if (subjectId) {
      getOutboundRatings(subjectId).then((ratings) => {
        if (mounted) {
          setOutboundRatings(ratings);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [subjectId]);
  return { outboundRatings };
};

export const useSubjectRatings = (subjectId: string | null | undefined) => {
  const inboundRatingsData = useInboundRatings(subjectId);
  const outboundRatingsData = useOutboundRatings(subjectId);
  return { ...inboundRatingsData, ...outboundRatingsData };
};
