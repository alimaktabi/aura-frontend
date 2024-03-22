import { useOutboundEvaluationsContext } from 'contexts/SubjectOutboundEvaluationsContext';
import useViewMode from 'hooks/useViewMode';
import moment from 'moment/moment';
import { useMemo } from 'react';

import ProfileEvaluationMini from './ProfileEvaluationMini';

const ActivitiesCard = ({ subjectId }: { subjectId: string }) => {
  const { viewMode, subjectViewModeTitle } = useViewMode();
  const { outboundRatings } = useOutboundEvaluationsContext(subjectId);
  const lastRating = useMemo(
    () =>
      outboundRatings?.length
        ? outboundRatings[outboundRatings.length - 1]
        : undefined,
    [outboundRatings],
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
              <span className="font-medium">23 </span>
              <span>(18 Pos / 5 Neg)</span>
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
          ></ProfileEvaluationMini>
        )}
      </div>
    </>
  );
};

export default ActivitiesCard;
