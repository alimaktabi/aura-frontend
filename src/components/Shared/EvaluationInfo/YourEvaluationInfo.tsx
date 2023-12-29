import EvaluationFlow from 'components/EvaluationFlow/EvaluationFlow';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { useMemo, useState } from 'react';
import { useSelector } from 'store/hooks';
import { selectAuthData } from 'store/profile/selectors';

export const YourEvaluationInfo = ({
  toSubjectId,
}: {
  toSubjectId: string;
}) => {
  const isYourEvaluation = true;
  const [showEvaluationFlow, setShowEvaluationFlow] = useState(false);
  const authData = useSelector(selectAuthData);
  const {
    myRatingToSubject: rating,
    loading,
    myConfidenceValueInThisSubjectRating: confidenceValue,
  } = useMyEvaluationsContext(toSubjectId);

  //TODO: get notes from api
  const styleValues = useMemo(() => {
    if (loading) {
      return {
        bgAndTextColor: 'bg-gray20 text-white',
        iconBgColor: 'bg-gray50',
        text: '...',
      };
    }
    if (rating?.rating) {
      if (Number(rating.rating) > 0)
        return {
          bgAndTextColor: 'bg-pl1',
          iconBgColor: 'bg-pl2',
          text: 'Positive',
        };
      if (Number(rating.rating) < 0)
        return {
          bgAndTextColor: 'bg-nl1',
          iconBgColor: 'bg-nl2',
          text: 'Negative',
        };
    }
    return {
      bgAndTextColor: 'bg-gray20 text-white',
      iconBgColor: 'bg-gray50',
      text: 'Not Rated',
    };
  }, [rating, loading]);

  if (loading)
    return (
      <div>
        <span className="font-medium">...</span>
      </div>
    );

  return (
    <div>
      <div
        className={`text-sm flex flex-1 justify-between rounded-md items-center h-[38px] p-1.5 ${
          styleValues.bgAndTextColor
        } ${isYourEvaluation ? 'p-1.5' : 'p-2.5'}`}
      >
        <div>
          <span
            className="font-medium"
            data-testid={`${isYourEvaluation ? 'your-' : ''}evaluation-${
              authData?.brightId
            }-${toSubjectId}-magnitude`}
          >
            {styleValues.text}
          </span>
          <span
            className="font-medium"
            data-testid={`${isYourEvaluation ? 'your-' : ''}evaluation-${
              authData?.brightId
            }-${toSubjectId}-confidence`}
          >
            {rating && Number(rating.rating) !== 0 && confidenceValue
              ? ` - ${confidenceValue}`
              : ''}
            {rating?.rating ? ` (${rating.rating})` : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{'12%'}</span>
          {isYourEvaluation && (
            <div
              className={`p-1.5 rounded cursor-pointer ${styleValues.iconBgColor}`}
              data-testid={`your-evaluation-${authData?.brightId}-${toSubjectId}-edit`}
              onClick={() => setShowEvaluationFlow(true)}
            >
              <img
                src="/assets/images/Shared/edit-icon.svg"
                alt=""
                className="w-4 h-4"
              />
            </div>
          )}
        </div>
      </div>

      <EvaluationFlow
        showEvaluationFlow={showEvaluationFlow}
        setShowEvaluationFlow={setShowEvaluationFlow}
        subjectId={toSubjectId}
      />
    </div>
  );
};
