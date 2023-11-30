import { useSubjectInfo } from 'hooks/useSubjectInfo';

import BrightIdProfilePicture from '../../BrightIdProfilePicture';

// import { useState } from 'react';
// import { useInboundConnections } from '../../../hooks/useSubjectConnections';
// import { ConnectionListModal } from '../../../pages/SubjectProfile/ConnectionListModal';
// import Modal from '../Modal';

export const ProfileInfo = ({
  isPerformance = false,
  subjectId,
  color = 'pastel-green',
}: {
  isPerformance?: boolean;
  subjectId: string | undefined;
  color?: string;
}) => {
  const { name, userHasRecovery } = useSubjectInfo(subjectId);

  return (
    <div className="card">
      <div className="card--header flex justify-between w-full items-center">
        <div className="card--header__left flex gap-4">
          <BrightIdProfilePicture
            className={`card--header__left__avatar rounded-full border-[3px] ${
              isPerformance ? 'border-' + color : 'border-pastel-purple'
            } h-[51px] w-[51px]`}
            subjectId={subjectId}
          />
          <div className="card--header__left__info flex flex-col justify-center">
            <h3 className="text-lg font-medium leading-5">{name}</h3>
            <div className="flex gap-1">
              <img src="/assets/images/Shared/already-known-icon.svg" alt="" />
              <strong>Level 1</strong>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 items-end text-sm text-black min-w-[90px]">
          {userHasRecovery !== null && (
            <div
              className={`${
                userHasRecovery
                  ? 'bg-orange text-white font-bold'
                  : 'bg-gray-300 text-black'
              } px-2 py-1.5 rounded`}
            >
              <p className="text-xs">
                {userHasRecovery ? 'Has Recovery' : 'No Recovery'}
              </p>
            </div>
          )}
          <p className="text-sm">
            Last Activity: <strong>323d ago</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
