const NewEvaluationCard = ({
  subjectId,
  setShowEvaluationFlow,
}: {
  subjectId: string;
  setShowEvaluationFlow: (value: boolean) => void;
}) => {
  return (
    <div className="card">
      <div className="mb-2" data-testid={`not-evaluated-subject-${subjectId}`}>
        You haven’t evaluated this subject yet
      </div>
      <div className="flex items-center w-full gap-2">
        <EvaluateButton
          setShowEvaluationFlow={setShowEvaluationFlow}
          subjectId={subjectId}
          textColor="text-black"
          bgColor="bg-pastel-purple"
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
  image,
  subjectId,
  setShowEvaluationFlow,
}: {
  bgColor: string;
  textColor: string;
  image: string;
  subjectId: string;
  setShowEvaluationFlow: (value: boolean) => void;
}) => {
  return (
    <>
      <div
        onClick={() => setShowEvaluationFlow(true)}
        data-testid={`evaluate-not-evaluated-subject-${subjectId}`}
        className={`flex flex-col gap-2.5 rounded-[6px] py-2.5 w-full items-center ${bgColor} cursor-pointer`}
      >
        <div>
          <img className="mt-2" src={image} alt="" />
        </div>
        <div className={`font-medium ${textColor}`}>Evaluate Now!</div>
      </div>
    </>
  );
};
