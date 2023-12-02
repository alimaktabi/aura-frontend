import { useOutboundConnections } from 'hooks/useSubjectConnections';
import { useOutboundRatings } from 'hooks/useSubjectRatings';
import { useSelector } from 'react-redux';
import { selectAuthData } from 'store/profile/selectors';

export const useMyEvaluations = () => {
  const authData = useSelector(selectAuthData);
  const { outboundRatings: myRatings } = useOutboundRatings(authData?.brightId);
  const { outboundConnections: myConnections } = useOutboundConnections(
    authData?.brightId,
  );

  return {
    myRatings,
    myConnections,
    loading: myRatings === null,
  };
};
