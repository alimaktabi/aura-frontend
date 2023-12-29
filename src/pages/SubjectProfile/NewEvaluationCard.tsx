import EvaluationFlow from 'components/EvaluationFlow/EvaluationFlow';
import { useState } from 'react';

const NewEvaluationCard = ({ subjectId }: { subjectId: string }) => {
  return (
    <div className="card">
      <div className="mb-2">You haven’t evaluated this subject yet</div>
      <div className="flex items-center w-full gap-2">
        <EvaluateButton
          subjectId={subjectId}
          textColor="text-black"
          bgColor="bg-pastel-purple"
          title="Evaluate Now!"
          image="/assets/images/Shared/user-search-icon.svg"
        />
      </div>
    </div>
  );
};

export default NewEvaluationCard;

const EvaluateButton = ({
  bgColor,
  textColor,
  title,
  image,
  subjectId,
}: {
  bgColor: string;
  textColor: string;
  title: string;
  image: string;
  subjectId: string;
}) => {
  const [showEvaluationFlow, setShowEvaluationFlow] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowEvaluationFlow(true)}
        className={`flex flex-col gap-2.5 rounded-[6px] py-2.5 w-full items-center ${bgColor} cursor-pointer`}
      >
        <div>
          <img className="mt-2" src={image} alt="" />
        </div>
        <div className={`font-medium ${textColor}`}>{title}</div>
      </div>

      <EvaluationFlow
        showEvaluationFlow={showEvaluationFlow}
        setShowEvaluationFlow={setShowEvaluationFlow}
        subjectId={subjectId}
      />
    </>
  );
};
