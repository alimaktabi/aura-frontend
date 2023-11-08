import { YourEvaluationInfo } from 'components/Shared/EvaluationInfo/YourEvaluationInfo';
import { useSelector } from 'react-redux';

import { useSubjectRating } from '../../hooks/useSubjectRating';
import { selectAuthData } from '../../store/profile/selectors';
import NotEvaluatedCard from './NotEvaluatedCard';

export const YourEvaluation = ({ subjectId }: { subjectId: string }) => {
  const authData = useSelector(selectAuthData);

  const { rating, loading } = useSubjectRating({
    fromSubjectId: authData?.brightId,
    toSubjectId: subjectId,
  });

  if (!authData) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="card flex flex-col gap-2.5">
      {loading ? (
        <>...</>
      ) : rating === null || Number(rating.rating) === 0 ? (
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
          <YourEvaluationInfo
            fromSubjectId={authData.brightId}
            toSubjectId={subjectId}
          />
        </>
      )}
    </div>
  );
};
