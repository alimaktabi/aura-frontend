import { useEffect, useMemo, useState } from 'react';
import { AuraRating } from '../types';
import { getInboundRatings, getOutboundRatings } from '../api/rate.service.ts';

export const useInboundRatings = (subjectId: string | null | undefined) => {
  const [inboundRatings, setInboundRatings] = useState<AuraRating[] | null>(
    null,
  );
  useEffect(() => {
    let mounted = true;
    if (subjectId) {
      getInboundRatings(subjectId).then((ratings) => {
        if (mounted) {
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
