import { useSubjectBasicInfo } from '../../../hooks/useSubjectBasicInfo';
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
  const profile = useSubjectBasicInfo(fromSubjectId);
  // const { inboundConnections } = useInboundConnections(fromSubjectId);
  return (
    <div
      className={`card__info card flex flex-col gap-3.5
    ${className ? className : ''}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="card__info__left flex items-center gap-1.5">
          <BrightIdProfilePicture
            subjectId={fromSubjectId}
            className="w-[52px] h-[52px] rounded-full"
          />
          <div className="flex flex-col gap-1 font-medium text-sm">
            <div>{profile.name}</div>
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
              {profile.auraScore ? compactFormat(profile.auraScore) : '-'} (323)
            </div>
          </div>
          <div className="text-[10px] text-gray20">
            {profile.isConnection ? 'Mutual Connection' : ''}
          </div>
        </div>
      </div>
      <EvaluationInfo fromSubjectId={fromSubjectId} toSubjectId={toSubjectId} />
    </div>
  );
};

export default ProfileEvaluation;
