import { useOutboundConnections } from 'hooks/useSubjectConnections';
import { useOutboundRatings } from 'hooks/useSubjectRatings';

export const useOutboundEvaluations = (subjectId: string | undefined) => {
  const { ratings, refreshOutboundRatings } = useOutboundRatings(subjectId);
  const { connections } = useOutboundConnections(subjectId);

  return {
    refreshOutboundRatings,
    ratings,
    connections,
    loading: ratings === null,
  };
};
