import { backendApi } from 'api';
import { rateUser } from 'api/rate.service';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthData } from 'store/profile/selectors';

export function useEvaluateSubject() {
  const authData = useSelector(selectAuthData);
  const [loading, setLoading] = useState(false);
  const submitEvaluation = useCallback(
    async (subjectId: string, newRating: number) => {
      if (loading || !authData?.brightId) return;
      setLoading(true);
      try {
        await rateUser(backendApi, {
          rating: newRating,
          fromBrightId: authData.brightId,
          toBrightId: subjectId,
        });
      } catch (e) {
        alert(String(e));
      }
      setLoading(false);
    },
    [loading, authData],
  );

  return { submitEvaluation, loading };
}
