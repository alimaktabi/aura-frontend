import EvaluateModalBody from 'components/EvaluationFlow/EvaluateModalBody';
import NewPlayerGuideAfterEvaluation from 'components/EvaluationFlow/NewPlayerGuideAfterEvaluation';
import Modal from 'components/Shared/Modal';
import { PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING } from 'constants/index';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { useSubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { useSubjectName } from 'hooks/useSubjectName';
import { useCallback, useState } from 'react';

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

  const { refreshInboundRatings, myRatingObject } =
    useSubjectInboundEvaluationsContext(subjectId);
  const { refreshOutboundRatings, myRatings } =
    useMyEvaluationsContext(subjectId);

  const [myNewRatingCount, setMyNewRatingCount] = useState<number | null>(null);

  const onSubmitted = useCallback(async () => {
    const myRatingsCount = myRatings?.filter((r) => Number(r.rating)).length;
    refreshInboundRatings();
    refreshOutboundRatings();
    if (!myRatingsCount) return;
    const isNewRating = !(myRatingObject && Number(myRatingObject.rating));
    const newRatingCount = myRatingsCount + (isNewRating ? 1 : 0);
    if (newRatingCount > PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING) {
      setMyNewRatingCount(newRatingCount);
    } else {
      setShowEvaluationFlow(false);
    }
  }, [
    myRatingObject,
    myRatings,
    refreshInboundRatings,
    refreshOutboundRatings,
    setShowEvaluationFlow,
  ]);
  return showEvaluationFlow ? (
    <>
      <Modal
        isOpen={myNewRatingCount === null}
        closeModalHandler={() => setShowEvaluationFlow(false)}
        title={`Endorsing ${name}`}
      >
        <EvaluateModalBody subjectId={subjectId} onSubmitted={onSubmitted} />
      </Modal>
      <Modal
        isOpen={myNewRatingCount !== null}
        closeModalHandler={() => setShowEvaluationFlow(false)}
      >
        <NewPlayerGuideAfterEvaluation
          closeModalHandler={() => setShowEvaluationFlow(false)}
          ratingsDoneCount={myNewRatingCount}
        />
      </Modal>
    </>
  ) : null;
};

export default EvaluationFlow;
