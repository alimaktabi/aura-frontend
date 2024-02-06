import { useOutboundConnections } from 'hooks/useSubjectConnections';
import { useOutboundRatings } from 'hooks/useSubjectRatings';

export const useOutboundEvaluations = (subjectId: string | undefined) => {
  const { outboundRatings, refreshOutboundRatings } =
    useOutboundRatings(subjectId);
  const { outboundConnections } = useOutboundConnections(subjectId);

  return {
    refreshOutboundRatings,
    outboundRatings,
    outboundConnections,
    loading: outboundRatings === null,
  };
};
