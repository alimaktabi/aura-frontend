export const EvaluationInfo = ({
  notes,
  evaluation,
  evaluationStrength,
  score,
  isYourEvaluation,
}: {
  notes: boolean;
  evaluation: string;
  evaluationStrength: string;
  score: string;
  isYourEvaluation: boolean;
}) => {
  const evaluationValues = (evaluation: string) => {
    switch (evaluation) {
      case 'POSITIVE':
        return {
          bgColor: 'bg-pl1',
          iconBgColor: 'bg-pl2',
          text: 'Positive',
        };
      case 'NEGATIVE':
        return {
          bgColor: 'bg-nl1',
          iconBgColor: 'bg-nl2',
          text: 'Negative',
        };
      default:
        return {
          bgColor: 'bg-gray20',
          iconBgColor: 'bg-gray50',
          text: '...',
        };
    }
  };
  return (
    <div className="flex gap-2.5 items-center text-sm">
      <div
        className={`p-2.5 rounded ${
          !notes ? 'bg-gray50' : evaluationValues(evaluation).iconBgColor
        }`}
      >
        <img
          src={`${
            notes
              ? '/assets/images/Shared/note-icon-white.svg'
              : '/assets/images/Shared/note-icon-gray.svg'
          }`}
          alt=""
        />
      </div>
      <div
        className={`flex w-full justify-between rounded items-center p-1.5 ${
          evaluationValues(evaluation).bgColor
        }`}
      >
        <div>
          <span className="font-medium">
            {evaluationValues(evaluation).text}
          </span>
          <span className="font-bold"> - {evaluationStrength}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{score}</span>
          {isYourEvaluation && (
            <div
              className={`p-1.5 rounded ${
                evaluationValues(evaluation).iconBgColor
              }`}
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
    </div>
  );
};
