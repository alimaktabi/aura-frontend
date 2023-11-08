import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import { useState } from 'react';

import Modal from '../../components/Shared/Modal';
import EvaluateModalBody from './EvaluateModalBody';

const NotEvaluatedCard = ({ subjectId }: { subjectId: string }) => {
  const [isEvaluateNowModalOpen, setIsEvaluateNowModalOpen] = useState(false);
  const { name } = useSubjectBasicInfo(subjectId);

  return (
    <>
      <div className="flex items-center gap-2.5 justify-between">
        <div
          data-testid={`evaluate-not-evaluated-subject-${subjectId}`}
          onClick={() => setIsEvaluateNowModalOpen(true)}
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

export default NotEvaluatedCard;
