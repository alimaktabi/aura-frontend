import { EvaluationInfo } from '../../components/Shared/EvaluationInfo';

export const YourEvaluation = () => {
  return (
    <div className="card flex flex-col gap-2.5">
      <div className="font-medium">Your Evaluation</div>
      <EvaluationInfo
        notes={true}
        evaluation="POSITIVE"
        evaluationStrength="Very High"
        score="2.32K"
        isYourEvaluation={true}
      />
    </div>
  );
};
