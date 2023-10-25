import { useSubjectInfo } from 'hooks/useSubjectInfo';

import { compactFormat } from '../../../utils/number';
import BrightIdProfilePicture from '../../BrightIdProfilePicture';
import { EvaluationInfo } from '../EvaluationInfo';

const ProfileEvaluationByMe = ({
  fromSubjectId,
  toSubjectId,
  className,
}: {
  fromSubjectId: string;
  toSubjectId: string;
  className?: string;
}) => {
  const profile = useSubjectInfo(fromSubjectId);
  // const { inboundConnections } = useInboundConnections(fromSubjectId);
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
            <div>{profile.name}</div>
            <div className="flex items-center gap-1">
              {Math.random() < 0.3 ? (
                <img
                  src="/assets/images/Shared/brightid-icon.svg"
                  className="w-4 h-4"
                  alt=""
                />
              ) : Math.random() < 0.6 ? (
                <img
                  src="/assets/images/Shared/trainer-icon-s-orange.svg"
                  className="w-4 h-4"
                  alt=""
                />
              ) : (
                <img
                  src="/assets/images/Shared/user-search-icon.svg"
                  className="w-[18px] h-[18px]"
                  alt=""
                />
              )}
              <p className="text-black">:</p>
              {Math.random() > 0.5 ? (
                <div className="flex rounded bg-soft-bright justify-evenly w-[30px] h-6 items-center">
                  <img
                    src="/assets/images/Shared/already-known-icon-black.svg"
                    className="w-3.5 h-3.5"
                    alt=""
                  />
                </div>
              ) : (
                <div className="flex rounded bg-pl1 justify-evenly w-[55px] h-6 items-center">
                  <img
                    src="/assets/images/Shared/plus.svg"
                    className="w-3 h-3"
                    alt=""
                  />
                  <img src="/assets/images/Shared/dash-line.svg" alt="" />
                  <p className="text-black text-sm font-bold">3</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card__info__right flex items-stretch gap-1.5">
          <div className="flex flex-col gap-1 justify-center items-center pt-2 rounded bg-gray00 py-1.5 px-2">
            <p className="text-white text-xs">Lvl</p>
            <p className="text-white text-xs">3</p>
          </div>
          <div className="flex flex-col gap-1 rounded bg-gray00 py-1.5 px-2">
            <span className="flex items-center gap-1">
              <img src="/assets/images/Shared/star-icon.svg" alt="" />
              <div className="text-white text-xs pt-1">
                {profile.auraScore ? compactFormat(profile.auraScore) : '-'}
              </div>
            </span>
            <div className="text-white text-xs">
              {profile.isConnection ? '(32 Pos | 5 Neg)' : '...'}
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

export default ProfileEvaluationByMe;
