import { EvaluationInfo } from '../../components/Shared/EvaluationInfo';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../store/profile/selectors.ts';
import { useSubjectRating } from '../../hooks/useSubjectRating.ts';

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
        <div className="flex items-center gap-2.5 justify-between">
          <div className="flex-1 flex flex-col max-w-[136px] py-4 justify-center items-center bg-pastel-purple gap-2.5 rounded-lg">
            <img
              className="h-8 w-auto -mr-1"
              src="/assets/images/SubjectProfile/evaluate-now.svg"
              alt=""
            />
            <p className="font-bold text-sm text-white">Evaluate now!</p>
          </div>
          <p className="font-medium text-sm">Or</p>
          <div className="flex-1 flex flex-col max-w-[136px] py-4 justify-center items-center bg-pastel-purple-25 gap-2.5 rounded-lg">
            <img
              className="h-8 w-auto -mr-2"
              src="/assets/images/SubjectProfile/leave-note.svg"
              alt=""
            />
            <p className="font-medium text-sm">Leave a note</p>
          </div>
        </div>
      ) : (
        <EvaluationInfo
          fromSubjectId={authData.brightId}
          toSubjectId={subjectId}
        />
      )}
    </div>
  );
};
