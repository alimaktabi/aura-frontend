import { SubjectCard } from 'components/EvaluationFlow/SubjectCard';
import { SubjectSearch } from 'components/EvaluationFlow/SubjectSearch';
import { SubjectInboundEvaluationsContextProvider } from 'contexts/SubjectInboundEvaluationsContext';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import InfiniteScrollLocal from '../../components/InfiniteScrollLocal';
import FindTrainersCard from '../../components/Shared/FindTrainersCard';
import { ToggleInput } from '../../components/Shared/ToggleInput';
import { SubjectInboundRatingsContextProvider } from '../../contexts/SubjectInboundRatingsContext';
import { useSubjectsListContext } from '../../contexts/SubjectsListContext';
import useBrightIdBackupWithAuraConnectionData from '../../hooks/useBrightIdBackupWithAuraConnectionData';
import { useDispatch } from '../../store/hooks';
import { getBrightIdBackupThunk } from '../../store/profile/actions';
import { selectAuthData } from '../../store/profile/selectors';
import { hash } from '../../utils/crypto';
import EvaluationsDetailsPerformance from './components/EvaluationsDetailsPerformance';
import ProfileInfoPerformance from './components/ProfileInfoPerformance';
// import LinkCard from './LinkCard';

const Home = () => {
  const color = {
    Player: 'pastel-green',
    Trainer: 'pastel-orange',
    Manager: 'pastel-blue',
  };
  const [isEvaluate, setIsEvaluate] = useState(true);
  const hasTrainers = false;
  const isLocked = false;
  const authData = useSelector(selectAuthData);
  const brightIdBackup = useBrightIdBackupWithAuraConnectionData();
  const { itemsFiltered: filteredSubjects } = useSubjectsListContext();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const refreshBrightIdBackup = useCallback(async () => {
    if (!authData) return;
    setLoading(true);
    const authKey = hash(authData.brightId + authData.password);
    await dispatch(getBrightIdBackupThunk({ authKey }));
    setLoading(false);
  }, [authData, dispatch]);
  if (!authData) {
    return <div>Not logged in</div>;
  }

  return (
    <SubjectInboundEvaluationsContextProvider subjectId={authData.brightId}>
      <div className="page flex flex-col gap-4">
        {/*<ProfileInfo*/}
        {/*  subjectId={authData.brightId}*/}
        {/*  isPerformance={true}*/}
        {/*  // role="Player" // this name should be dynamic and be shown on the top of the page - value is set on Routes.tsx*/}
        {/*  color={color.Player} // this color should be based on role*/}
        {/*/>*/}
        <ProfileInfoPerformance
          subjectId={authData.brightId}
          isPerformance={true}
          // role="Player" // this name should be dynamic and be shown on the top of the page - value is set on Routes.tsx
          color={color.Player} // this color should be based on role
          isLocked={isLocked}
          percentage={`w-[73%]`}
        />
        <ToggleInput
          option1={'Evaluate'}
          option2={'Level Up'}
          isChecked={isEvaluate}
          setIsChecked={setIsEvaluate}
          option2Disabled={isLocked}
        />
        {!isEvaluate && (
          <div className="flex flex-col gap-4">
            {/*<ActivitiesCard />*/}
            {!hasTrainers && <FindTrainersCard />}
            {hasTrainers && (
              <EvaluationsDetailsPerformance
                subjectId={authData.brightId}
                title="Evaluation by Trainers"
                hasHeader={true}
                hasBtn={true}
              />
            )}
          </div>
        )}
        {isEvaluate && (
          <div>
            <SubjectSearch />
            <div className="text-lg text-white mb-3 mt-3 flex">
              Subjects{' '}
              <strong className="ml-1">
                ({brightIdBackup?.connections.length ?? '...'})
              </strong>
              {filteredSubjects !== null &&
                filteredSubjects.length !==
                  brightIdBackup?.connections.length && (
                  <span className="ml-2">
                    ({filteredSubjects.length} filter result
                    {filteredSubjects.length !== 1 ? 's' : ''})
                  </span>
                )}
              <img
                src="/assets/images/Shared/refresh.svg"
                alt="refresh"
                className="w-7 h-7 ml-1 mt-0.5 cursor-pointer"
                onClick={refreshBrightIdBackup}
              />
            </div>
            {filteredSubjects && !loading ? (
              <div className="overflow-auto flex-grow no-scrollbar">
                <InfiniteScrollLocal
                  className={'flex flex-col gap-3'}
                  items={filteredSubjects}
                  //TODO: optimize rendering by caching the rendered components
                  renderItem={(conn, index) => (
                    <SubjectInboundRatingsContextProvider subjectId={conn.id}>
                      <SubjectCard index={index} subjectId={conn.id} />
                    </SubjectInboundRatingsContextProvider>
                  )}
                />
              </div>
            ) : (
              <div>loading...</div>
            )}
          </div>
        )}
      </div>
      {/*<LinkCard />*/}
    </SubjectInboundEvaluationsContextProvider>
  );
};

export default Home;
