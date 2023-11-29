// import { useSubjectEvaluation } from 'hooks/useSubjectEvaluation';
// import { useSubjectInfo } from 'hooks/useSubjectInfo';
// import { useInboundRatings } from 'hooks/useSubjectRatings';

// import { useSelector } from 'react-redux';
// import { selectAuthData } from 'store/profile/selectors';
// import { connectionLevelIconsBlack } from 'utils/connection';
// import { compactFormat } from '../../../utils/number';
import { useEffect, useState } from 'react';

import BrightIdProfilePicture from '../../BrightIdProfilePicture';
import { EvaluationInfo } from '../EvaluationInfo';

const ProfileEvaluation = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  // const { auraScore, level, name } = useSubjectInfo(fromSubjectId);
  // const { inboundRatingsStatsString } = useInboundRatings(fromSubjectId);
  // const authData = useSelector(selectAuthData);
  // const { loading, ratingNumber, inboundConnectionInfo } = useSubjectEvaluation(
  //   {
  //     fromSubjectId: authData?.brightId,
  //     toSubjectId: fromSubjectId,
  //   },
  // );
  return (
    <div
      className={`profile-evaluation-card card flex !flex-row gap-1.5 w-full pl-[9px] pt-[11px] pr-[14px] pb-3`}
    >
      {Math.random() > 0.0 ? (
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

const ConnectionInfo = () => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex gap-0.5 justify-center items-center">
        <img
          src="/assets/images/Shared/already-known-icon.svg"
          className="h-[18px] w-[18px]"
          alt=""
        />
        <p className="text-green text-sm font-bold">+3</p>
      </div>
      <p className="impact-percentage text-green text-[11px] font-bold text-center w-full">
        12%
      </p>
    </div>
  );
};

const UserName = () => {
  return (
    <div className="flex gap-1 items-center">
      <p className="name font-medium text-sm">{'Adam Stallard'}</p>
      <span className="flex bg-pastel-purple h-[14px] w-5 items-center justify-center rounded-full cursor-pointer">
        <img
          src="/assets/images/SubjectProfile/icon.svg"
          className="h-[10px] w-[10px]"
          alt=""
        />
      </span>
    </div>
  );
};

const UserInformation = () => {
  return (
    <div className="bg-gray00 rounded p-1 pr-2 flex gap-1 items-center mb-1.5">
      <img src="/assets/images/player.svg" alt="" className="w-6 h-6" />
      <p className="level text-sm font-bold mr-0.5 text-purple2">Lvl 1</p>
      <p className="text-sm font-bold text-purple2">
        13.4<span className="font-medium">m</span>
      </p>
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

const EvidenceInformation = () => {
  return (
    <div className="evidence-information flex justify-between">
      <p className="text-purple text-xs font-medium">evaluated</p>
      <p className="text-xs font-medium">Ali Beigi</p>
    </div>
  );
};

const DEFAULT_PROFILE_PICTURE = '/assets/images/avatar-thumb.jpg';

const EvidenceUserProfile = () => {
  const [imgSrc, setImgSrc] = useState(DEFAULT_PROFILE_PICTURE);
  useEffect(() => {
    setImgSrc(DEFAULT_PROFILE_PICTURE);
  }, []);

  return (
    <div className="img ml-auto">
      <img
        src={imgSrc}
        className="rounded-full border border-gray60 w-8 h-8"
        alt=""
      />
    </div>
  );
};

const EvaluationInformation = () => {
  return (
    <div className="evaluation-information flex flex-col py-1.5 items-center justify-center gap-1 bg-pl1 rounded-md">
      <div className="flex items-center gap-1.5">
        <img src="/assets/images/Shared/thumbs-up.svg" alt="" />
        <p className="text-black text-xs font-bold mt-0.5">Very High (+4)</p>
      </div>
      <div className="flex justify-between gap-9">
        <p className="text-green text-sm">Impact</p>
        <p className="text-green text-sm font-bold">12%</p>
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
        <ConnectionInfo />
      </div>
      <div className="card__middle-column flex flex-col gap-0">
        <UserName />
        <UserInformation />
        <Graph />
      </div>
      <span className="divider border-r border-dashed border-gray00 pl-1.5 mr-1.5 h-full"></span>
      <div className="card__right-column flex flex-col gap-1 flex-1">
        <EvidenceInformation />
        <EvidenceUserProfile />
        <EvaluationInformation />
      </div>
    </>
  );
};

const EvaluatedCardBodyOld = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  return (
    <>
      <div className="card__top-row flex justify-between w-full">
        <div className="card__top-row__left flex flex-col items-start gap-1">
          <BrightIdProfilePicture
            subjectId={fromSubjectId}
            className={`w-[56px] h-[56px] rounded-lg border-2 border-pastel-purple`}
          />
          <div className="flex flex-col">
            <div className="flex gap-1.5 items-center">
              <p className="name font-medium text-sm">{'Adam Stallard'}</p>
              <p className="evaluation-confidence font-medium text-sm">
                ({'+4'})
              </p>
              <span className="flex bg-pastel-purple h-4 w-8 items-center justify-center rounded-full cursor-pointer">
                <img
                  src="/assets/images/SubjectProfile/horizontal-three-dot.svg"
                  alt=""
                />
              </span>
            </div>
            <p className="your-connection-title text-gray20 text-xs">
              Your connection:
            </p>
            <div className="flex items-end gap-1">
              <img
                src="/assets/images/Shared/already-known-icon.svg"
                className="h-[18px] w-[18px]"
                alt=""
              />
              <p className="font-medium text-sm">Already Known</p>
            </div>

            {/*{loading ? (*/}
            {/*  <div>...</div>*/}
            {/*) : inboundConnectionInfo ? (*/}
            {/*  <div className="flex items-center gap-1">*/}
            {/*    {ratingNumber ? (*/}
            {/*      <img*/}
            {/*        src="/assets/images/Shared/user-search-icon.svg"*/}
            {/*        className="w-[18px] h-[18px]"*/}
            {/*        alt=""*/}
            {/*      />*/}
            {/*    ) : (*/}
            {/*      <img*/}
            {/*        src="/assets/images/Shared/brightid-icon.svg"*/}
            {/*        className="w-4 h-4"*/}
            {/*        alt=""*/}
            {/*      />*/}
            {/*    )}*/}
            {/*    <p className="text-black">:</p>*/}
            {/*    {ratingNumber ? (*/}
            {/*      <div*/}
            {/*        className={`flex rounded ${*/}
            {/*          ratingNumber > 0 ? 'bg-pl1' : 'bg-nl1'*/}
            {/*        } justify-evenly w-[55px] h-6 items-center`}*/}
            {/*      >*/}
            {/*        <img*/}
            {/*          src={`/assets/images/Shared/${*/}
            {/*            ratingNumber > 0 ? 'plus' : 'minus-icon'*/}
            {/*          }.svg`}*/}
            {/*          className="w-3 h-3"*/}
            {/*          alt=""*/}
            {/*        />*/}
            {/*        <img src="/assets/images/Shared/dash-line.svg" alt="" />*/}
            {/*        <p className="text-black text-sm font-bold">*/}
            {/*          {Math.abs(ratingNumber)}*/}
            {/*        </p>*/}
            {/*      </div>*/}
            {/*    ) : (*/}
            {/*      <div className="flex rounded bg-soft-bright justify-evenly w-[30px] h-6 items-center">*/}
            {/*        <img*/}
            {/*          src={`/assets/images/Shared/${*/}
            {/*            connectionLevelIconsBlack[inboundConnectionInfo?.level]*/}
            {/*          }.svg`}*/}
            {/*          className="w-3.5 h-3.5"*/}
            {/*          alt=""*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*) : (*/}
            {/*  <div>-</div>*/}
            {/*)}*/}
          </div>
        </div>
        <div className="card__top-row__right flex items-start gap-1.5">
          <p className="connected-to text-right text-purple text-sm font-medium">
            evaluated
            <br /> Ali Beigi
          </p>
          {/*<div className="flex flex-col gap-1 justify-center items-center pt-2 rounded bg-gray00 py-1.5 px-2">*/}
          {/*  <p className="text-white text-xs">Lvl</p>*/}
          {/*  <p className="text-white text-xs">{level ?? '...'}</p>*/}
          {/*</div>*/}
          {/*<div className="flex flex-col gap-1 rounded bg-gray00 py-1.5 px-2">*/}
          {/*  <span className="flex items-center gap-1">*/}
          {/*    <img src="/assets/images/Shared/star-icon.svg" alt="" />*/}
          {/*    <div className="text-white text-xs pt-1">*/}
          {/*      {auraScore ? compactFormat(auraScore) : '-'}*/}
          {/*    </div>*/}
          {/*  </span>*/}
          {/*  <div className="text-white text-xs">*/}
          {/*    {inboundRatingsStatsString*/}
          {/*      ? `(${inboundRatingsStatsString})`*/}
          {/*      : '...'}*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="text-[10px] text-gray20">*/}
          {/*  {profile.isConnection ? 'Mutual Connection' : ''}*/}
          {/*</div>*/}
        </div>
      </div>
      <EvaluationInfo fromSubjectId={fromSubjectId} toSubjectId={toSubjectId} />
    </>
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
      <div className="card__top-row flex justify-between items-start w-full">
        <div className="card__top-row__left flex items-start gap-1">
          <BrightIdProfilePicture
            subjectId={fromSubjectId}
            className={`w-[56px] h-[56px] rounded-lg border-2 border-orange`}
          />
          <div className="flex flex-col">
            <div className="flex gap-1.5 items-center">
              <p className="name font-medium text-sm">{'Adam Stallard'}</p>
              <p className="evaluation-confidence font-medium text-sm flex">
                (
                <img
                  src="/assets/images/Shared/already-known-icon.svg"
                  alt=""
                />
                )
              </p>
              <span className="flex bg-pastel-purple h-4 w-8 items-center justify-center rounded-full">
                <img
                  src="/assets/images/SubjectProfile/horizontal-three-dot.svg"
                  alt=""
                />
              </span>
            </div>
            <p className="your-connection-or-evaluation-title text-gray20 text-xs">
              {'Your evaluation:'}
            </p>
            <div className="flex items-end gap-1">
              <img
                src="/assets/images/Shared/thumbs-up.svg"
                className="h-[18px] w-[18px]"
                alt=""
              />
              <span className="font-medium text-sm text-green">
                Very High (+4)
              </span>
            </div>
            {/*{loading ? (*/}
            {/*  <div>...</div>*/}
            {/*) : inboundConnectionInfo ? (*/}
            {/*  <div className="flex items-center gap-1">*/}
            {/*    {ratingNumber ? (*/}
            {/*      <img*/}
            {/*        src="/assets/images/Shared/user-search-icon.svg"*/}
            {/*        className="w-[18px] h-[18px]"*/}
            {/*        alt=""*/}
            {/*      />*/}
            {/*    ) : (*/}
            {/*      <img*/}
            {/*        src="/assets/images/Shared/brightid-icon.svg"*/}
            {/*        className="w-4 h-4"*/}
            {/*        alt=""*/}
            {/*      />*/}
            {/*    )}*/}
            {/*    <p className="text-black">:</p>*/}
            {/*    {ratingNumber ? (*/}
            {/*      <div*/}
            {/*        className={`flex rounded ${*/}
            {/*          ratingNumber > 0 ? 'bg-pl1' : 'bg-nl1'*/}
            {/*        } justify-evenly w-[55px] h-6 items-center`}*/}
            {/*      >*/}
            {/*        <img*/}
            {/*          src={`/assets/images/Shared/${*/}
            {/*            ratingNumber > 0 ? 'plus' : 'minus-icon'*/}
            {/*          }.svg`}*/}
            {/*          className="w-3 h-3"*/}
            {/*          alt=""*/}
            {/*        />*/}
            {/*        <img src="/assets/images/Shared/dash-line.svg" alt="" />*/}
            {/*        <p className="text-black text-sm font-bold">*/}
            {/*          {Math.abs(ratingNumber)}*/}
            {/*        </p>*/}
            {/*      </div>*/}
            {/*    ) : (*/}
            {/*      <div className="flex rounded bg-soft-bright justify-evenly w-[30px] h-6 items-center">*/}
            {/*        <img*/}
            {/*          src={`/assets/images/Shared/${*/}
            {/*            connectionLevelIconsBlack[inboundConnectionInfo?.level]*/}
            {/*          }.svg`}*/}
            {/*          className="w-3.5 h-3.5"*/}
            {/*          alt=""*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*) : (*/}
            {/*  <div>-</div>*/}
            {/*)}*/}
          </div>
        </div>
        <div className="card__top-row__right flex items-stretch gap-1.5">
          <p className="evaluated text-right text-orange text-sm font-medium">
            connected to <br /> Ali Beigi
          </p>
          {/*<div className="flex flex-col gap-1 justify-center items-center pt-2 rounded bg-gray00 py-1.5 px-2">*/}
          {/*  <p className="text-white text-xs">Lvl</p>*/}
          {/*  <p className="text-white text-xs">{level ?? '...'}</p>*/}
          {/*</div>*/}
          {/*<div className="flex flex-col gap-1 rounded bg-gray00 py-1.5 px-2">*/}
          {/*  <span className="flex items-center gap-1">*/}
          {/*    <img src="/assets/images/Shared/star-icon.svg" alt="" />*/}
          {/*    <div className="text-white text-xs pt-1">*/}
          {/*      {auraScore ? compactFormat(auraScore) : '-'}*/}
          {/*    </div>*/}
          {/*  </span>*/}
          {/*  <div className="text-white text-xs">*/}
          {/*    {inboundRatingsStatsString*/}
          {/*      ? `(${inboundRatingsStatsString})`*/}
          {/*      : '...'}*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="text-[10px] text-gray20">*/}
          {/*  {profile.isConnection ? 'Mutual Connection' : ''}*/}
          {/*</div>*/}
        </div>
      </div>
      <EvaluationInfo fromSubjectId={fromSubjectId} toSubjectId={toSubjectId} />
    </>
  );
};

export default ProfileEvaluation;
