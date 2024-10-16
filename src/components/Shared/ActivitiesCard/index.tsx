import { useOutboundEvaluationsContext } from 'contexts/SubjectOutboundEvaluationsContext';
import moment from 'moment/moment';
import { useMemo } from 'react';

import {
  viewModeSubjectString,
  viewModeToSubjectViewMode,
  viewModeToViewAs,
} from '../../../constants';
import { PreferredView } from '../../../types/dashboard';
import ProfileEvaluationMini from './ProfileEvaluationMini';

const ActivitiesCard = ({
  subjectId,
  onLastEvaluationClick,
  viewMode,
}: {
  subjectId: string;
  onLastEvaluationClick: (subjectId: string) => void;
  viewMode: PreferredView;
}) => {
  const { ratings: outboundRatings } = useOutboundEvaluationsContext({
    subjectId,
    evaluationCategory: viewModeToViewAs[viewModeToSubjectViewMode[viewMode]],
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
        {viewModeSubjectString[viewMode]} Activity
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
                  '...'}
                {' Pos / '}
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
            evaluationCategory={
              viewModeToViewAs[viewModeToSubjectViewMode[viewMode]]
            }
            onClick={() => onLastEvaluationClick(lastRating.toBrightId)}
          ></ProfileEvaluationMini>
        )}
      </div>
    </>
  );
};

export default ActivitiesCard;
