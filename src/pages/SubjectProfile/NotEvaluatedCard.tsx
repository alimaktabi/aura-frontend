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
          className="flex-1 flex flex-col max-w-[136px] py-4 justify-center items-center bg-pastel-purple gap-2.5 rounded-lg cursor-pointer"
        >
          <img
            className="h-8 w-auto -mr-1"
            src="/assets/images/SubjectProfile/evaluate-now.svg"
            alt=""
          />
          <p className="font-bold text-sm text-white">Evaluate now!</p>
        </div>
        <p className="font-medium text-sm">Or</p>
        <div className="flex-1 flex flex-col max-w-[136px] py-4 justify-center items-center bg-pastel-purple-25 gap-2.5 rounded-lg">
          <img
            className="h-8 w-auto -mr-2"
            src="/assets/images/SubjectProfile/leave-note.svg"
            alt=""
          />
          <p className="font-medium text-sm">Leave a note</p>
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
