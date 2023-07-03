import { ConnectionListModal } from '../../../pages/SubjectProfile/ConnectionListModal.tsx';
import Modal from '../Modal';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import BrightIdProfilePicture from '../../BrightIdProfilePicture.tsx';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../../store/profile/selectors.ts';
import { useSubjectBasicInfo } from '../../../hooks/useSubjectBasicInfo.ts';

export const ProfileInfo = ({
  isPerformance = false,
}: {
  isPerformance?: boolean;
}) => {
  const { subjectIdProp } = useParams();
  const authData = useSelector(selectAuthData);
  const subjectId = useMemo(
    () => subjectIdProp ?? authData?.brightId,
    [authData?.brightId, subjectIdProp],
  );
  const { tier, userHasRecovery, name, joinedDateString, auraPublicProfile } =
    useSubjectBasicInfo(subjectId);
  return (
    <div className="card">
      <div className="card--header flex justify-between w-full items-center">
        <div className="card--header__left flex gap-4">
          <BrightIdProfilePicture
            className="card--header__left__avatar rounded-full border border-[3px] border-pastel-purple h-[51px] w-[51px]"
            id={subjectId}
          />
          <div className="card--header__left__info flex flex-col justify-center">
            <h3 className="text-lg font-medium leading-5">{name}</h3>
            <div className="leading-5">
              {isPerformance ? (
                <>
                  <span>Player Tier: </span>
                  <span className="font-medium">1</span>
                </>
              ) : tier ? (
                <>
                  <span className="font-medium">{tier} </span>
                  <span>Subject</span>
                </>
              ) : (
                <span className="font-medium">Loading...</span>
              )}
            </div>
          </div>
        </div>
        {isPerformance ? <PerformanceInfo /> : <ConnectionsButton />}
      </div>
      <hr className="my-5 border-dashed" />
      <div className="card--body text-sm">
        {auraPublicProfile ? (
          <>
            <span className="font-normal">Joined at </span>
            <span className="font-medium">
              {new Date(auraPublicProfile.brightIdDate).toLocaleDateString()} (
              {joinedDateString} ago)
            </span>
          </>
        ) : (
          'loading...'
        )}
      </div>
      <div className="card--body text-sm">
        <span className="font-normal">
          {userHasRecovery === null
            ? 'loading...'
            : userHasRecovery
            ? 'user has recovery'
            : 'recovery not set up'}
        </span>
      </div>
    </div>
  );
};

const ConnectionsButton = () => {
  const [isConnectionsListModalOpen, setIsConnectionsListModalOpen] =
    useState(false);
  return (
    <>
      <div
        onClick={() => setIsConnectionsListModalOpen(true)}
        className="card--header__right flex flex-col justify-center bg-pastel-purple rounded h-full py-2 px-3.5"
      >
        <div className="flex w-full justify-between items-center">
          <div className="font-bold text-white leading-5">439</div>
          <img src="/assets/images/Shared/arrow-right-icon-white.svg" alt="" />
        </div>
        <div className="font-bold text-sm text-white leading-5">
          Connections
        </div>
      </div>
      <Modal
        title={'Connections List'}
        isOpen={isConnectionsListModalOpen}
        noButtonPadding={true}
        closeModalHandler={() => setIsConnectionsListModalOpen(false)}
        className="select-button-with-modal__modal"
      >
        <ConnectionListModal />
      </Modal>
    </>
  );
};

const PerformanceInfo = () => {
  return (
    <div className="card--header__right flex flex-col justify-center bg-pastel-purple rounded h-full py-1.5 px-2 items-center">
      <div className="flex gap-1.5 items-center">
        <img
          className="w-3.5 h-3.5"
          src="/assets/images/Shared/star-icon.svg"
          alt=""
        />
        <div className="font-medium text-white leading-5">439,232</div>
      </div>
      <div className="font-medium text-sm text-white leading-5">
        <span>Rank: </span>
        <span className="font-bold">13</span>
      </div>
    </div>
  );
};

export default ProfileInfo;
