import EvaluationThumb from 'components/Shared/EvaluationThumb';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { connectionLevelIcons } from 'utils/connection';

import {
  getBgClassNameOfAuraRatingNumber,
  getTextClassNameOfAuraRatingNumber,
} from '../constants';
import LoadingSpinner from './Shared/LoadingSpinner';

export const ConnectionAndEvaluationStatus = ({
  subjectId,
}: {
  subjectId: string;
}) => {
  const {
    myRatingToSubject: rating,
    myRatingNumberToSubject: ratingNumber,
    myConnectionToSubject: inboundConnectionInfo,
    myConfidenceValueInThisSubjectRating: confidenceValue,
  } = useMyEvaluationsContext({ subjectId });

  return (
    <div className="w-full flex gap-1">
      <div className="flex gap-1 p-2 rounded-md bg-soft-bright">
        {inboundConnectionInfo &&
          connectionLevelIcons[inboundConnectionInfo.level] && (
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
      {ratingNumber ? (
        <div
          className={`flex gap-1 items-center rounded-md ${getBgClassNameOfAuraRatingNumber(
            ratingNumber,
          )} ${getTextClassNameOfAuraRatingNumber(ratingNumber)} py-2.5 px-3`}
        >
          <EvaluationThumb
            width="18px"
            height="18px"
            rating={rating && Number(rating?.rating)}
          />
          <p className="font-bold text-sm leading-4">
            {rating?.isPending ? '' : `${confidenceValue} `}({ratingNumber})
          </p>
          {rating?.isPending && (
            <LoadingSpinner
              className="w-[18px] h-[18px] ml-1"
              spinnerClassName={
                Math.abs(Number(rating.rating)) > 2
                  ? 'border-white'
                  : 'border-black'
              }
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
