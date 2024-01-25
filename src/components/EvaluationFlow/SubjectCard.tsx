import BrightIdProfilePicture from 'components/BrightIdProfilePicture';
import { EchartsContext } from 'contexts/EchartsContext';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { useSubjectInboundRatingsContext } from 'contexts/SubjectInboundRatingsContext';
import ReactECharts from 'echarts-for-react';
import useParseBrightIdVerificationData from 'hooks/useParseBrightIdVerificationData';
import { useSubjectName } from 'hooks/useSubjectName';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { connectionLevelIconsBlack } from 'utils/connection';
import { compactFormat } from 'utils/number';

export const SubjectCard = ({
  subjectId,
  index,
}: {
  subjectId: string;
  index?: string | number;
}) => {
  const name = useSubjectName(subjectId);
  const { inboundRatingsStatsString } =
    useSubjectInboundRatingsContext(subjectId);

  const { options3 } = useContext(EchartsContext);

  const {
    myRatingToSubject: rating,
    loading,
    myConnectionToSubject: inboundConnectionInfo,
    myConfidenceValueInThisSubjectRating: confidenceValue,
  } = useMyEvaluationsContext(subjectId);

  const { auraLevel, auraScore } = useParseBrightIdVerificationData(
    inboundConnectionInfo?.verifications,
  );

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
      data-testid={`subject-card-${subjectId}`}
    >
      <div
        className="evaluation-left flex flex-col gap-2"
        data-testid={`user-item-${index}`}
      >
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
              Level: <span className="font-medium text-black">{auraLevel}</span>
            </p>
          </div>
        </div>
        <div className="evaluation-left__bottom">
          <p className="text-sm text-gray20">
            {Number(rating?.rating) ? 'Your evaluation' : 'Your connection'}
          </p>
          <div
            className="font-medium"
            data-testid={`user-item-${index}-evaluation`}
          >
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
            ) : inboundConnectionInfo ? (
              <div className="flex">
                <img
                  className="pr-1"
                  src={`/assets/images/Shared/${
                    connectionLevelIconsBlack[inboundConnectionInfo.level]
                  }.svg`}
                  alt=""
                />
                {inboundConnectionInfo.level}
              </div>
            ) : (
              '-'
            )}
          </div>
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
          <ReactECharts
            style={{ height: '48px', width: '100%' }}
            option={options3}
            // className="w-26.5 h-12"
          />
        </div>
      </div>
    </Link>
  );
};