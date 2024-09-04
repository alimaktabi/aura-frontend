import EvaluationInfo from 'components/Shared/EvaluationInfo/EvaluationInfo';
import { useSelector } from 'store/hooks';
import { selectAuthData } from 'store/profile/selectors';

import { useSubjectEvaluationFromContext } from '../../../hooks/useSubjectEvaluation';
import { EvaluationCategory } from '../../../types/dashboard';

export const YourEvaluationInfo = ({
  toSubjectId,
  setShowEvaluationFlow,
  evaluationCategory,
}: {
  toSubjectId: string;
  setShowEvaluationFlow: (value: boolean) => void;
  evaluationCategory: EvaluationCategory;
}) => {
  const authData = useSelector(selectAuthData);
  const { loading } = useSubjectEvaluationFromContext({
    fromSubjectId: authData?.brightId,
    toSubjectId,
    evaluationCategory,
  });
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
        evaluationCategory={evaluationCategory}
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
