import { useSubjectRating } from 'hooks/useSubjectRating';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAuthData } from 'store/profile/selectors';

import BrightIdProfilePicture from '../../components/BrightIdProfilePicture';
import { useSubjectBasicInfo } from '../../hooks/useSubjectBasicInfo';
import { useInboundRatings } from '../../hooks/useSubjectRatings';
import { compactFormat } from '../../utils/number';

export const SubjectCard = ({
  subjectId,
  index,
}: {
  subjectId: string;
  index?: string | number;
}) => {
  const { tier, name, auraScore } = useSubjectBasicInfo(subjectId);
  const { inboundRatingsStatsString } = useInboundRatings(subjectId);
  const authData = useSelector(selectAuthData);

  const { rating, loading, confidenceValue } = useSubjectRating({
    fromSubjectId: authData?.brightId,
    toSubjectId: subjectId,
  });
  const styleValues = useMemo(() => {
    if (rating?.rating) {
      if (Number(rating.rating) > 0) return '!bg-green-card !opacity-75';
      if (Number(rating.rating) < 0) return '!bg-red-card !opacity-75';
    }
    return '';
  }, [rating]);
  return (
    <Link
      to={'/subject/' + subjectId}
      className={`card card--evaluation b-4 flex !flex-row gap-1 !justify-between w-full ${styleValues}`}
      data-testid={`user-item-${index}`}
    >
      <div className="evaluation-left flex flex-col gap-2">
        <div className="evaluation-left__top flex gap-3">
          <div className="evaluation__profile">
            <BrightIdProfilePicture
              className="rounded-full w-12 h-12 border border-white bg-center bg-cover"
              subjectId={subjectId}
            />
          </div>
          <div className="evaluation__info flex flex-col">
            <p
              className="text-black font-medium"
              data-testid={`user-item-${index}-name`}
            >
              {name}
            </p>
            <p className="text-gray20">
              Tier: <span className="font-medium text-black">{tier}</span>
            </p>
          </div>
        </div>
        <div className="evaluation-left__bottom">
          <p className="text-sm text-gray20">Your evaluation</p>
          <p className="font-medium">
            {loading ? (
              <span className="text-gray20">...</span>
            ) : Number(rating?.rating) > 0 ? (
              <span className="text-green-800">
                Positive{' '}
                <span className="text-black"> - {confidenceValue}</span>
              </span>
            ) : Number(rating?.rating) < 0 ? (
              <span className="text-red-800">
                Negative{' '}
                <span className="text-black"> - {confidenceValue}</span>
              </span>
            ) : (
              <span className="text-gray20">Not Evaluated</span>
            )}
          </p>
        </div>
      </div>
      <div className="evaluation-right flex flex-col gap-2">
        <div className="evaluation-right__top">
          <p className="text-gray20">
            Score:{' '}
            <span className="font-medium text-black">
              {auraScore ? compactFormat(auraScore) : '-'}
            </span>
          </p>
          <p className="text-gray20">
            <span className="font-medium text-black">
              {inboundRatingsStatsString}
            </span>
          </p>
        </div>
        <div className="evaluation-right__bottom">
          <img
            className="w-26.5 h-12"
            src={
              // subject.evaluation === 'NEGATIVE'
              //   ? '/assets/images/negative-chart.svg'
              //   : subject.evaluation === 'POSITIVE'
              //   ? '/assets/images/positive-chart.svg'
              //   :
              '/assets/images/chart.svg'
            }
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};
