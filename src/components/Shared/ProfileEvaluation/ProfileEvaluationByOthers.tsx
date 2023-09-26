import { getConfidenceValueOfAuraRatingObject } from 'constants/index';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import { useSubjectConnections } from 'hooks/useSubjectConnections';
import { useSubjectInfo } from 'hooks/useSubjectInfo';
import { useInboundRatings } from 'hooks/useSubjectRatings';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthData } from 'store/profile/selectors';
import { AuraInboundConnectionAndRatingData } from 'types';
import { getConnectionLevelAbbreviation } from 'utils';

import { compactFormat } from '../../../utils/number';
import BrightIdProfilePicture from '../../BrightIdProfilePicture';

const ProfileEvaluationByOthers = ({
  evaluatorId,
  subjectId,
  evaluatorOpinionAboutSubject,
  subjectConnections,
  className,
}: {
  evaluatorId: string;
  subjectId: string;
  subjectConnections: ReturnType<typeof useSubjectConnections>;
  evaluatorOpinionAboutSubject: AuraInboundConnectionAndRatingData;
  className?: string;
}) => {
  const subjectProfile = useSubjectBasicInfo(subjectId);
  const evaluatorProfile = useSubjectInfo(evaluatorId);
  const authData = useSelector(selectAuthData);
  const {
    inboundRatings: evaluatorInboundRatings,
    inboundRatingsStatsString: evaluatorInboundRatingsStatsString,
  } = useInboundRatings(evaluatorId);
  const yourEvaluationOfEvaluator = useMemo(
    () =>
      evaluatorInboundRatings?.find(
        (r) => r.fromBrightId === authData?.brightId,
      ),
    [authData?.brightId, evaluatorInboundRatings],
  );
  const {
    inboundConnections: evaluatorInboundConnections,
    outboundConnections: evaluatorOutboundConnections,
  } = useSubjectConnections(evaluatorId);
  return (
    <div
      className={`card__info card flex flex-col gap-3.5
    ${className ? className : ''}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="card__info__left flex items-center gap-1.5">
          <BrightIdProfilePicture
            subjectId={evaluatorId}
            className="w-[52px] h-[52px] rounded-full"
          />
          <div className="flex flex-col gap-1 font-medium text-sm">
            <div>{evaluatorProfile.name}</div>
            <div>
              {/* <span>{inboundConnections?.length || '...'} </span>
              <span className="text-xs">connections</span> */}
              <span>Player level:</span>
              <span className="font-bold"> 1</span>
            </div>
          </div>
        </div>
        <div className="card__info__right flex flex-col items-center">
          <div className="flex items-center gap-1.5 rounded bg-gray00 py-1.5 px-2">
            <img src="/assets/images/Shared/star-icon.svg" alt="" />
            <div className="text-white text-xs">
              {evaluatorProfile.auraScore
                ? compactFormat(evaluatorProfile.auraScore)
                : '-'}{' '}
              (323)
            </div>
          </div>
          <div className="text-xs mt-1">
            {evaluatorInboundRatingsStatsString}{' '}
          </div>
          <div className="text-[10px] text-gray20">
            {evaluatorProfile.isConnection ? 'Mutual Connection' : ''}
          </div>
        </div>
      </div>
      <div>
        <div className="text-xs flex">
          <div className="w-1/2">
            <p className="text-gray">
              {/*{evaluatorProfile.name}&apos;s*/}
              Their evaluation of {subjectProfile.name}
            </p>
            {evaluatorOpinionAboutSubject.rating &&
            Number(evaluatorOpinionAboutSubject.rating.rating) !== 0 ? (
              <p>
                As Subject:{' '}
                {Number(evaluatorOpinionAboutSubject.rating.rating) > 0
                  ? 'Positive'
                  : 'Negative'}{' '}
                -{' '}
                {getConfidenceValueOfAuraRatingObject(
                  evaluatorOpinionAboutSubject.rating,
                )}
              </p>
            ) : (
              <p>
                BrightID: Out -{' '}
                {getConnectionLevelAbbreviation(
                  evaluatorOpinionAboutSubject.inboundConnection?.level,
                )}
                , In -{' '}
                {getConnectionLevelAbbreviation(
                  evaluatorInboundConnections?.find((c) => c.id === subjectId)
                    ?.level,
                )}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <p className="text-gray">Your evaluation of them</p>
            {yourEvaluationOfEvaluator &&
            Number(yourEvaluationOfEvaluator.rating) !== 0 ? (
              <p>
                As Subject:{' '}
                {Number(yourEvaluationOfEvaluator.rating) > 0
                  ? 'Positive'
                  : 'Negative'}{' '}
                -{' '}
                {getConfidenceValueOfAuraRatingObject(
                  yourEvaluationOfEvaluator,
                )}
              </p>
            ) : (
              <p>
                BrightID: Out -{' '}
                {getConnectionLevelAbbreviation(
                  evaluatorInboundConnections?.find(
                    (c) => c.id === authData?.brightId,
                  )?.level,
                )}
                , In -{' '}
                {getConnectionLevelAbbreviation(
                  evaluatorOutboundConnections?.find(
                    (c) => c.id === authData?.brightId,
                  )?.level,
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEvaluationByOthers;
