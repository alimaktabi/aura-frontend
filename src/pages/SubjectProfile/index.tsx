import CredibilityDetailsModal from 'components/CredibilityDetailsModal';
import EvaluateOverlayCard from 'components/EvaluationFlow/EvaluateOverlayCard';
import EvaluationFlow from 'components/EvaluationFlow/EvaluationFlow';
import InfiniteScrollLocal from 'components/InfiniteScrollLocal';
import ProfileEvaluation from 'components/Shared/ProfileEvaluation/ProfileEvaluation';
import {
  SubjectInboundEvaluationsContextProvider,
  useSubjectInboundEvaluationsContext,
} from 'contexts/SubjectInboundEvaluationsContext';
import {
  SubjectOutboundEvaluationsContextProvider,
  useOutboundEvaluationsContext,
} from 'contexts/SubjectOutboundEvaluationsContext';
import useViewMode from 'hooks/useViewMode';
import { ActivityListSearch } from 'pages/SubjectProfile/ActivityListSearch';
import { ConnectionLevel } from 'pages/SubjectProfile/ConnectionLevel';
import { EvidenceListSearch } from 'pages/SubjectProfile/EvidenceListSearch';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EvidenceViewMode, PreferredView, ProfileTab } from 'types/dashboard';
import { __DEV__ } from 'utils/env';

import { HeaderPreferedView } from '../../components/Shared/HeaderPreferedView';
import { ProfileInfo } from '../../components/Shared/ProfileInfo';
import ProfileOverview from '../../components/Shared/ProfileOverview';
import { ToggleInput } from '../../components/Shared/ToggleInput';
import { selectAuthData } from '../../store/profile/selectors';

