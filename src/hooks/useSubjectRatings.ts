import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getInboundRatings, getOutboundRatings } from '../api/rate.service';
import { AuraRating } from '../types';

export const useInboundRatings = (subjectId: string | null | undefined) => {
  const [inboundRatings, setInboundRatings] = useState<AuraRating[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  const refreshInboundRatings = useCallback(async () => {
    setLoading(true);
    if (subjectId) {
      const ratings = await getInboundRatings(subjectId);
      if (mounted.current) {
        setLoading(false);
        setInboundRatings(ratings);
      }
    }
  }, [subjectId]);

  useEffect(() => {
    mounted.current = true;
    refreshInboundRatings();
    return () => {
      mounted.current = false;
    };
  }, [refreshInboundRatings]);

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
    refreshInboundRatings,
    loading,
    ratings: inboundRatings,
    inboundPositiveRatingsCount,
    inboundNegativeRatingsCount,
    inboundRatingsStatsString,
  };
};

export const useOutboundRatings = (subjectId: string | null | undefined) => {
  const [outboundRatings, setOutboundRatings] = useState<AuraRating[] | null>(
    null,
  );
  const mounted = useRef(false);

  const refreshOutboundRatings = useCallback(async () => {
    if (subjectId) {
      const ratings = await getOutboundRatings(subjectId);
      if (mounted.current) {
        setOutboundRatings(ratings);
      }
    }
  }, [subjectId]);

  useEffect(() => {
    mounted.current = true;
    refreshOutboundRatings();
    return () => {
      mounted.current = false;
    };
  }, [refreshOutboundRatings]);

  return {
    refreshOutboundRatings,
    ratings: outboundRatings,
  };
};

export const useSubjectRatings = (subjectId: string | null | undefined) => {
  const inboundRatingsData = useInboundRatings(subjectId);
  const outboundRatingsData = useOutboundRatings(subjectId);
  return { ...inboundRatingsData, ...outboundRatingsData };
};
