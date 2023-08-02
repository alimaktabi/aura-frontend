import { useCallback, useEffect, useState } from 'react';
import ConfidenceDropdown from '../../components/Shared/ConfidenceDropdown';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo.ts';
import { rateUser } from 'api/rate.service.ts';
import { selectAuthData } from 'store/profile/selectors.ts';
import { useSelector } from 'react-redux';
import { backendApi } from 'api';
import { useNavigate } from 'react-router-dom';

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
  const submitEvaluation = useCallback(async () => {
    if (loading || !authData?.brightId) return;
    setLoading(true);
    try {
      await rateUser(backendApi, {
        rating: isYes ? confidence : -1 * confidence,
        fromBrightId: authData.brightId,
        toBrightId: subjectId,
      });
      alert('Submitted!');
      onSubmitted();
      navigate(-1);
    } catch (e) {
      alert(String(e));
    }
    setLoading(false);
  }, [authData, confidence, isYes, loading, navigate, onSubmitted, subjectId]);
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
            onClick={() => setIsYes(true)}
          >
            Yes
          </p>
          <p
            className={`cursor-pointer bg-transparent absolute w-1/2 right-0 top-1/2 -translate-y-1/2 text-center font-bold text-lg transition-all duration-300 ease-in-out ${
              isYes ? 'text-black' : 'text-white'
            }`}
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
      <button className="btn btn--big w-full mt-36" onClick={submitEvaluation}>
        {loading ? '...' : 'Submit Evaluation'}
      </button>
    </div>
  );
};

export default EvaluateModalBody;
