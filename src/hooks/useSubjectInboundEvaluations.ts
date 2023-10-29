import { useInboundConnections } from 'hooks/useSubjectConnections';
import { useInboundRatings } from 'hooks/useSubjectRatings';

export const useSubjectInboundEvaluations = (subjectId: string) => {
  const useInboundRatingsData = useInboundRatings(subjectId);
  const useInboundConnectionsData = useInboundConnections(subjectId);

  return {
    ...useInboundRatingsData,
    ...useInboundConnectionsData,
    loading: useInboundRatingsData.loading || useInboundConnectionsData.loading,
  };
};
