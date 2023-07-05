// export const EvaluationInfo = ({
//                                  subjectId,
//                                }: {
//   subjectId: string | undefined;
// }) => {
export const EvaluationInfo = ({ info }: { info: any }) => {
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
          !info.notes
            ? 'bg-gray50'
            : evaluationValues(info.evaluation).iconBgColor
        }`}
      >
        <img
          src={`${
            info.notes
              ? '/assets/images/Shared/note-icon-white.svg'
              : '/assets/images/Shared/note-icon-gray.svg'
          }`}
          alt=""
        />
      </div>
      <div
        className={`flex w-full justify-between rounded items-center p-1.5 ${
          evaluationValues(info.evaluation).bgColor
        } ${info.isYourEvaluation ? 'p-1.5' : 'p-2.5'}`}
      >
        <div>
          <span className="font-medium">
            {evaluationValues(info.evaluation).text}
          </span>
          <span className="font-bold"> - {info.evaluationStrength}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{info.score}</span>
          {info.isYourEvaluation && (
            <div
              className={`p-1.5 rounded ${
                evaluationValues(info.evaluation).iconBgColor
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
