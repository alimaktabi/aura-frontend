const NewEvaluationCard = () => {
  return (
    <div className="card">
      <div className="mb-2">You haven’t evaluated this subject yet</div>
      <div className="flex items-center w-full gap-2">
        <EvaluateButton
          bgColor="bg-pastel-purple"
          title="Evaluate Now!"
          image="/assets/images/Shared/user-search-icon.svg"
        />
        <span className="text-sm text-gray00">Or</span>
        <EvaluateButton
          bgColor="bg-pastel-purple bg-opacity-25"
          title="Leave a note"
          image="/assets/images/Shared/new-note-icon.svg"
        />
      </div>
    </div>
  );
};

export default NewEvaluationCard;

const EvaluateButton = ({
  bgColor,
  title,
  image,
}: {
  bgColor: string;
  title: string;
  image: string;
}) => {
  return (
    <div
      className={`flex flex-col gap-2.5 rounded-[6px] py-2.5 w-full items-center ${bgColor}`}
    >
      <div>
        <img className="mt-2" src={image} alt="" />
      </div>
      <div className="font-medium">{title}</div>
    </div>
  );
};
