import { EvaluationInfo } from '../../components/Shared/EvaluationInfo';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../store/profile/selectors.ts';

export const YourEvaluation = ({ subjectId }: { subjectId: string }) => {
  const authData = useSelector(selectAuthData);
  if (!authData) {
    return <div>Not logged in</div>;
  }
  return (
    <div className="card flex flex-col gap-2.5">
      <div className="font-medium">Your Evaluation</div>
      <EvaluationInfo
        fromSubjectId={authData.brightId}
        toSubjectId={subjectId}
      />
    </div>
  );
};
