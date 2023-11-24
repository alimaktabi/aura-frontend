import Modal from 'components/Shared/Modal';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import EvaluateModalBody from 'pages/SubjectProfile/EvaluateModalBody';
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
  const [isEvaluateNowModalOpen, setIsEvaluateNowModalOpen] = useState(false);
  const { name } = useSubjectBasicInfo(subjectId);

  return (
    <>
      <div
        onClick={() => setIsEvaluateNowModalOpen(true)}
        className={`flex flex-col gap-2.5 rounded-[6px] py-2.5 w-full items-center ${bgColor} cursor-pointer`}
      >
        <div>
          <img className="mt-2" src={image} alt="" />
        </div>
        <div className={`font-medium ${textColor}`}>{title}</div>
      </div>
      <Modal
        isOpen={isEvaluateNowModalOpen}
        closeModalHandler={() => setIsEvaluateNowModalOpen(false)}
        title={`Endorsing ${name}`}
      >
        <EvaluateModalBody
          subjectId={subjectId}
          onSubmitted={() => setIsEvaluateNowModalOpen(false)}
        />
      </Modal>
    </>
  );
};
