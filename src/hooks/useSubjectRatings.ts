import { useEffect, useMemo, useState } from 'react';

import { getInboundRatings, getOutboundRatings } from '../api/rate.service';
import { AuraRating } from '../types';

export const useInboundRatings = (subjectId: string | null | undefined) => {
  const [inboundRatings, setInboundRatings] = useState<AuraRating[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
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
  }, [subjectId]);

  const inboundRatingsStatsString = useMemo(() => {
    if (!inboundRatings) return null;
    const inboundPositiveRatingsCount = inboundRatings.filter(
      (r) => Number(r.rating) > 0,
    ).length;
    const inboundNegativeRatingsCount = inboundRatings.filter(
      (r) => Number(r.rating) < 0,
    ).length;
    return `${inboundPositiveRatingsCount} Pos / ${inboundNegativeRatingsCount} Neg`;
  }, [inboundRatings]);
  return {
    loading,
    inboundRatings,
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
