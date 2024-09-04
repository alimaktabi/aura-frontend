import EvaluationThumb from 'components/Shared/EvaluationThumb';
import {
  getBgClassNameOfAuraRatingObject,
  getConfidenceValueOfAuraRatingNumber,
  getTextClassNameOfAuraRatingObject,
  getViewModeBorderColorClass,
  getViewModeSubjectBorderColorClass,
  getViewModeSubjectTextColorClass,
  getViewModeTextColorClass,
  INBOUND_EVIDENCE_VIEW_MODES,
  preferredViewIcon,
  subjectViewAsIconColored,
  viewModeToSubjectViewMode,
  viewModeToViewAs,
} from 'constants/index';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import {
  useSubjectConnectionInfoFromContext,
  useSubjectEvaluationFromContext,
} from 'hooks/useSubjectEvaluation';
import { useSubjectName } from 'hooks/useSubjectName';
import { useSubjectVerifications } from 'hooks/useSubjectVerifications';
import useViewMode from 'hooks/useViewMode';
import moment from 'moment';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { EvidenceType, EvidenceViewMode } from 'types/dashboard';
import { RoutePath } from 'types/router';
import { connectionLevelIcons } from 'utils/connection';
import { compactFormat } from 'utils/number';

import BrightIdProfilePicture from '../../BrightIdProfilePicture';

const ProfileEvaluation = ({
  fromSubjectId,
  toSubjectId,
  onClick,
  evidenceViewMode,
}: {
  fromSubjectId: string;
  toSubjectId: string;
  onClick: () => void;
  evidenceViewMode: EvidenceViewMode;
}) => {
  const { currentViewMode } = useViewMode();
  const { loading, ratingNumber } = useSubjectEvaluationFromContext({
    fromSubjectId,
    toSubjectId,
    evaluationCategory:
      INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode) ||
      evidenceViewMode === EvidenceViewMode.OUTBOUND_ACTIVITY_ON_MANAGERS
        ? viewModeToViewAs[currentViewMode]
        : viewModeToViewAs[viewModeToSubjectViewMode[currentViewMode]],
  });
  return (
    <div
      onClick={onClick}
      className={`profile-evaluation-card card !flex-row cursor-pointer gap-.5 pl-2 pt-[11px] pr-[14px] pb-3`}
    >
      {loading ? (
        'Loading...'
      ) : ratingNumber &&
        evidenceViewMode !== EvidenceViewMode.INBOUND_CONNECTION ? (
        <EvaluatedCardBody
          evidenceViewMode={evidenceViewMode}
          fromSubjectId={fromSubjectId}
          toSubjectId={toSubjectId}
        />
      ) : (
        <ConnectedCardBody
          evidenceViewMode={evidenceViewMode}
          fromSubjectId={fromSubjectId}
          toSubjectId={toSubjectId}
        />
      )}
    </div>
  );
};

