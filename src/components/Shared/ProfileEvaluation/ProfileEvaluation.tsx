// import { useSubjectEvaluation } from 'hooks/useSubjectEvaluation';
// import { useSubjectInfo } from 'hooks/useSubjectInfo';
// import { useInboundRatings } from 'hooks/useSubjectRatings';

// import { useSelector } from 'react-redux';
// import { selectAuthData } from 'store/profile/selectors';
// import { connectionLevelIconsBlack } from 'utils/connection';
// import { compactFormat } from '../../../utils/number';
import { getConfidenceValueOfAuraRatingNumber } from 'constants/index';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import {
  useSubjectEvaluation,
  useSubjectEvaluationFromContext,
} from 'hooks/useSubjectEvaluation';
import { useSubjectInfo } from 'hooks/useSubjectInfo';
import moment from 'moment';
import { useMemo } from 'react';
import { connectionLevelIcons } from 'utils/connection';
import { compactFormat } from 'utils/number';

import BrightIdProfilePicture from '../../BrightIdProfilePicture';

const ProfileEvaluation = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  const { loading, ratingNumber } = useSubjectEvaluation({
    fromSubjectId,
    toSubjectId,
  });
  return (
    <div
      className={`profile-evaluation-card card flex !flex-row gap-1.5 w-full pl-[9px] pt-[11px] pr-[14px] pb-3`}
    >
      {loading ? (
        'Loading...'
      ) : ratingNumber ? (
        <EvaluatedCardBody
          fromSubjectId={fromSubjectId}
          toSubjectId={toSubjectId}
        />
      ) : (
        <ConnectedCardBody
          fromSubjectId={fromSubjectId}
          toSubjectId={toSubjectId}
        />
      )}
    </div>
  );
};

const ConnectionInfo = ({ subjectId }: { subjectId: string }) => {
  const {
    myRatingToSubject: rating,
    loading,
    myConnectionToSubject: inboundConnectionInfo,
  } = useMyEvaluationsContext(subjectId);
  return (
    <div className="flex flex-col gap-0.5">
      {loading ? (
        '...'
      ) : (
        <>
          <div className="flex gap-0.5 justify-center items-center">
            {inboundConnectionInfo && (
              <img
                src={`/assets/images/Shared/${
                  connectionLevelIcons[inboundConnectionInfo.level]
                }.svg`}
                className="h-[18px] w-[18px]"
                alt=""
              />
            )}
            {!!rating && Number(rating?.rating) !== 0 && (
              <p
                className={`${
                  Number(rating?.rating) > 0 ? 'text-green' : 'text-red-700'
                } text-sm font-bold`}
              >
                {Number(rating.rating) < 0 ? '-' : '+'}
                {Math.abs(Number(rating.rating))}
              </p>
            )}
          </div>
          {!!rating && Number(rating?.rating) !== 0 && (
            <p
              className={`impact-percentage ${
                Number(rating?.rating) > 0 ? 'text-green' : 'text-red-700'
              } text-[11px] font-bold text-center w-full`}
            >
              12%
            </p>
          )}
        </>
      )}
    </div>
  );
};

const UserName = ({ subjectId }: { subjectId: string }) => {
  const { name } = useSubjectBasicInfo(subjectId);
  return (
    <div className="flex gap-1 items-center">
      <p className="name font-medium text-sm">{name}</p>
      <span className="flex bg-pastel-purple h-[14px] w-5 items-center justify-center rounded-full cursor-pointer">
        <BrightIdProfilePicture
          subjectId={subjectId}
          className="h-[10px] w-[10px]"
        />
      </span>
    </div>
  );
};

const UserInformation = ({ subjectId }: { subjectId: string }) => {
  const { level, auraScore, loading } = useSubjectInfo(subjectId);
  return (
    <div className="bg-gray00 rounded p-1 pr-2 flex gap-1 items-center mb-1.5">
      <img src="/assets/images/player.svg" alt="" className="w-6 h-6" />
      {loading ? (
        <p className="level text-sm font-bold mr-0.5 text-purple2">...</p>
      ) : (
        <>
          <p className="level text-sm font-bold mr-0.5 text-purple2">{level}</p>
          <p className="text-sm font-bold text-purple2">
            {/*13.4<span className="font-medium">m</span>*/}
            {auraScore ? compactFormat(auraScore) : '-'}
          </p>
        </>
      )}
    </div>
  );
};

const Graph = () => {
  return (
    <div className="graph">
      <img src="/assets/images/chart.svg" alt="" />
    </div>
  );
};

const EvidenceInformation = ({
  subjectId,
  evidenceType,
}: {
  subjectId: string;
  evidenceType?: 'evaluated' | 'connected to';
}) => {
  const { name } = useSubjectBasicInfo(subjectId);
  return (
    <div className="evidence-information flex justify-between">
      <p
        className={`${
          evidenceType === 'evaluated' ? 'text-purple' : 'text-orange'
        } text-xs font-medium`}
      >
        {evidenceType}
      </p>
      <p className="text-xs font-medium">{name}</p>
    </div>
  );
};

const EvidenceUserProfile = ({ subjectId }: { subjectId: string }) => {
  return (
    <div className="img ml-auto">
      <BrightIdProfilePicture
        subjectId={subjectId}
        className="rounded-full border border-gray60 w-8 h-8"
      />
    </div>
  );
};

