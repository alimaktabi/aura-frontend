import InfiniteScrollLocal from 'components/InfiniteScrollLocal';
import ActivitiesCard from 'components/Shared/ActivitiesCard/index';
import ProfileEvaluation from 'components/Shared/ProfileEvaluation/ProfileEvaluation';
import {
  SubjectInboundEvaluationsContextProvider,
  useSubjectInboundEvaluationsContext,
} from 'contexts/SubjectInboundEvaluationsContext';
import { EvidenceListSearch } from 'pages/SubjectProfile/EvidenceListSearch';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EvaluationsDetails from '../../components/Shared/EvaluationsDetails';
import { ProfileInfo } from '../../components/Shared/ProfileInfo';
import { ToggleInput } from '../../components/Shared/ToggleInput';
import { selectAuthData } from '../../store/profile/selectors';
import EvaluateOverlayCard from '../SubjectsEvaluation/EvaluateOverlayCard';
import NewEvaluationCard from './NewEvaluationCard';
import { YourEvaluation } from './YourEvaluation';

const SubjectProfileBody = ({ subjectId }: { subjectId: string }) => {
  const role = 'Player';

  const authData = useSelector(selectAuthData);

  const { inboundRatings, loading } =
    useSubjectInboundEvaluationsContext(subjectId);
  const isEvaluated = useMemo(() => {
    if (!authData?.brightId) return false;
    const rating = inboundRatings?.find(
      (r) => r.fromBrightId === authData?.brightId,
    )?.rating;
    return rating && Math.abs(Number(rating)) > 0;
  }, [authData?.brightId, inboundRatings]);

  const [isOverviewSelected, setIsOverviewSelected] = useState(true);

  const [showEvaluateOverlayCard, setShowEvaluateOverlayCard] = useState(false);

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

  const { itemsFiltered: evaluations } =
    useSubjectInboundEvaluationsContext(subjectId);
  const evaluators: string[] = useMemo(() => {
    if (!evaluations) return [];
    return evaluations.map((e) => e.fromSubjectId);
  }, [evaluations]);

  return (
    <div className="page page__dashboard flex flex-col gap-4">
      {!isOverviewSelected && (
        <EvaluateOverlayCard
          className={`absolute top-24 z-10 min-h-[89px] transition-all min-w-[403px] max-w-[403px] ${
            showEvaluateOverlayCard
              ? 'translate-y-0 opacity-100'
              : '-translate-y-60 opacity-0'
          }`}
          subjectId={subjectId}
        />
      )}

      <ProfileInfo subjectId={subjectId} />
      {loading ? (
        <div className="card flex flex-col gap-2.5">...</div>
      ) : isEvaluated ? (
        <YourEvaluation subjectId={subjectId} />
      ) : (
        <NewEvaluationCard subjectId={subjectId} />
      )}
      {/* if role is not player then show activities card */}
      {role !== 'Player' && <ActivitiesCard />}

      <div className="flex gap-1 -mb-1">
        <p className="font-bold text-lg">Evidence</p>
        <img
          className="cursor-pointer"
          src="/assets/images/SubjectProfile/evidence-info-icon.svg"
          alt=""
        />
      </div>
      <ToggleInput
        option1="Overview"
        option2="Evidence List"
        isChecked={isOverviewSelected}
        setIsChecked={setIsOverviewSelected}
      />
      {isOverviewSelected ? (
        <EvaluationsDetails subjectId={subjectId} />
      ) : (
        <>
          <EvidenceListSearch subjectId={subjectId} />
          <InfiniteScrollLocal
            className={'flex flex-col gap-2.5 w-full -mb-5 pb-5 h-full'}
            items={evaluators}
            renderItem={(evaluator) => (
              <ProfileEvaluation
                key={evaluator}
                fromSubjectId={evaluator}
                toSubjectId={subjectId}
                className="!min-w-[305px] !py-5"
              />
            )}
          />
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
    <SubjectInboundEvaluationsContextProvider subjectId={subjectId}>
      <SubjectProfileBody subjectId={subjectId} />
    </SubjectInboundEvaluationsContextProvider>
  );
};

export default SubjectProfile;