const ConnectionInfo = ({
  subjectId,
  evidenceViewMode,
}: {
  subjectId: string;
  evidenceViewMode: EvidenceViewMode;
}) => {
  const { currentViewMode } = useViewMode();
  const {
    myRatingToSubject: rating,
    loading,
    myConnectionToSubject: inboundConnectionInfo,
  } = useMyEvaluationsContext({
    subjectId,
    evaluationCategory: INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
      ? viewModeToViewAs[currentViewMode]
      : viewModeToViewAs[viewModeToSubjectViewMode[currentViewMode]],
  });
  const bgColor = useMemo(() => {
    if (rating && Number(rating?.rating) !== 0) {
      return getBgClassNameOfAuraRatingObject(rating);
    }
    if (inboundConnectionInfo?.level === 'just met') {
      return 'bg-pl1';
    }
    if (
      inboundConnectionInfo?.level === 'recovery' ||
      inboundConnectionInfo?.level === 'already known'
    ) {
      return 'bg-pl4';
    }
    if (
      inboundConnectionInfo?.level === 'suspicious' ||
      inboundConnectionInfo?.level === 'reported'
    ) {
      return 'bg-nl4';
    }
    return '';
  }, [inboundConnectionInfo?.level, rating]);
  return (
    <div className={`flex flex-col gap-0.5 ${bgColor} py-1.5 rounded-md`}>
      {loading ? (
        '...'
      ) : (
        <>
          <div className="flex gap-0.5 justify-center items-center">
            {inboundConnectionInfo &&
              connectionLevelIcons[inboundConnectionInfo.level] && (
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
                className={`text-sm font-bold ${getTextClassNameOfAuraRatingObject(
                  rating,
                )}`}
              >
                {Number(rating.rating) < 0 ? '-' : '+'}
                {Math.abs(Number(rating.rating))}
              </p>
            )}
          </div>
          {!!rating && Number(rating?.rating) !== 0 && (
            <p
              className={`impact-percentage ${getTextClassNameOfAuraRatingObject(
                rating,
              )} text-[11px] font-bold text-center w-full`}
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
  const name = useSubjectName(subjectId);
  return (
    <div className="flex gap-1 items-center">
      <p className="name flex-1 font-medium text-sm line-clamp-1 text-ellipsis">
        {name}
      </p>
      <Link
        to={RoutePath.SUBJECT_PROFILE.replace(':subjectIdProp', subjectId)}
        className="flex bg-pastel-purple h-[14px] w-5 items-center justify-center rounded-full cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/assets/images/SubjectProfile/icon.svg"
          alt=""
          className="h-[10px] w-[10px] min-w-[10px]"
        />
      </Link>
    </div>
  );
};

const UserInformation = ({
  subjectId,
  isConnected,
  evidenceViewMode,
}: {
  subjectId: string;
  isConnected?: boolean;
  evidenceViewMode: EvidenceViewMode;
}) => {
  const { currentViewMode } = useViewMode();
  const { auraLevel, auraScore, loading } = useSubjectVerifications(subjectId);
  return (
    <div className="bg-gray00 rounded p-1 pr-2 flex gap-0.5 justify-between items-center mb-1.5 text-white">
      <img
        src={
          evidenceViewMode === EvidenceViewMode.INBOUND_CONNECTION
            ? '/assets/images/Shared/brightid-icon.svg'
            : evidenceViewMode === EvidenceViewMode.INBOUND_EVALUATION
            ? preferredViewIcon[currentViewMode]
            : subjectViewAsIconColored[
                viewModeToViewAs[
                  evidenceViewMode ===
                  EvidenceViewMode.OUTBOUND_ACTIVITY_ON_MANAGERS
                    ? currentViewMode
                    : viewModeToSubjectViewMode[currentViewMode]
                ]
              ]
        }
        alt=""
        className="w-3.5 h-3.5 mx-1"
      />
      {loading ? (
        <p
          className={`level text-sm font-bold mr-0.5 ${
            INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
              ? getViewModeTextColorClass(currentViewMode)
              : getViewModeSubjectTextColorClass(
                  evidenceViewMode ===
                    EvidenceViewMode.OUTBOUND_ACTIVITY_ON_MANAGERS
                    ? currentViewMode
                    : viewModeToSubjectViewMode[currentViewMode],
                )
          }`}
        >
          ...
        </p>
      ) : (
        <>
          <p
            className={`level text-sm font-bold mr-0.5 ${
              INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
                ? getViewModeTextColorClass(currentViewMode)
                : getViewModeSubjectTextColorClass(
                    evidenceViewMode ===
                      EvidenceViewMode.OUTBOUND_ACTIVITY_ON_MANAGERS
                      ? currentViewMode
                      : viewModeToSubjectViewMode[currentViewMode],
                  )
            }`}
          >
            {auraLevel}
          </p>
          <p
            className={`text-sm font-bold ${
              INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
                ? getViewModeTextColorClass(currentViewMode)
                : getViewModeSubjectTextColorClass(
                    evidenceViewMode ===
                      EvidenceViewMode.OUTBOUND_ACTIVITY_ON_MANAGERS
                      ? currentViewMode
                      : viewModeToSubjectViewMode[currentViewMode],
                  )
            }`}
          >
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
  evidenceViewMode,
}: {
  subjectId: string;
  evidenceType?: EvidenceType;
  evidenceViewMode: EvidenceViewMode;
}) => {
  const name = useSubjectName(subjectId);
  const { currentViewMode } = useViewMode();
  return (
    <div className="evidence-information flex justify-between flex-1 gap-2">
      <div
        className={`${
          INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
            ? getViewModeTextColorClass(currentViewMode)
            : getViewModeSubjectTextColorClass(currentViewMode)
        } text-xs font-medium`}
      >
        {evidenceType === EvidenceType.EVALUATED
          ? evidenceViewMode === EvidenceViewMode.OUTBOUND_ACTIVITY
            ? 'evaluated by'
            : 'evaluated'
          : evidenceViewMode === EvidenceViewMode.OUTBOUND_ACTIVITY
          ? 'connected by'
          : 'connected to'}
      </div>
      <div className="text-xs font-medium truncate flex-1 text-right">
        {name}
      </div>
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

export const EvaluationInformation = ({
  fromSubjectId,
  toSubjectId,
  evidenceViewMode,
}: {
  fromSubjectId: string;
  toSubjectId: string;
  evidenceViewMode: EvidenceViewMode;
}) => {
  const { currentViewMode } = useViewMode();
  const { rating, loading } = useSubjectEvaluationFromContext({
    fromSubjectId,
    toSubjectId,
    evaluationCategory:
      INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode) ||
      evidenceViewMode === EvidenceViewMode.OUTBOUND_ACTIVITY_ON_MANAGERS
        ? viewModeToViewAs[currentViewMode]
        : viewModeToViewAs[viewModeToSubjectViewMode[currentViewMode]],
  });
  //TODO: change bg color on negative rating
  return (
    <div
      className={`evaluation-information flex flex-col py-1.5 items-center justify-center gap-1 ${getBgClassNameOfAuraRatingObject(
        rating,
      )} rounded-md`}
    >
      {loading ? (
        '...'
      ) : (
        <div className="flex items-center gap-1.5">
          <EvaluationThumb rating={rating && Number(rating?.rating)} />
          <p
            className={`${getTextClassNameOfAuraRatingObject(
              rating,
            )} text-xs font-bold mt-0.5`}
          >{`${getConfidenceValueOfAuraRatingNumber(Number(rating?.rating))} ${
            rating?.rating
          }`}</p>
        </div>
      )}
      <div
        className={`flex justify-between gap-9 text-sm ${getTextClassNameOfAuraRatingObject(
          rating,
        )}`}
      >
        <p>Impact</p>
        <p className="font-bold">12%</p>
      </div>
    </div>
  );
};

const EvaluatedCardBody = ({
  fromSubjectId,
  toSubjectId,
  evidenceViewMode,
}: {
  fromSubjectId: string;
  toSubjectId: string;
  evidenceViewMode: EvidenceViewMode;
}) => {
  const leftCardSide = useMemo(
    () =>
      INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
        ? fromSubjectId
        : toSubjectId,
    [evidenceViewMode, fromSubjectId, toSubjectId],
  );
  const rightCardSide = useMemo(
    () =>
      INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
        ? toSubjectId
        : fromSubjectId,
    [evidenceViewMode, fromSubjectId, toSubjectId],
  );
  const { currentViewMode } = useViewMode();
  return (
    <>
      <div className="card__left-column w-[60%] flex gap-1.5">
        <div className="w-[50px] flex flex-col gap-1.5">
          <BrightIdProfilePicture
            subjectId={leftCardSide}
            className={`w-[46px] h-[46px] !min-w-[46px] rounded-lg border-2 ${
              INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
                ? getViewModeBorderColorClass(currentViewMode)
                : getViewModeSubjectBorderColorClass(
                    evidenceViewMode ===
                      EvidenceViewMode.OUTBOUND_ACTIVITY_ON_MANAGERS
                      ? currentViewMode
                      : viewModeToSubjectViewMode[currentViewMode],
                  )
            }`}
          />
          <ConnectionInfo
            evidenceViewMode={evidenceViewMode}
            subjectId={leftCardSide}
          />
        </div>
        <div className="flex flex-col gap-0 w-full">
          <UserName subjectId={leftCardSide} />
          <UserInformation
            subjectId={leftCardSide}
            evidenceViewMode={evidenceViewMode}
          />
          <Graph />
        </div>
        <span className="divider border-r border-dashed border-gray00 pl-.5 mr-1.5 h-full"></span>
      </div>
      <div className="card__right-column flex flex-col gap-1 w-[40%]">
        <EvidenceInformation
          evidenceViewMode={evidenceViewMode}
          evidenceType={EvidenceType.EVALUATED}
          subjectId={rightCardSide}
        />
        <EvidenceUserProfile subjectId={rightCardSide} />
        <EvaluationInformation
          evidenceViewMode={evidenceViewMode}
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
  const { connectionInfo, loading } = useSubjectConnectionInfoFromContext({
    fromSubjectId,
    toSubjectId,
  });
  const connectionTime = useMemo(() => {
    if (!connectionInfo?.timestamp) return '-';
    return moment(connectionInfo.timestamp).fromNow();
  }, [connectionInfo?.timestamp]);
  return (
    <div className="flex flex-col py-1.5 items-center justify-center gap-1 bg-soft-bright rounded-md">
      {loading ? (
        '...'
      ) : (
        <>
          <div className="flex items-center gap-1.5">{connectionTime}</div>
          <div className="flex items-center gap-1.5">
            {connectionInfo && (
              <img
                src={`/assets/images/Shared/${
                  connectionLevelIcons[connectionInfo.level]
                }.svg`}
                className="h-[18px] w-[18px]"
                alt=""
              />
            )}
            <p className="text-sm font-bold">{connectionInfo?.level}</p>
          </div>
        </>
      )}
    </div>
  );
};
const ConnectedCardBody = ({
  evidenceViewMode,
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
  evidenceViewMode: EvidenceViewMode;
}) => {
  const leftCardSide = useMemo(
    () =>
      INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
        ? fromSubjectId
        : toSubjectId,
    [evidenceViewMode, fromSubjectId, toSubjectId],
  );
  const rightCardSide = useMemo(
    () =>
      INBOUND_EVIDENCE_VIEW_MODES.includes(evidenceViewMode)
        ? toSubjectId
        : fromSubjectId,
    [evidenceViewMode, fromSubjectId, toSubjectId],
  );
  return (
    <>
      <div className="card__left-column w-[60%] flex gap-1.5">
        <div className="w-[50px] flex flex-col gap-1.5">
          <BrightIdProfilePicture
            subjectId={leftCardSide}
            className={`w-[46px] h-[46px] !min-w-[46px] rounded-lg border-2 border-pastel-purple`}
          />
          <ConnectionInfo
            evidenceViewMode={evidenceViewMode}
            subjectId={leftCardSide}
          />
        </div>
        <div className="flex flex-col gap-0 w-full">
          <UserName subjectId={leftCardSide} />
          <UserInformation
            evidenceViewMode={evidenceViewMode}
            subjectId={leftCardSide}
            isConnected
          />
          <Graph />
        </div>
        <span className="divider border-r border-dashed border-gray00 pl-.5 mr-1.5 h-full"></span>
      </div>
      <div className="card__right-column flex flex-col gap-1 w-[40%]">
        <EvidenceInformation
          evidenceViewMode={evidenceViewMode}
          evidenceType={EvidenceType.CONNECTED}
          subjectId={rightCardSide}
        />
        <EvidenceUserProfile subjectId={rightCardSide} />
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
