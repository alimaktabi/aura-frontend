import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  getInboundConnections,
  getOutboundConnections,
} from '../api/connections.service';
import { AuraNodeBrightIdConnection, AuraRating } from '../types';
import { EvaluationCategory, EvaluationValue } from '../types/dashboard';

export const useInboundEvaluations = ({
  subjectId,
  evaluationCategory,
}: {
  subjectId: string | null | undefined;
  evaluationCategory?: EvaluationCategory;
}) => {
  const [inboundConnections, setInboundConnections] = useState<
    AuraNodeBrightIdConnection[] | null
  >(null);

  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  const refreshInboundEvaluations = useCallback(async () => {
    setLoading(true);
    if (subjectId) {
      const connections = await getInboundConnections(subjectId);
      if (mounted.current) {
        setLoading(false);
        setInboundConnections(connections);
      }
    }
  }, [subjectId]);

  useEffect(() => {
    mounted.current = true;
    refreshInboundEvaluations();
    return () => {
      mounted.current = false;
    };
  }, [refreshInboundEvaluations]);

  const inboundRatings: AuraRating[] | null = useMemo(() => {
    if (!inboundConnections || !subjectId) return null;
    return inboundConnections.reduce(
      (a, c) =>
        a.concat(
          ...(c.auraEvaluations
            ?.filter(
              (r) =>
                evaluationCategory === undefined ||
                r.category === evaluationCategory,
            )
            .map((e) => ({
              fromBrightId: c.id,
              toBrightId: subjectId,
              rating: String(
                (e.evaluation === EvaluationValue.POSITIVE ? 1 : -1) *
                  e.confidence,
              ),
              category: e.category,
              id: 0,
              createdAt: new Date(c.timestamp).toISOString(),
              updatedAt: new Date(c.timestamp).toISOString(),
            })) ?? []),
        ),
      [] as AuraRating[],
    );
  }, [evaluationCategory, inboundConnections, subjectId]);

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
    connections: inboundConnections,
    refreshInboundRatings: refreshInboundEvaluations,
    loading,
    ratings: inboundRatings,
    inboundPositiveRatingsCount,
    inboundNegativeRatingsCount,
    inboundRatingsStatsString,
  };
};

export const useOutboundEvaluations = ({
  subjectId,
  evaluationCategory,
}: {
  subjectId: string | null | undefined;
  evaluationCategory?: EvaluationCategory;
}) => {
  const [outboundConnections, setOutboundConnections] = useState<
    AuraNodeBrightIdConnection[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  const mounted = useRef(false);

  const refreshOutboundEvaluations = useCallback(async () => {
    setLoading(true);
    if (subjectId) {
      const connections = await getOutboundConnections(subjectId);
      if (mounted.current) {
        setLoading(false);
        setOutboundConnections(connections);
      }
    }
  }, [subjectId]);

  useEffect(() => {
    mounted.current = true;
    refreshOutboundEvaluations();
    return () => {
      mounted.current = false;
    };
  }, [refreshOutboundEvaluations]);

  const outboundRatings: AuraRating[] | null = useMemo(() => {
    if (!outboundConnections || !subjectId) return null;
    return outboundConnections.reduce(
      (a, c) =>
        a.concat(
          ...(c.auraEvaluations
            ?.filter(
              (r) =>
                evaluationCategory === undefined ||
                r.category === evaluationCategory,
            )
            .map((e) => ({
              fromBrightId: subjectId,
              toBrightId: c.id,
              rating: String(
                (e.evaluation === EvaluationValue.POSITIVE ? 1 : -1) *
                  e.confidence,
              ),
              category: e.category,
              id: 0,
              createdAt: new Date(c.timestamp).toISOString(),
              updatedAt: new Date(c.timestamp).toISOString(),
            })) ?? []),
        ),
      [] as AuraRating[],
    );
  }, [evaluationCategory, outboundConnections, subjectId]);

  return {
    loading,
    connections: outboundConnections,
    refreshOutboundRatings: refreshOutboundEvaluations,
    ratings: outboundRatings,
  };
};

export const useSubjectEvaluations = (props: {
  subjectId: string | null | undefined;
  evaluationCategory?: EvaluationCategory;
}) => {
  const inboundConnectionsData = useInboundEvaluations(props);
  const outboundConnectionsData = useOutboundEvaluations(props);
  return { ...inboundConnectionsData, ...outboundConnectionsData };
};
