import { EvaluationInfo } from '../../components/Shared/EvaluationInfo';
import { useState } from 'react';

export const YourEvaluation = () => {
  const [info] = useState({
    notes: true,
    evaluation: 'POSITIVE',
    evaluationStrength: 'Very High',
    score: '2.32K',
    isYourEvaluation: true,
  });
  return (
    <div className="card flex flex-col gap-2.5">
      <div className="font-medium">Your Evaluation</div>
      <EvaluationInfo info={info} />
    </div>
  );
};
