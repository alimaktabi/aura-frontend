import { useOutboundEvaluations } from 'hooks/useOutboundEvaluations';
import { useSelector } from 'react-redux';
import { selectAuthData } from 'store/profile/selectors';

export const useMyEvaluations = () => {
  const authData = useSelector(selectAuthData);
  const outboundEvaluations = useOutboundEvaluations(authData?.brightId);

  return {
    loading: outboundEvaluations.loading,
    refreshOutboundRatings: outboundEvaluations.refreshOutboundRatings,
    myRatings: outboundEvaluations.outboundRatings,
    myConnections: outboundEvaluations.outboundConnections,
  };
};
