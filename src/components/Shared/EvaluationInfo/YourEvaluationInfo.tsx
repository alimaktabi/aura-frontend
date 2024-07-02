import EvaluationInfo from 'components/Shared/EvaluationInfo/EvaluationInfo';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { useSelector } from 'store/hooks';
import { selectAuthData } from 'store/profile/selectors';

export const YourEvaluationInfo = ({
  toSubjectId,
  setShowEvaluationFlow,
}: {
  toSubjectId: string;
  setShowEvaluationFlow: (value: boolean) => void;
}) => {
  const { loading } = useMyEvaluationsContext({ subjectId: toSubjectId });
  const authData = useSelector(selectAuthData);
  if (!authData) return <></>;
  if (loading)
    return (
      <div>
        <span className="font-medium">...</span>
      </div>
    );
  return (
    <div className="flex gap-2">
      <EvaluationInfo
        fromSubjectId={authData.brightId}
        toSubjectId={toSubjectId}
      />
      <div
        onClick={() => setShowEvaluationFlow(true)}
        data-testid={`your-evaluation-${authData?.brightId}-${toSubjectId}-edit`}
        className="rounded-md p-2 bg-button-primary cursor-pointer"
      >
        <img
          src="/assets/images/Shared/edit-icon.svg"
          alt=""
          width="20px"
          height="20px"
        />
      </div>
    </div>
  );
};
