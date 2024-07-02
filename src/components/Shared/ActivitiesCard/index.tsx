import { useOutboundEvaluationsContext } from 'contexts/SubjectOutboundEvaluationsContext';
import useViewMode from 'hooks/useViewMode';
import moment from 'moment/moment';
import { useMemo } from 'react';

import ProfileEvaluationMini from './ProfileEvaluationMini';

const ActivitiesCard = ({
  subjectId,
  onLastEvaluationClick,
}: {
  subjectId: string;
  onLastEvaluationClick: (subjectId: string) => void;
}) => {
  const { subjectViewModeTitle } = useViewMode();
  const { ratings: outboundRatings } = useOutboundEvaluationsContext({
    subjectId,
  });
  const outboundActiveRatings = useMemo(
    () => outboundRatings?.filter((r) => Number(r.rating)),
    [outboundRatings],
  );
  const lastRating = useMemo(
    () =>
      outboundActiveRatings?.length
        ? outboundActiveRatings[outboundActiveRatings.length - 1]
        : undefined,
    [outboundActiveRatings],
  );
  return (
    <>
      <div className=" mb-4 font-semibold text-xl text-black">
        {subjectViewModeTitle} Activity
      </div>
      <div>
        <div className="flex flex-col gap-1 leading-5 mb-3">
          <div className="flex justify-between">
            <div className="text-black font-medium">Total evaluations:</div>
            <div>
              <span className="font-medium">
                {outboundActiveRatings?.length ?? '...'}{' '}
              </span>
              <span>
                (
                {outboundRatings?.filter((r) => Number(r.rating) > 0).length ??
                  '...'}{' '}
                Pos /
                {outboundRatings?.filter((r) => Number(r.rating) < 0).length ??
                  '...'}{' '}
                Neg)
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-black font-medium">Last evaluation:</div>
            <div>
              <span className="font-medium">
                {lastRating ? moment(lastRating.updatedAt).fromNow() : '-'}
              </span>
            </div>
          </div>
        </div>
        {lastRating && (
          <ProfileEvaluationMini
            fromSubjectId={subjectId}
            toSubjectId={lastRating.toBrightId}
            onClick={() => onLastEvaluationClick(lastRating.toBrightId)}
          ></ProfileEvaluationMini>
        )}
      </div>
    </>
  );
};

export default ActivitiesCard;
