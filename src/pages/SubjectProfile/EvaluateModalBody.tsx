import { backendApi } from 'api';
import { rateUser } from 'api/rate.service';
import { useBrowserHistoryContext } from 'contexts/BrowserHistoryContext';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuthData } from 'store/profile/selectors';
import { RoutePath } from 'types/router';

import ConfidenceDropdown from '../../components/Shared/ConfidenceDropdown';

const EvaluateModalBody = ({
  prevRating,
  subjectId,
  onSubmitted,
}: {
  prevRating?: number | null;
  subjectId: string;
  onSubmitted: () => void;
}) => {
  const [isYes, setIsYes] = useState(true);
  const [confidence, setConfidence] = useState(1);
  useEffect(() => {
    if (!prevRating) return;
    setIsYes(prevRating > 0);
    setConfidence(Math.abs(prevRating));
  }, [prevRating]);
  const { name } = useSubjectBasicInfo(subjectId);
  const [loading, setLoading] = useState(false);
  const authData = useSelector(selectAuthData);
  const navigate = useNavigate();
  const { isFirstVisitedRoute } = useBrowserHistoryContext();
  const submitEvaluation = useCallback(async () => {
    if (loading || !authData?.brightId) return;
    setLoading(true);
    try {
      const newRating = isYes ? confidence : -1 * confidence;
      if (newRating !== prevRating) {
        await rateUser(backendApi, {
          rating: newRating,
          fromBrightId: authData.brightId,
          toBrightId: subjectId,
        });
      }
      onSubmitted();
      if (isFirstVisitedRoute) {
        navigate(RoutePath.SUBJECTS_EVALUATION);
      } else {
        navigate(-1);
      }
    } catch (e) {
      alert(String(e));
    }
    setLoading(false);
  }, [
    loading,
    authData,
    isYes,
    confidence,
    prevRating,
    onSubmitted,
    isFirstVisitedRoute,
    subjectId,
    navigate,
  ]);
  return (
    <div className="">
      <p className="subtitle -mt-6 mb-6">
        as a <span className="font-bold">subject</span> in{' '}
        <span className="font-bold">brightID</span> domain
      </p>

      <p className="font-medium mb-2">
        Is this the account of {name} that should be Aura verified?
      </p>

      <div className="p-1.5 rounded-lg bg-white w-full mb-5">
        <div className="w-full h-[38px] relative bg-white flex">
          <span
            className={`cursor-pointer background absolute w-1/2 top-0 bottom-0 rounded-md transition-all duration-300 ease-in-out ${
              isYes ? 'left-0 right-1/2 bg-pl2' : 'right-0 left-1/2 bg-error'
            }`}
          ></span>
          <p
            className={`bg-transparent absolute w-1/2 left-0 top-1/2 -translate-y-1/2 text-center font-bold text-lg transition-all duration-300 ease-in-out ${
              isYes ? 'text-white' : 'text-black'
            }`}
            data-testid={`evaluate-positive`}
            onClick={() => setIsYes(true)}
          >
            Yes
          </p>
          <p
            className={`cursor-pointer bg-transparent absolute w-1/2 right-0 top-1/2 -translate-y-1/2 text-center font-bold text-lg transition-all duration-300 ease-in-out ${
              isYes ? 'text-black' : 'text-white'
            }`}
            data-testid={`evaluate-negative`}
            onClick={() => setIsYes(false)}
          >
            No
          </p>
        </div>
      </div>

      <p className="font-medium mb-2">How confident are you?</p>
      <ConfidenceDropdown
        confidence={confidence}
        setConfidence={setConfidence}
      />
      <button
        data-testid="submit-evaluation"
        className="btn btn--big w-full mt-36"
        onClick={submitEvaluation}
      >
        {loading ? '...' : 'Submit Evaluation'}
      </button>
    </div>
  );
};

export default EvaluateModalBody;
