import ActivitiesCard from 'components/Shared/ActivitiesCard/index';
import SubjectEvaluation from 'components/Shared/ProfileEvaluation/ProfileEvaluationByMe';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EvaluationsDetails from '../../components/Shared/EvaluationsDetails';
import { Modal } from '../../components/Shared/Modal';
import { ProfileInfo } from '../../components/Shared/ProfileInfo';
import { ToggleInput } from '../../components/Shared/ToggleInput';
import { useInboundRatings } from '../../hooks/useSubjectRatings';
import { selectAuthData } from '../../store/profile/selectors';
import { EvaluationListModal } from './EvaluationListModal';
import NewEvaluationCard from './NewEvaluationCard';
import { YourEvaluation } from './YourEvaluation';

const SubjectProfile = () => {
  const role = 'Player';
  const noteExists = useMemo(() => true, []); // new note or old note
  const [isEvaluationListModalOpen, setIsEvaluationListModalOpen] =
    useState(false);

  const { subjectIdProp } = useParams();
  const authData = useSelector(selectAuthData);
  const subjectId = useMemo(
    () => subjectIdProp ?? authData?.brightId,
    [authData?.brightId, subjectIdProp],
  );
  const { name } = useSubjectBasicInfo(subjectId);
  const { inboundRatings } = useInboundRatings(subjectId);
  const hasNoteOrEvaluated = useMemo(() => {
    if (noteExists) return true;
    if (!authData?.brightId) return false;
    const rating = inboundRatings?.find(
      (r) => r.fromBrightId === authData?.brightId,
    )?.rating;
    return rating && Math.abs(Number(rating)) > 0;
  }, [authData?.brightId, inboundRatings, noteExists]);

  const [isOverviewSelected, setIsOverviewSelected] = useState(true);

  return !subjectId ? (
    <div>Unknown subject id</div>
  ) : (
    <div className="page page__dashboard flex flex-col gap-4">
      <ProfileInfo subjectId={subjectId} />
      {hasNoteOrEvaluated ? (
        <YourEvaluation subjectId={subjectId} />
      ) : (
        <NewEvaluationCard />
      )}
      {/* if role is not player then show activities card */}
      {role !== 'Player' && <ActivitiesCard />}
      <ToggleInput
        option1="Overview"
        option2="Detailed List"
        isChecked={isOverviewSelected}
        setIsChecked={setIsOverviewSelected}
      />
      <EvaluationsDetails subjectId={subjectId} />
      {/* could have header based on the role */}
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
        title={`Evaluations on ${name}`}
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
