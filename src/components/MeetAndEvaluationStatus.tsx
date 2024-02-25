import {
  getBgClassNameOfAuraRatingNumber,
  getTextClassNameOfAuraRatingNumber,
  getThumbsIconPathOfAuraRatingNumber,
} from '../constants';

export const MeetAndEvaluationStatus = ({
  evaluationValue = 4,
  hasEvaluation = true,
}: {
  evaluationValue: number;
  hasEvaluation?: boolean;
}) => {
  return (
    <div className="w-full flex gap-1">
      <div className="flex gap-1 p-2 rounded-md bg-soft-bright">
        <img
          src="/assets/images/Shared/already-known-icon.svg"
          alt=""
          width="20px"
          height="20px"
        />
        {!hasEvaluation && (
          <p className="font-medium text-black text-sm">Already Known</p>
        )}
      </div>
      {hasEvaluation && (
        <div
          className={`flex gap-1 items-center rounded-md ${getBgClassNameOfAuraRatingNumber(
            evaluationValue,
          )} ${getTextClassNameOfAuraRatingNumber(
            evaluationValue,
          )} py-2.5 px-3`}
        >
          <img
            src={getThumbsIconPathOfAuraRatingNumber(evaluationValue)}
            alt=""
            width="18px"
            height="18px"
          />
          <p className="font-bold text-sm leading-4">Very High (+4)</p>
        </div>
      )}
    </div>
  );
};
