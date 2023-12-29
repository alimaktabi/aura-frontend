import EvaluationFlow from 'components/EvaluationFlow/EvaluationFlow';
import { useState } from 'react';

const NotEvaluatedCard = ({ subjectId }: { subjectId: string }) => {
  const [showEvaluationFlow, setShowEvaluationFlow] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2.5 justify-between">
        <div
          data-testid={`evaluate-not-evaluated-subject-${subjectId}`}
          onClick={() => setShowEvaluationFlow(true)}
          className="flex-1 flex flex-row py-4 justify-center items-center bg-pastel-purple gap-2.5 rounded-lg cursor-pointer"
        >
          <img
            className=" w-auto -mr-1"
            src="/assets/images/SubjectProfile/evaluate-now-black.svg"
            alt=""
          />
          <p className="font-bold">Evaluate now!</p>
        </div>
      </div>

      <EvaluationFlow
        showEvaluationFlow={showEvaluationFlow}
        setShowEvaluationFlow={setShowEvaluationFlow}
        subjectId={subjectId}
      />
    </>
  );
};

export default NotEvaluatedCard;
