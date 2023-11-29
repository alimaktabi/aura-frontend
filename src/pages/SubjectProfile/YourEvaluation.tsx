import { YourEvaluationInfo } from 'components/Shared/EvaluationInfo/YourEvaluationInfo';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';

import NotEvaluatedCard from './NotEvaluatedCard';

export const YourEvaluation = ({ subjectId }: { subjectId: string }) => {
  const { myRatingToSubject: rating, loading } =
    useMyEvaluationsContext(subjectId);

  return (
    <div className="card flex flex-col gap-2.5">
      {loading ? (
        <>...</>
      ) : !rating || Number(rating.rating) === 0 ? (
        <>
          <div
            className="font-medium"
            data-testid={`not-evaluated-subject-${subjectId}`}
          >
            You haven’t evaluated this subject yet
          </div>
          <NotEvaluatedCard subjectId={subjectId} />
        </>
      ) : (
        <>
          <div className="font-medium flex">Your evaluation</div>
          <YourEvaluationInfo toSubjectId={subjectId} />
        </>
      )}
    </div>
  );
};
