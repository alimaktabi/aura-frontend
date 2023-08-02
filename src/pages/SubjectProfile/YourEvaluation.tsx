import { EvaluationInfo } from '../../components/Shared/EvaluationInfo';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../store/profile/selectors.ts';
import { useSubjectRating } from '../../hooks/useSubjectRating.ts';
import NotEvaluatedCard from './NotEvaluatedCard.tsx';

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
      <div className="font-medium">
        {loading
          ? '...'
          : rating === null
          ? 'You haven’t evaluated this subject yet'
          : 'Your evaluation'}
      </div>
      {loading ? (
        <></>
      ) : rating === null ? (
        <NotEvaluatedCard subjectId={subjectId} />
      ) : (
        <EvaluationInfo
          fromSubjectId={authData.brightId}
          toSubjectId={subjectId}
        />
      )}
    </div>
  );
};