const ProfileTabs = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: ProfileTab;
  setSelectedTab: (value: ProfileTab) => void;
}) => {
  return (
    <div className="px-1.5 py-1.5 w-full min-h-[52px] rounded-lg bg-white-90-card">
      <div
        className={'flex flex-row min-w-full gap-1.5 overflow-auto h-full'}
        // TODO: refactor this to tailwindcss class
        style={{
          overflow: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {/*<p*/}
        {/*  className={` absolute w-1/2 top-0 bottom-0 rounded-md ease-in-out ${*/}
        {/*    isChecked ? 'left-0 right-1/2' : 'right-0 left-1/2'*/}
        {/*  }`}*/}
        {/*></p>*/}
        {/*<p*/}
        {/*  className={`bg-transparent absolute cursor-pointer w-1/2 h-full flex items-center justify-center left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${*/}
        {/*    isChecked ? 'text-white font-bold' : 'text-black font-medium'*/}
        {/*  }`}*/}
        {/*  onClick={() => setIsChecked(true)}*/}
        {/*  data-testid="table-view-switch-option-one"*/}
        {/*>*/}
        {/*  {option1}*/}
        {/*</p>*/}
        <p
          className={`rounded-md w-[150px] cursor-pointer h-full flex items-center justify-center transition-all duration-300 ease-in-out ${
            selectedTab === ProfileTab.OVERVIEW
              ? 'background bg-button-primary text-white font-bold'
              : 'bg-transparent text-black font-medium'
          }`}
          onClick={() => setSelectedTab(ProfileTab.OVERVIEW)}
          data-testid="table-view-switch-option-one"
        >
          Overview
        </p>
        <p
          className={`rounded-md w-[180px] cursor-pointer h-full flex items-center justify-center transition-all duration-300 ease-in-out ${
            selectedTab === ProfileTab.ACTIVITY
              ? 'background bg-button-primary text-white font-bold'
              : 'bg-transparent text-black font-medium'
          }`}
          onClick={() => setSelectedTab(ProfileTab.ACTIVITY)}
          data-testid="table-view-switch-option-one"
        >
          Activity
        </p>
        <p
          className={`rounded-md w-[230px] cursor-pointer flex justify-center items-center h-full transition-all duration-300 ease-in-out ${
            selectedTab === ProfileTab.EVALUATIONS
              ? 'background bg-button-primary text-white font-bold'
              : 'bg-transparent text-black font-medium'
          }`}
          onClick={() => setSelectedTab(ProfileTab.EVALUATIONS)}
          data-testid="table-view-switch-option-two"
        >
          Evaluations
        </p>
      </div>
    </div>
  );
};
const SubjectProfileBody = ({ subjectId }: { subjectId: string }) => {
  const [selectedTab, setSelectedTab] = useState(ProfileTab.OVERVIEW);

  const [showEvaluateOverlayCard, setShowEvaluateOverlayCard] = useState(false);
  const [credibilityDetailsSubjectId, setCredibilityDetailsSubjectId] =
    useState<string | null>(null);
  const handleScroll = () => {
    const scrollPosition =
      document.getElementsByClassName('page')[0]?.scrollTop; // => scroll position
    if (scrollPosition > 100) {
      setShowEvaluateOverlayCard(true);
    } else {
      setShowEvaluateOverlayCard(false);
    }
  };

  useEffect(() => {
    handleScroll();
    document
      .getElementsByClassName('page')[0]
      ?.addEventListener('scroll', handleScroll);
    return () => {
      document
        .getElementsByClassName('page')[0]
        ?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { itemsFiltered: evaluations, loading: loadingInboundEvaluations } =
    useSubjectInboundEvaluationsContext(subjectId);
  const {
    itemsFiltered: outboundEvaluations,
    loading: loadingOutboundEvaluations,
  } = useOutboundEvaluationsContext(subjectId);
  const evaluators = useMemo(() => {
    if (!evaluations) return [];
    return evaluations.map((e) => e.fromSubjectId);
  }, [evaluations]);
  const evaluateds = useMemo(() => {
    if (!outboundEvaluations) return [];
    return outboundEvaluations.map((e) => e.toSubjectId);
  }, [outboundEvaluations]);

  const [showEvaluationFlow, setShowEvaluationFlow] = useState(false);

  const { currentViewMode } = useViewMode();

  return (
    <div className="page page__dashboard flex flex-col gap-4">
      {selectedTab !== ProfileTab.OVERVIEW && showEvaluateOverlayCard && (
        <EvaluateOverlayCard
          className={`absolute top-24 z-10 min-h-[89px] w-[calc(100vw-40px)] max-w-[420px]`}
          subjectId={subjectId}
          setShowEvaluationFlow={setShowEvaluationFlow}
        />
      )}

      <ProfileInfo
        subjectId={subjectId}
        setShowEvaluationFlow={setShowEvaluationFlow}
        setSelectedTab={setSelectedTab}
      />

      {__DEV__ && <ConnectionLevel subjectId={subjectId} />}

      {/*{loadingMyEvaluation ? (*/}
      {/*  <div className="card flex flex-col gap-2.5">...</div>*/}
      {/*) : isEvaluated ? (*/}
      {/*  <YourEvaluation*/}
      {/*    subjectId={subjectId}*/}
      {/*    setShowEvaluationFlow={setShowEvaluationFlow}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <NewEvaluationCard*/}
      {/*    subjectId={subjectId}*/}
      {/*    setShowEvaluationFlow={setShowEvaluationFlow}*/}
      {/*  />*/}
      {/*)}*/}
      {/* if role is not player then show activities card */}

      <div className="flex gap-1 -mb-1">
        <p className="font-bold text-lg text-white">Evidence</p>
        <img
          className="cursor-pointer"
          src="/assets/images/SubjectProfile/evidence-info-icon.svg"
          alt=""
        />
      </div>
      {currentViewMode === PreferredView.PLAYER ? (
        <ToggleInput
          option1="Overview"
          option2="Evaluations"
          isChecked={selectedTab === ProfileTab.OVERVIEW}
          setIsChecked={(value) =>
            setSelectedTab(value ? ProfileTab.OVERVIEW : ProfileTab.EVALUATIONS)
          }
        />
      ) : (
        <ProfileTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      )}
      {selectedTab === ProfileTab.OVERVIEW ? (
        <ProfileOverview
          subjectId={subjectId}
          showEvidenceList={() => setSelectedTab(ProfileTab.EVALUATIONS)}
          onLastEvaluationClick={setCredibilityDetailsSubjectId}
        />
      ) : selectedTab === ProfileTab.ACTIVITY ? (
        <>
          <ActivityListSearch subjectId={subjectId} />
          {loadingOutboundEvaluations ? (
            <div
              className={`profile-evaluation-card card flex !flex-row gap-1.5 w-full pl-[9px] pt-[11px] pr-[14px] pb-3`}
            >
              Loading...
            </div>
          ) : (
            <InfiniteScrollLocal
              className={'flex flex-col gap-2.5 w-full -mb-5 pb-5 h-full'}
              items={evaluateds}
              renderItem={(evaluated) => (
                <ProfileEvaluation
                  evidenceViewMode={EvidenceViewMode.OUTBOUND_ACTIVITY}
                  onClick={() => setCredibilityDetailsSubjectId(evaluated)}
                  key={evaluated}
                  fromSubjectId={subjectId}
                  toSubjectId={evaluated}
                />
              )}
            />
          )}
        </>
      ) : (
        <>
          <EvidenceListSearch subjectId={subjectId} />
          {loadingInboundEvaluations ? (
            <div
              className={`profile-evaluation-card card flex !flex-row gap-1.5 w-full pl-[9px] pt-[11px] pr-[14px] pb-3`}
            >
              Loading...
            </div>
          ) : (
            <InfiniteScrollLocal
              className={'flex flex-col gap-2.5 w-full -mb-5 pb-5 h-full'}
              items={evaluators}
              renderItem={(evaluator) => (
                <ProfileEvaluation
                  evidenceViewMode={EvidenceViewMode.INBOUND_EVALUATION}
                  onClick={() => setCredibilityDetailsSubjectId(evaluator)}
                  key={evaluator}
                  fromSubjectId={evaluator}
                  toSubjectId={subjectId}
                />
              )}
            />
          )}
        </>
      )}
      {/* could have header based on the role */}
      {/*<div>*/}
      {/*	<div className="mb-2 flex justify-between">*/}
      {/*		<p className="text-lg text-white">Other Evaluations</p>*/}
      {/*		<div className="flex items-center gap-1.5">*/}
      {/*			<p*/}
      {/*				onClick={() => setIsEvaluationListModalOpen(true)}*/}
      {/*				className="underline text-sm text-white cursor-pointer"*/}
      {/*			>*/}
      {/*				See all*/}
      {/*			</p>*/}
      {/*			<img*/}
      {/*				src="/assets/images/Shared/arrow-right-icon-white.svg"*/}
      {/*				alt=""*/}
      {/*				className="w-4 h-4"*/}
      {/*			/>*/}
      {/*		</div>*/}
      {/*	</div>*/}
      {/*	<div className="flex gap-2.5 w-full overflow-x-auto !min-w-[100vw] -ml-5 px-5">*/}
      {/*		{inboundRatings?.slice(0, 4).map((rating) => (*/}
      {/*			<SubjectEvaluation*/}
      {/*				key={rating.id}*/}
      {/*				fromSubjectId={rating.fromBrightId}*/}
      {/*				toSubjectId={rating.toBrightId}*/}
      {/*				className="!min-w-[305px] !py-5"*/}
      {/*			/>*/}
      {/*		))}*/}
      {/*	</div>*/}
      {/*</div>*/}
      <EvaluationFlow
        showEvaluationFlow={showEvaluationFlow}
        setShowEvaluationFlow={setShowEvaluationFlow}
        subjectId={subjectId}
      />
      {credibilityDetailsSubjectId && (
        <CredibilityDetailsModal
          onClose={() => setCredibilityDetailsSubjectId(null)}
          subjectId={credibilityDetailsSubjectId}
        />
      )}
    </div>
  );
};
const SubjectProfile = () => {
  const { subjectIdProp } = useParams();
  const authData = useSelector(selectAuthData);
  const subjectId = useMemo(
    () => subjectIdProp ?? authData?.brightId,
    [authData?.brightId, subjectIdProp],
  );

  return !subjectId ? (
    <div>Unknown subject id</div>
  ) : (
    <SubjectOutboundEvaluationsContextProvider subjectId={subjectId}>
      <SubjectInboundEvaluationsContextProvider subjectId={subjectId}>
        <SubjectProfileBody subjectId={subjectId} />
      </SubjectInboundEvaluationsContextProvider>
    </SubjectOutboundEvaluationsContextProvider>
  );
};

export const SubjectProfileHeader = () => {
  const { subjectViewModeTitle, updateViewAs, currentViewMode } = useViewMode();

  return (
    <>
      {subjectViewModeTitle} profile
      <HeaderPreferedView />
    </>
  );
};
export default SubjectProfile;
