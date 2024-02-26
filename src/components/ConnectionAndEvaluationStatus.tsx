import EvaluationThumb from 'components/Shared/EvaluationThumb';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { connectionLevelIcons } from 'utils/connection';

import {
  getBgClassNameOfAuraRatingNumber,
  getTextClassNameOfAuraRatingNumber,
} from '../constants';

export const ConnectionAndEvaluationStatus = ({
  subjectId,
}: {
  subjectId: string;
}) => {
  const {
    myRatingToSubject: rating,
    myRatingNumberToSubject: ratingNumber,
    loading,
    myConnectionToSubject: inboundConnectionInfo,
    myConfidenceValueInThisSubjectRating: confidenceValue,
  } = useMyEvaluationsContext(subjectId);

  return (
    <div className="w-full flex gap-1">
      <div className="flex gap-1 p-2 rounded-md bg-soft-bright">
        {inboundConnectionInfo && (
          <img
            src={`/assets/images/Shared/${
              connectionLevelIcons[inboundConnectionInfo.level]
            }.svg`}
            alt=""
            width="20px"
            height="20px"
          />
        )}
        {!ratingNumber && (
          <p className="font-medium text-black text-sm">
            {inboundConnectionInfo?.level}
          </p>
        )}
      </div>
      {ratingNumber && (
        <div
          className={`flex gap-1 items-center rounded-md ${getBgClassNameOfAuraRatingNumber(
            ratingNumber,
          )} ${getTextClassNameOfAuraRatingNumber(ratingNumber)} py-2.5 px-3`}
        >
          <EvaluationThumb width="18px" height="18px" rating={rating} />
          <p className="font-bold text-sm leading-4">
            {confidenceValue} ({ratingNumber})
          </p>
        </div>
      )}
    </div>
  );
};
