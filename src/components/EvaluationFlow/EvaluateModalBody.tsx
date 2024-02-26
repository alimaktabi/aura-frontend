import ConfidenceDropdown from 'components/Shared/ConfidenceDropdown';
import { useSubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { useEvaluateSubject } from 'hooks/useEvaluateSubject';
import { useSubjectName } from 'hooks/useSubjectName';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthData } from 'store/profile/selectors';

const EvaluateModalBody = ({
  subjectId,
  onSubmitted,
}: {
  subjectId: string;
  onSubmitted: (newRating: number | null | undefined) => void;
}) => {
  const [isYes, setIsYes] = useState(true);
  const [confidence, setConfidence] = useState(1);
  const [onDelete, setOnDelete] = useState(false);
  const { myRatingObject } = useSubjectInboundEvaluationsContext(subjectId);
  const authData = useSelector(selectAuthData);
  const prevRating = useMemo(
    () => (myRatingObject ? Number(myRatingObject.rating) : undefined),
    [myRatingObject],
  );

  useEffect(() => {
    if (!prevRating) return;
    setIsYes(prevRating > 0);
    setConfidence(Math.abs(prevRating));
  }, [prevRating]);

  const name = useSubjectName(subjectId);
  const { submitEvaluation, loading } = useEvaluateSubject();

  const submit = useCallback(async () => {
    if (loading || !authData?.brightId) return;
    try {
      const newRating = isYes ? confidence : -1 * confidence;
      if (newRating !== prevRating) {
        await submitEvaluation(subjectId, newRating);
      }
      onSubmitted(newRating);
    } catch (e) {
      alert(String(e));
    }
  }, [
    authData,
    confidence,
    isYes,
    loading,
    onSubmitted,
    prevRating,
    subjectId,
    submitEvaluation,
  ]);

  return (
    <div>
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
              isYes ? 'left-0 right-1/2 bg-pl3' : 'right-0 left-1/2 bg-error'
            }`}
          ></span>
          <p
            className={`bg-transparent absolute w-1/2 left-0 top-1/2 -translate-y-1/2 text-center font-bold text-lg transition-all duration-300 ease-in-out ${
              isYes ? 'text-white' : 'text-black'
            }`}
            data-testid={`evaluate-positive`}
            onClick={() => setIsYes(true)}
          >
            <div className="flex gap-1 w-full justify-center">
              <img
                src={
                  isYes
                    ? '/assets/images/Shared/thumbs-up-white.svg'
                    : '/assets/images/Shared/thumbs-up-black.svg'
                }
                alt=""
                width="17.5px"
                height="17.5px"
              />
              Yes
            </div>
          </p>
          <p
            className={`cursor-pointer bg-transparent absolute w-1/2 right-0 top-1/2 -translate-y-1/2 text-center font-bold text-lg transition-all duration-300 ease-in-out ${
              isYes ? 'text-black' : 'text-white'
            }`}
            data-testid={`evaluate-negative`}
            onClick={() => setIsYes(false)}
          >
            <div className="flex gap-1 w-full justify-center">
              <img
                src={
                  isYes
                    ? '/assets/images/Shared/thumbs-down-black.svg'
                    : '/assets/images/Shared/thumbs-down-white.svg'
                }
                alt=""
                width="17.5px"
                height="17.5px"
              />
              No
            </div>
          </p>
        </div>
      </div>

      <p className="font-medium mb-2">How confident are you?</p>
      <ConfidenceDropdown
        confidence={confidence}
        setConfidence={setConfidence}
      />
      <div className="mt-36">
        {prevRating ? (
          <div className="flex gap-3">
            <button
              className={`flex justify-center transition-all duration-300 ease-linear
            ${
              onDelete
                ? `btn btn--big btn--outlined-big`
                : `btn btn--big w-full`
            }
            `}
              // onClick={submit}
              onClick={() => (onDelete ? setOnDelete(false) : submit())}
            >
              <p
                className={`${
                  onDelete ? 'opacity-100' : '!w-0 !h-0 opacity-0'
                }`}
              >
                Cancel
              </p>
              <p
                data-testid="submit-evaluation"
                className={`${
                  onDelete ? '!w-0 !h-0 opacity-0' : 'opacity-100'
                }`}
              >
                {loading ? '...' : 'Update Evaluation'}
              </p>
              {/*{loading && !isEdit ? '...' : 'Submit Evaluation'}*/}
            </button>
            <button
              className={`btn btn--big !bg-delete flex gap-2.5 transition-all duration-300 ease-linear ${
                onDelete ? 'w-full justify-center items-center' : ''
              }`}
              onClick={() =>
                onDelete
                  ? submitEvaluation(subjectId, 0).then(() => onSubmitted(0))
                  : setOnDelete(true)
              }
            >
              <img src="/assets/images/Shared/erase-icon.svg" alt="" />
              {onDelete && <span>{loading ? '...' : 'Remove'}</span>}
            </button>
          </div>
        ) : (
          <button
            data-testid="submit-evaluation"
            className="btn btn--big w-full"
            onClick={submit}
          >
            {loading ? '...' : 'Submit Evaluation'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EvaluateModalBody;
