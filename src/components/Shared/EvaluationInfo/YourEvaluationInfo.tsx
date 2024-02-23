import {
  getBgClassNameOfAuraRatingObject,
  getTextClassNameOfAuraRatingObject,
} from 'constants/index';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { useMemo } from 'react';
import { useSelector } from 'store/hooks';
import { selectAuthData } from 'store/profile/selectors';

export const YourEvaluationInfo = ({
  toSubjectId,
  setShowEvaluationFlow,
}: {
  toSubjectId: string;
  setShowEvaluationFlow: (value: boolean) => void;
}) => {
  const isYourEvaluation = true;
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
          bgAndTextColor:
            getBgClassNameOfAuraRatingObject(rating) +
            ' ' +
            getTextClassNameOfAuraRatingObject(rating),
          iconBgColor: 'bg-pl2',
          text: 'Positive',
        };
      if (Number(rating.rating) < 0)
        return {
          bgAndTextColor:
            getBgClassNameOfAuraRatingObject(rating) +
            ' ' +
            getTextClassNameOfAuraRatingObject(rating),
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
    <div className="flex gap-2">
      <div
        className={`text-sm flex flex-1 justify-between rounded-md items-center h-[36px] px-3 py-2 ${
          styleValues.bgAndTextColor
        } ${isYourEvaluation ? 'p-1.5' : 'p-2.5'}`}
      >
        <div className="flex gap-0.5 items-center">
          <img
            src="/assets/images/Shared/thumbs-up-white.svg"
            alt=""
            width="17.5px"
            height="16.63px"
          />
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
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{'12%'}</span>
        </div>
      </div>
      <div className="rounded-md p-2 bg-button-primary">
        <img
          src="/assets/images/Shared/edit-icon.svg"
          alt=""
          width="20px"
          height="20px"
        />
      </div>
    </div>
  );
};