const EvaluationInformation = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  const { rating, loading } = useSubjectEvaluationFromContext({
    fromSubjectId,
    toSubjectId,
  });
  //TODO: change bg color on negative rating
  return (
    <div
      className={`evaluation-information flex flex-col py-1.5 items-center justify-center gap-1 ${
        Number(rating?.rating) > 0 ? 'bg-pl1' : 'bg-nl1'
      } rounded-md`}
    >
      {loading ? (
        '...'
      ) : (
        <div className="flex items-center gap-1.5">
          {Number(rating?.rating) > 0 && (
            <img src="/assets/images/Shared/thumbs-up.svg" alt="" />
          )}
          <p className="text-black text-xs font-bold mt-0.5">{`${getConfidenceValueOfAuraRatingNumber(
            Number(rating?.rating),
          )} ${rating?.rating}`}</p>
        </div>
      )}
      <div className="flex justify-between gap-9">
        <p
          className={`${
            Number(rating?.rating) > 0 ? 'text-green' : 'text-red-700'
          } text-sm`}
        >
          Impact
        </p>
        <p
          className={`${
            Number(rating?.rating) > 0 ? 'text-green' : 'text-red-700'
          } text-sm font-bold`}
        >
          12%
        </p>
      </div>
    </div>
  );
};

const EvaluatedCardBody = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  return (
    <>
      <div className="card__left-column w-[50px] flex flex-col gap-1.5">
        <BrightIdProfilePicture
          subjectId={fromSubjectId}
          className={`w-[50px] h-[52px] rounded-lg border-2 border-pastel-purple`}
        />
        <ConnectionInfo subjectId={fromSubjectId} />
      </div>
      <div className="card__middle-column flex flex-col gap-0">
        <UserName subjectId={fromSubjectId} />
        <UserInformation subjectId={fromSubjectId} />
        <Graph />
      </div>
      <span className="divider border-r border-dashed border-gray00 pl-1.5 mr-1.5 h-full"></span>
      <div className="card__right-column flex flex-col gap-1 flex-1">
        <EvidenceInformation evidenceType="evaluated" subjectId={toSubjectId} />
        <EvidenceUserProfile subjectId={toSubjectId} />
        <EvaluationInformation
          fromSubjectId={fromSubjectId}
          toSubjectId={toSubjectId}
        />
      </div>
    </>
  );
};

// const EvaluatedCardBodyOld = ({
//   fromSubjectId,
//   toSubjectId,
// }: {
//   fromSubjectId: string;
//   toSubjectId: string;
// }) => {
//   const { name } = useSubjectBasicInfo(toSubjectId);
//   return (
//     <>
//       <div className="card__top-row flex justify-between w-full">
//         <EvaluatorInfo evaluatorId={fromSubjectId} />
//         <div className="card__top-row__right flex items-start gap-1.5">
//           <p className="connected-to text-right text-purple text-sm font-medium">
//             evaluated
//             <br /> {name}
//           </p>
//         </div>
//       </div>
//       <EvaluationInfo fromSubjectId={fromSubjectId} toSubjectId={toSubjectId} />
//     </>
//   );
// };

const ConnectionInformation = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  const { inboundConnectionInfo, loading } = useSubjectEvaluationFromContext({
    fromSubjectId,
    toSubjectId,
  });
  const connectionTime = useMemo(() => {
    if (!inboundConnectionInfo?.timestamp) return '-';
    return moment(inboundConnectionInfo?.timestamp).fromNow();
  }, [inboundConnectionInfo?.timestamp]);
  return (
    <div className="flex flex-col py-1.5 items-center justify-center gap-1 bg-soft-bright rounded-md">
      {loading ? (
        '...'
      ) : (
        <>
          <div className="flex items-center gap-1.5">{connectionTime}</div>
          <div className="flex items-center gap-1.5">
            {inboundConnectionInfo && (
              <img
                src={`/assets/images/Shared/${
                  connectionLevelIcons[inboundConnectionInfo.level]
                }.svg`}
                className="h-[18px] w-[18px]"
                alt=""
              />
            )}
            <p className="text-sm font-bold">{inboundConnectionInfo?.level}</p>
          </div>
        </>
      )}
    </div>
  );
};
const ConnectedCardBody = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  return (
    <>
      <div className="card__left-column w-[50px] flex flex-col gap-1.5">
        <BrightIdProfilePicture
          subjectId={fromSubjectId}
          className={`w-[50px] h-[52px] rounded-lg border-2 border-pastel-purple`}
        />
        <ConnectionInfo subjectId={fromSubjectId} />
      </div>
      <div className="card__middle-column flex flex-col gap-0">
        <UserName subjectId={fromSubjectId} />
        <UserInformation subjectId={fromSubjectId} />
        <Graph />
      </div>
      <span className="divider border-r border-dashed border-gray00 pl-1.5 mr-1.5 h-full"></span>
      <div className="card__right-column flex flex-col gap-1 flex-1">
        <EvidenceInformation
          evidenceType="connected to"
          subjectId={toSubjectId}
        />
        <EvidenceUserProfile subjectId={toSubjectId} />
        <ConnectionInformation
          fromSubjectId={fromSubjectId}
          toSubjectId={toSubjectId}
        />
      </div>
    </>
  );
};

// const ConnectedCardBodyOld = ({
//   fromSubjectId,
//   toSubjectId,
// }: {
//   fromSubjectId: string;
//   toSubjectId: string;
// }) => {
//   const { name } = useSubjectBasicInfo(toSubjectId);
//   return (
//     <>
//       <div className="card__top-row flex justify-between items-start w-full">
//         <EvaluatorInfo evaluatorId={fromSubjectId} />
//         <div className="card__top-row__right flex items-stretch gap-1.5">
//           <p className="evaluated text-right text-orange text-sm font-medium">
//             connected to <br /> {name}
//           </p>
//         </div>
//       </div>
//       <EvaluationInfo fromSubjectId={fromSubjectId} toSubjectId={toSubjectId} />
//     </>
//   );
// };

export default ProfileEvaluation;
