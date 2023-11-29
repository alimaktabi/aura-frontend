import { useOutboundRatings } from 'hooks/useSubjectRatings';
import { useSelector } from 'react-redux';
import { selectAuthData, selectBrightIdBackup } from 'store/profile/selectors';

export const useMyEvaluations = () => {
  const authData = useSelector(selectAuthData);
  const { outboundRatings: myRatings } = useOutboundRatings(authData?.brightId);
  const brightIdBackup = useSelector(selectBrightIdBackup);

  return {
    myRatings,
    myConnections: brightIdBackup?.connections,
    loading: myRatings === null,
  };
};
