import EvaluationsDetails from '../../components/Shared/EvaluationsDetails';
import ProfileEvaluation from '../../components/Shared/ProfileEvaluation';
import { ProfileInfo } from '../../components/Shared/ProfileInfo';
import { YourEvaluation } from './YourEvaluation';
import { useMemo, useState } from 'react';
import { Modal } from '../../components/Shared/Modal';
import { EvaluationListModal } from './EvaluationListModal.tsx';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../store/profile/selectors.ts';

const SubjectProfile = () => {
  const [isEvaluationListModalOpen, setIsEvaluationListModalOpen] =
    useState(false);

  const [profiles] = useState([
    {
      id: 1,
      name: 'Adam Stallard',
      image: '/assets/images/profile.jpeg',
      connections: 432,
      mutualConnections: 323,
      rate: '233K',
      evaluationInfo: {
        notes: true,
        evaluation: 'POSITIVE',
        evaluationStrength: 'Very High',
        score: '2.32K',
        isYourEvaluation: false,
      },
    },
    {
      id: 2,
      name: 'Adam Stallard',
      image: 'assets/images/profile.jpeg',
      connections: 432,
      mutualConnections: 323,
      rate: '233K',
      evaluationInfo: {
        notes: false,
        evaluation: 'NEGATIVE',
        evaluationStrength: 'Very High',
        score: '-2.32K',
        isYourEvaluation: false,
      },
    },
    {
      id: 3,
      name: 'Adam Stallard',
      image: 'assets/images/profile.jpeg',
      connections: 432,
      mutualConnections: 323,
      rate: '233K',
      evaluationInfo: {
        notes: true,
        evaluation: 'NEGATIVE',
        evaluationStrength: 'Very High',
        score: '-2.32K',
        isYourEvaluation: false,
      },
    },
  ]);
  const { subjectIdProp } = useParams();
  const authData = useSelector(selectAuthData);
  const subjectId = useMemo(
    () => subjectIdProp ?? authData?.brightId,
    [authData?.brightId, subjectIdProp],
  );
  return (
    <div className="page page__dashboard flex flex-col gap-4">
      <ProfileInfo subjectId={subjectId} />
      <YourEvaluation />
      <EvaluationsDetails subjectId={subjectId} />
      <div>
        <div className="mb-2 flex justify-between">
          <p className="text-lg text-white">Other Evaluations</p>
          <div className="flex items-center gap-1.5">
            <p
              onClick={() => setIsEvaluationListModalOpen(true)}
              className="underline text-sm text-white"
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
          {profiles.map((profile: any) => (
            <ProfileEvaluation
              key={profile.id}
              profile={profile}
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
        <EvaluationListModal />
      </Modal>
    </div>
  );
};

export default SubjectProfile;
