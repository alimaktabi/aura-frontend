import { PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING } from 'constants/index';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { useSubjectVerifications } from 'hooks/useSubjectVerifications';
import { useMemo } from 'react';

const ProfileInfoPerformance = ({
  subjectId,
  isPerformance,
  color = 'pastel-green',
}: {
  subjectId: string;
  isPerformance: boolean;
  color: string;
}) => {
  const { auraLevel } = useSubjectVerifications(subjectId);
  const { myRatings } = useMyEvaluationsContext();
  const ratingsToBeDoneCount = useMemo(
    () =>
      myRatings
        ? Math.max(
            PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING -
              myRatings.filter((r) => Number(r.rating)).length,
            0,
          )
        : undefined,
    [myRatings],
  );

  const progressPercentage = useMemo(() => {
    if (ratingsToBeDoneCount) {
      return Math.floor(
        ((PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING -
          ratingsToBeDoneCount) *
          100) /
          PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING,
      );
    }
    return 73;
  }, [ratingsToBeDoneCount]);
  return (
    <div className="card relative">
      <div className="absolute top-0 right-0">
        <img src="/assets/images/Home/level-up-icon.svg" alt="" />
      </div>
      <div className="flex flex-row gap-4 w-full items-end">
        {ratingsToBeDoneCount === 0 && (
          <div className="flex flex-col items-center justify-between gap-1.5 rounded-[6px] bg-primary-l1 px-2 py-1.5">
            <div className="font-bold leading-4">Level</div>
            <div className="font-black leading-6 text-2xl">{auraLevel}</div>
          </div>
        )}
        <div className="flex flex-col w-full gap-3.5">
          <div className="flex flex-row items-end gap-1">
            {ratingsToBeDoneCount === undefined ? (
              '...'
            ) : ratingsToBeDoneCount > 0 ? (
              <>
                <span className="text-2xl font-black">
                  {ratingsToBeDoneCount}
                </span>
                <span className="text-lg font-medium">
                  more evaluation{ratingsToBeDoneCount > 1 ? `s` : ''} to unlock
                  Level-up
                </span>
              </>
            ) : (
              <>
                <span className="text-2xl font-black">25,234</span>
                <span className="text-lg font-medium">to</span>
                <span className="text-lg font-medium text-button-primary">
                  Level 3
                </span>
              </>
            )}
          </div>
          <div className="w-full relative bg-gray30 rounded-full h-4">
            <div
              className={`absolute bg-primary-d1 rounded-full h-full`}
              style={{ width: progressPercentage + '%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoPerformance;
