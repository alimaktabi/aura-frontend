import EvaluateModalBody from 'components/EvaluationFlow/EvaluateModalBody';
import Modal from 'components/Shared/Modal';
import { useSubjectName } from 'hooks/useSubjectName';
import { useState } from 'react';

const EvaluationFlow = ({
  showEvaluationFlow,
  subjectId,
  setShowEvaluationFlow,
}: {
  subjectId: string;
  showEvaluationFlow: boolean;
  setShowEvaluationFlow: (value: boolean) => void;
}) => {
  const name = useSubjectName(subjectId);
  const [isEvaluateNowModalOpen, setIsEvaluateNowModalOpen] = useState(true);

  return showEvaluationFlow ? (
    <>
      <Modal
        isOpen={isEvaluateNowModalOpen}
        closeModalHandler={() => setShowEvaluationFlow(false)}
        title={`Endorsing ${name}`}
      >
        <EvaluateModalBody
          subjectId={subjectId}
          onSubmitted={() => setIsEvaluateNowModalOpen(false)}
        />
      </Modal>
    </>
  ) : null;
};

export default EvaluationFlow;
