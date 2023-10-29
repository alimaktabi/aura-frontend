import { useSubjectEvaluation } from 'hooks/useSubjectEvaluation';
import { useSubjectInfo } from 'hooks/useSubjectInfo';
import { useInboundRatings } from 'hooks/useSubjectRatings';
import { useSelector } from 'react-redux';
import { selectAuthData } from 'store/profile/selectors';
import { connectionLevelIconsBlack } from 'utils/connection';

import { compactFormat } from '../../../utils/number';
import BrightIdProfilePicture from '../../BrightIdProfilePicture';
import { EvaluationInfo } from '../EvaluationInfo';

const ProfileEvaluation = ({
  fromSubjectId,
  toSubjectId,
  className,
}: {
  fromSubjectId: string;
  toSubjectId: string;
  className?: string;
}) => {
  const { auraScore, level, name } = useSubjectInfo(fromSubjectId);
  const { inboundRatingsStatsString } = useInboundRatings(fromSubjectId);
  const authData = useSelector(selectAuthData);
  const { loading, ratingNumber, inboundConnectionInfo } = useSubjectEvaluation(
    {
      fromSubjectId: authData?.brightId,
      toSubjectId: fromSubjectId,
    },
  );
  return (
    <div
      className={`card__info card flex flex-col gap-3
    ${className ? className : ''}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="card__info__left flex items-center gap-1.5">
          <BrightIdProfilePicture
            subjectId={fromSubjectId}
            className="w-[52px] h-[52px] rounded-lg border-2 border-pastel-purple"
          />
          <div className="flex flex-col gap-1 font-medium text-sm">
            <div>{name}</div>
            {loading ? (
              <div>...</div>
            ) : inboundConnectionInfo ? (
              <div className="flex items-center gap-1">
                {
                  //   (
                  //   <img
                  //     src="/assets/images/Shared/trainer-icon-s-orange.svg"
                  //     className="w-4 h-4"
                  //     alt=""
                  //   />
                  // )
                  ratingNumber ? (
                    <img
                      src="/assets/images/Shared/user-search-icon.svg"
                      className="w-[18px] h-[18px]"
                      alt=""
                    />
                  ) : (
                    <img
                      src="/assets/images/Shared/brightid-icon.svg"
                      className="w-4 h-4"
                      alt=""
                    />
                  )
                }
                <p className="text-black">:</p>
                {ratingNumber ? (
                  <div
                    className={`flex rounded ${
                      ratingNumber > 0 ? 'bg-pl1' : 'bg-nl1'
                    } justify-evenly w-[55px] h-6 items-center`}
                  >
                    <img
                      src={`/assets/images/Shared/${
                        ratingNumber > 0 ? 'plus' : 'minus-icon'
                      }.svg`}
                      className="w-3 h-3"
                      alt=""
                    />
                    <img src="/assets/images/Shared/dash-line.svg" alt="" />
                    <p className="text-black text-sm font-bold">
                      {Math.abs(ratingNumber)}
                    </p>
                  </div>
                ) : (
                  <div className="flex rounded bg-soft-bright justify-evenly w-[30px] h-6 items-center">
                    <img
                      src={`/assets/images/Shared/${
                        connectionLevelIconsBlack[inboundConnectionInfo?.level]
                      }.svg`}
                      className="w-3.5 h-3.5"
                      alt=""
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>-</div>
            )}
          </div>
        </div>
        <div className="card__info__right flex items-stretch gap-1.5">
          <div className="flex flex-col gap-1 justify-center items-center pt-2 rounded bg-gray00 py-1.5 px-2">
            <p className="text-white text-xs">Lvl</p>
            <p className="text-white text-xs">{level ?? '...'}</p>
          </div>
          <div className="flex flex-col gap-1 rounded bg-gray00 py-1.5 px-2">
            <span className="flex items-center gap-1">
              <img src="/assets/images/Shared/star-icon.svg" alt="" />
              <div className="text-white text-xs pt-1">
                {auraScore ? compactFormat(auraScore) : '-'}
              </div>
            </span>
            <div className="text-white text-xs">
              {inboundRatingsStatsString
                ? `(${inboundRatingsStatsString})`
                : '...'}
            </div>
          </div>
          {/*<div className="text-[10px] text-gray20">*/}
          {/*  {profile.isConnection ? 'Mutual Connection' : ''}*/}
          {/*</div>*/}
        </div>
      </div>
      <EvaluationInfo fromSubjectId={fromSubjectId} toSubjectId={toSubjectId} />
    </div>
  );
};

export default ProfileEvaluation;
