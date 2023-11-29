import { getConfidenceValueOfAuraRatingNumber } from 'constants/index';
import { useSubjectEvaluationFromContext } from 'hooks/useSubjectEvaluation';
import { useSubjectInfo } from 'hooks/useSubjectInfo';
import { useInboundRatings } from 'hooks/useSubjectRatings';
import { connectionLevelIcons } from 'utils/connection';
import { compactFormat } from 'utils/number';
// import { connectionLevelIconsBlack } from 'utils/connection';

export const EvaluationInfo = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  const { level, auraScore } = useSubjectInfo(fromSubjectId);

  const { rating, loading, inboundConnectionInfo } =
    useSubjectEvaluationFromContext({
      fromSubjectId,
      toSubjectId,
    });

  const { inboundPositiveRatingsCount, inboundNegativeRatingsCount } =
    useInboundRatings(fromSubjectId);

  if (loading)
    return (
      <div>
        <span className="font-medium">...</span>
      </div>
    );

  return (
    <div className="flex gap-1 justify-between">
      <div className="text-white text-xs bg-gray00 rounded px-2 py-1.5">
        <p className="mb-1">
          {/*{Math.random() > 0.5 ? 'Player' : 'Subject'} */}
          Subject level <strong>{level}</strong>
          <strong className="ml-4">
            {auraScore ? compactFormat(auraScore) : '-'}
          </strong>
        </p>
        <p>
          <strong>{inboundPositiveRatingsCount ?? '...'}</strong> Pos |{' '}
          <strong>{inboundNegativeRatingsCount ?? '...'}</strong> Neg
        </p>
      </div>
      {rating && Number(rating.rating) ? (
        <div
          className={`${
            Number(rating.rating) > 0 ? 'bg-pl1' : 'bg-nl1'
          } rounded px-2 py-1.5 text-xs`}
        >
          <div className="flex items-center gap-1 mb-1">
            {Number(rating.rating) > 0 && (
              <img src="/assets/images/Shared/thumbs-up.svg" alt="" />
            )}
            <strong className="">{`${getConfidenceValueOfAuraRatingNumber(
              Number(rating.rating),
            )} ${rating.rating}`}</strong>
          </div>
          <div className="flex justify-between items-center">
            <p>Impact:</p>
            <strong>12%</strong>
          </div>
        </div>
      ) : inboundConnectionInfo ? (
        <>
          <img
            src={`/assets/images/Shared/${
              connectionLevelIcons[inboundConnectionInfo.level]
            }.svg`}
            alt=""
          />
          {inboundConnectionInfo.level}
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};
