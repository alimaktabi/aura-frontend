import { EvaluationInfo } from '../EvaluationInfo';

const ProfileEvaluation = ({
  profile,
  className,
}: {
  profile: any;
  className?: string;
}) => {
  return (
    <div
      className={`card__info card flex flex-col gap-3.5
    ${className ? className : ''}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="card__info__left flex items-center gap-1.5">
          <img
            src={profile.image}
            alt=""
            className="w-[52px] h-[52px] rounded-full"
          />
          <div className="flex flex-col gap-1 font-medium text-sm">
            <div>{profile.name}</div>
            <div>
              <span>{profile.connections} </span>
              <span className="text-xs">connections</span>
            </div>
          </div>
        </div>
        <div className="card__info__right flex flex-col items-center">
          <div className="flex items-center gap-1.5 rounded bg-gray00 py-1.5 px-2">
            <img src="/assets/images/Shared/star-icon.svg" alt="" />
            <div className="text-white text-xs">
              {profile.rate} ({profile.mutualConnections})
            </div>
          </div>
          <div className="text-[10px] text-gray20">Mutual Connection</div>
        </div>
      </div>
      <EvaluationInfo info={profile.evaluationInfo} />
    </div>
  );
};

export default ProfileEvaluation;
