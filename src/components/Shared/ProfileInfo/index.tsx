import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { SubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { AuraFilterId } from 'hooks/useFilters';
import { useOutboundEvaluations } from 'hooks/useOutboundEvaluations';
import { useSubjectName } from 'hooks/useSubjectName';
import { useSubjectVerifications } from 'hooks/useSubjectVerifications';
import moment from 'moment';
import { useContext, useMemo } from 'react';
import { connectionLevelIcons } from 'utils/connection';

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
  const { userHasRecovery, auraLevel } = useSubjectVerifications(subjectId);
  const name = useSubjectName(subjectId);
  const inboundEvaluationsContext = useContext(
    SubjectInboundEvaluationsContext,
  );
  const { myConnectionToSubject } = useMyEvaluationsContext(subjectId);

  const { outboundConnections, outboundRatings } =
    useOutboundEvaluations(subjectId);

  const lastActivity = useMemo(() => {
    console.log({ outboundConnections, outboundRatings });
    if (outboundConnections !== null && outboundRatings !== null) {
      let timestamp = 0;
      outboundConnections.forEach(
        (c) => (timestamp = Math.max(timestamp, c.timestamp)),
      );
      outboundRatings.forEach(
        (r) =>
          (timestamp = Math.max(timestamp, new Date(r.updatedAt).getTime())),
      );
      return timestamp ? moment(timestamp).fromNow() : '-';
    }
    return '...';
  }, [outboundConnections, outboundRatings]);

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
            <h3 className="text-lg font-medium leading-5 truncate">{name}</h3>
            <div className="flex gap-1">
              {myConnectionToSubject && (
                <img
                  src={`/assets/images/Shared/${
                    connectionLevelIcons[myConnectionToSubject.level]
                  }.svg`}
                  alt=""
                />
              )}
              <strong>{auraLevel}</strong>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 items-end text-sm text-black min-w-[90px]">
          {userHasRecovery !== null && (
            <div
              onClick={() => {
                if (userHasRecovery) {
                  inboundEvaluationsContext?.toggleFilterById(
                    AuraFilterId.EvaluationTheirRecovery,
                    true,
                  );
                }
              }}
              className={`${
                userHasRecovery
                  ? 'bg-orange text-white font-bold'
                  : 'bg-gray-300 text-black'
              } ${
                userHasRecovery && !isPerformance && inboundEvaluationsContext
                  ? 'cursor-pointer'
                  : ''
              } px-2 py-1.5 rounded`}
            >
              <p className="text-xs">
                {userHasRecovery ? 'Has Recovery' : 'No Recovery'}
              </p>
            </div>
          )}
          <p className="text-sm font-light truncate">
            Last Activity: <span className="font-medium">{lastActivity}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
