import { SubjectOutboundEvaluationsContextProvider } from 'contexts/SubjectOutboundEvaluationsContext';
import * as React from 'react';
import { useState } from 'react';

import CredibilityDetailsModal from '../../../components/CredibilityDetailsModal';
import ProfileOverview from '../../../components/Shared/ProfileOverview';
import { viewModeToEvaluatorViewMode } from '../../../constants';
import useViewMode from '../../../hooks/useViewMode';

const EvaluationsDetailsPerformance = ({
  subjectId,
  title = '',
  hasHeader = false,
  hasBtn = false,
  onFindEvaluatorsButtonClick,
}: {
  subjectId: string;
  hasHeader?: boolean;
  hasBtn?: boolean;
  title?: string;
  onFindEvaluatorsButtonClick?: () => void;
}) => {
  const { currentViewMode } = useViewMode();
  const [credibilityDetailsSubjectId, setCredibilityDetailsSubjectId] =
    useState<string | null>(null);
  return (
    <>
      {/*<div className="card relative">*/}
      {/*<div className="absolute px-11 left-0 right-0 top-0 bottom-0 backdrop-blur-[2px] z-50 rounded-[10px] bg-white bg-opacity-75 flex flex-col items-center justify-center gap-6">*/}
      {/*  {Math.random() > 0.5 ? (*/}
      {/*    <>*/}
      {/*      <img src="/assets/images/Shared/lock.svg" alt="" />*/}
      {/*      <p className="text-[20px] font-medium text-center">*/}
      {/*        You need to evaluate <strong>2</strong> more subjects to start*/}
      {/*        getting feedback from trainers*/}
      {/*      </p>*/}
      {/*      <ProgressBar progress={30} className="w-full" />*/}
      {/*    </>*/}
      {/*  ) : (*/}
      {/*    <>*/}
      {/*      <p className="text-[20px] font-medium text-center">*/}
      {/*        Congratulations! With 3 evaluations completed, you&apos;re now*/}
      {/*        ready to connect with trainers, receive valuable feedback, and*/}
      {/*        level up*/}
      {/*      </p>*/}
      {/*      <button className="btn w-full">Start Finding Trainers</button>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</div>*/}
      {/*{hasHeader && (*/}
      {/*  <div className=" mb-4 font-bold text-lg text-black">{title}</div>*/}
      {/*)}*/}
      <SubjectOutboundEvaluationsContextProvider subjectId={subjectId}>
        <ProfileOverview
          subjectId={subjectId}
          isMyPerformance={true}
          onLastEvaluationClick={setCredibilityDetailsSubjectId}
          viewMode={viewModeToEvaluatorViewMode[currentViewMode]}
          onFindEvaluatorsButtonClick={onFindEvaluatorsButtonClick}
        />
      </SubjectOutboundEvaluationsContextProvider>
      {credibilityDetailsSubjectId && (
        <CredibilityDetailsModal
          onClose={() => setCredibilityDetailsSubjectId(null)}
          subjectId={credibilityDetailsSubjectId}
        />
      )}
      {/*</div>*/}
    </>
  );
};

export default EvaluationsDetailsPerformance;
