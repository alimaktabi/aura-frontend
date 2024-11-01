import { getViewModeSubjectBorderColorClass } from 'constants/index';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { SubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { useOutboundEvaluationsContext } from 'contexts/SubjectOutboundEvaluationsContext';
import { AuraFilterId } from 'hooks/useFilters';
import { useSubjectName } from 'hooks/useSubjectName';
import { useSubjectVerifications } from 'hooks/useSubjectVerifications';
import useViewMode from 'hooks/useViewMode';
import moment from 'moment';
import { useContext, useMemo } from 'react';
import { ProfileTab } from 'types/dashboard';
import { connectionLevelIcons } from 'utils/connection';

import NewEvaluationCard from '../../../pages/SubjectProfile/NewEvaluationCard';
import BrightIdProfilePicture from '../../BrightIdProfilePicture';
import { YourEvaluationInfo } from '../EvaluationInfo/YourEvaluationInfo';

export const ProfileInfo = ({
  isPerformance = false,
  subjectId,
  setShowEvaluationFlow,
  setSelectedTab,
}: {
  isPerformance?: boolean;
  subjectId: string;
  setShowEvaluationFlow: (value: boolean) => void;
  setSelectedTab?: (value: ProfileTab) => void;
}) => {
  const { currentViewMode, currentEvaluationCategory } = useViewMode();

  const { userHasRecovery, auraLevel } = useSubjectVerifications(
    subjectId,
    currentEvaluationCategory,
  );
  const name = useSubjectName(subjectId);
  const inboundEvaluationsContext = useContext(
    SubjectInboundEvaluationsContext,
  );
  const { myConnectionToSubject, myRatingNumberToSubject, loading } =
    useMyEvaluationsContext({
      subjectId,
      evaluationCategory: currentEvaluationCategory,
    });

  const { connections: outboundConnections, ratings: outboundRatings } =
    useOutboundEvaluationsContext({ subjectId });

  const lastActivity = useMemo(() => {
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
    <div className="card flex flex-col gap-3">
      <div className="card--header flex justify-between w-full items-center">
        <div className="card--header__left flex gap-4">
          <BrightIdProfilePicture
            className={`card--header__left__avatar rounded-full border-[3px] ${getViewModeSubjectBorderColorClass(
              currentViewMode,
            )} h-[51px] w-[51px]`}
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
                  inboundEvaluationsContext?.toggleFiltersById(
                    [AuraFilterId.TheirRecovery],
                    true,
                  );
                  setSelectedTab?.(ProfileTab.EVALUATIONS);
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
      {!loading && !myRatingNumberToSubject ? (
        <NewEvaluationCard
          subjectId={subjectId}
          setShowEvaluationFlow={setShowEvaluationFlow}
        />
      ) : (
        <YourEvaluationInfo
          toSubjectId={subjectId}
          setShowEvaluationFlow={setShowEvaluationFlow}
          evaluationCategory={currentEvaluationCategory}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
