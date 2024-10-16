import { SubjectCard } from 'components/EvaluationFlow/SubjectCard';
import { SubjectListControls } from 'components/EvaluationFlow/SubjectListControls';
import { PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING } from 'constants/index';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { SubjectInboundEvaluationsContextProvider } from 'contexts/SubjectInboundEvaluationsContext';
import Onboarding from 'pages/Onboarding';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import InfiniteScrollLocal from '../../components/InfiniteScrollLocal';
import LevelUp from '../../components/LevelUp';
import { EmptySubjectList } from '../../components/Shared/EmptyAndLoadingStates/EmptySubjectList';
import { LoadingList } from '../../components/Shared/EmptyAndLoadingStates/LoadingList';
import { HeaderPreferedView } from '../../components/Shared/HeaderPreferedView';
import { ToggleInput } from '../../components/Shared/ToggleInput';
import { useSubjectsListContext } from '../../contexts/SubjectsListContext';
import { useDispatch } from '../../store/hooks';
import { getBrightIdBackupThunk } from '../../store/profile/actions';
import {
  selectAuthData,
  selectPlayerOnboardingScreenShown,
} from '../../store/profile/selectors';
import { hash } from '../../utils/crypto';
import ProfileInfoPerformance from './components/ProfileInfoPerformance';
// import LinkCard from './LinkCard';

const Home = () => {
  const color = {
    Player: 'pastel-green',
    Trainer: 'pastel-orange',
    Manager: 'pastel-blue',
  };
  const [isEvaluate, setIsEvaluate] = useState(true);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (query.get('tab') === 'levelup') {
      setIsEvaluate(false);

      // Clear the 'tab' query parameter
      query.delete('tab');
      navigate({
        pathname: window.location.pathname,
        search: query.toString(),
      });
    }
  }, [query, navigate]);

  const authData = useSelector(selectAuthData);
  const {
    itemsFiltered: filteredSubjects,
    selectedFilterIds,
    clearFilter,
  } = useSubjectsListContext();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const refreshBrightIdBackup = useCallback(async () => {
    if (!authData) return;
    setLoading(true);
    const authKey = hash(authData.brightId + authData.password);
    await dispatch(getBrightIdBackupThunk({ authKey }));
    setLoading(false);
  }, [authData, dispatch]);

  const { myRatings, loading: loadingMyEvaluations } =
    useMyEvaluationsContext();
  const isLocked = useMemo(
    () =>
      !myRatings ||
      myRatings.filter((r) => Number(r.rating)).length <
        PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING,
    [myRatings],
  );

  const playerOnboardingScreenShown = useSelector(
    selectPlayerOnboardingScreenShown,
  );

  if (!authData) {
    return <div>Not logged in</div>;
  }

  return myRatings?.length === 0 && !playerOnboardingScreenShown ? (
    <Onboarding />
  ) : loadingMyEvaluations ? (
    <LoadingList />
  ) : (
    <SubjectInboundEvaluationsContextProvider subjectId={authData.brightId}>
      <div id="scrollable-div" className="page flex flex-col gap-4">
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
        />
        <ToggleInput
          option1={'Evaluate'}
          option2={'Level Up'}
          isChecked={isEvaluate}
          setIsChecked={setIsEvaluate}
          option2Disabled={isLocked}
        />
        {isEvaluate ? (
          <div>
            <SubjectListControls
              refreshBrightIdBackup={refreshBrightIdBackup}
            />
            {filteredSubjects && !loading ? (
              filteredSubjects.length > 0 ? (
                <div className="overflow-auto flex-grow no-scrollbar">
                  <InfiniteScrollLocal
                    getScrollParent={() =>
                      document.getElementById('scrollable-div')
                    }
                    className={'flex flex-col gap-3'}
                    items={filteredSubjects}
                    //TODO: optimize rendering by caching the rendered components
                    renderItem={(conn, index) => (
                      <SubjectCard index={index} subjectId={conn.id} />
                    )}
                  />
                </div>
              ) : (
                <EmptySubjectList
                  clearFilter={clearFilter}
                  hasFilter={selectedFilterIds !== null}
                />
              )
            ) : (
              <LoadingList />
            )}
          </div>
        ) : (
          <LevelUp subjectId={authData.brightId} />
        )}
      </div>
    </SubjectInboundEvaluationsContextProvider>
  );
};

export const HomeHeader = () => {
  return (
    <>
      Home
      <HeaderPreferedView.PreferedView />
    </>
  );
};

export default Home;
