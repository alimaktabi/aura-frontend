import EvaluationsDetails from '../../components/Shared/EvaluationsDetails';
import SubjectEvaluation from '../../components/Shared/ProfileEvaluation';
import { ProfileInfo } from '../../components/Shared/ProfileInfo';
import { YourEvaluation } from './YourEvaluation';
import { useMemo, useState } from 'react';
import { Modal } from '../../components/Shared/Modal';
import { EvaluationListModal } from './EvaluationListModal.tsx';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../store/profile/selectors.ts';
import { useInboundRatings } from '../../hooks/useSubjectRatings.ts';
import NewEvaluationCard from './NewEvaluationCard.tsx';
import ActivitiesCard from 'components/Shared/ActivitiesCard/index.tsx';

const SubjectProfile = () => {
  const role = 'Player';
  const noteExists = true; // new note or old note
  const [isEvaluationListModalOpen, setIsEvaluationListModalOpen] =
    useState(false);

  const { subjectIdProp } = useParams();
  const authData = useSelector(selectAuthData);
  const subjectId = useMemo(
    () => subjectIdProp ?? authData?.brightId,
    [authData?.brightId, subjectIdProp],
  );
  const { inboundRatings } = useInboundRatings(subjectId);
  if (!subjectId) {
    return <div>Unknown subject id</div>;
  }
  return (
    <div className="page page__dashboard flex flex-col gap-4">
      <ProfileInfo subjectId={subjectId} />
      {noteExists ? (
        <YourEvaluation subjectId={subjectId} />
      ) : (
        <NewEvaluationCard />
      )}
      {role !== 'Player' && <ActivitiesCard />}
      <EvaluationsDetails
        subjectId={subjectId}
        title="Evaluation by Trainers"
        hasHeader={true}
      />
      <div>
        <div className="mb-2 flex justify-between">
          <p className="text-lg text-white">Other Evaluations</p>
          <div className="flex items-center gap-1.5">
            <p
              onClick={() => setIsEvaluationListModalOpen(true)}
              className="underline text-sm text-white cursor-pointer"
            >
              See all
            </p>
            <img
              src="/assets/images/Shared/arrow-right-icon-white.svg"
              alt=""
              className="w-4 h-4"
            />
          </div>
        </div>
        <div className="flex gap-2.5 w-full overflow-x-auto !min-w-[100vw] -ml-5 px-5">
          {inboundRatings?.slice(0, 4).map((rating) => (
            <SubjectEvaluation
              key={rating.id}
              fromSubjectId={rating.fromBrightId}
              toSubjectId={rating.toBrightId}
              className="!min-w-[305px] !py-5"
            />
          ))}
        </div>
      </div>
      <Modal
        title={'Evaluation List'}
        isOpen={isEvaluationListModalOpen}
        noButtonPadding={true}
        closeModalHandler={() => setIsEvaluationListModalOpen(false)}
        className="select-button-with-modal__modal"
      >
        <EvaluationListModal subjectId={subjectId} />
      </Modal>
    </div>
  );
};

export default SubjectProfile;
