import InfiniteScrollLocal from 'components/InfiniteScrollLocal';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { SubjectInboundRatingsContextProvider } from 'contexts/SubjectInboundRatingsContext';
import { useSubjectsListContext } from 'contexts/SubjectsListContext';
import useBrightIdBackupWithUpdatedConnectionLevels from 'hooks/useBrightIdBackupWithUpdatedConnectionLevels';
import Onboarding from 'pages/Onboarding';
import { SubjectCard } from 'pages/SubjectsEvaluation/SubjectCard';
import { SubjectSearch } from 'pages/SubjectsEvaluation/SubjectSearch';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'store/hooks';
import { getBrightIdBackupThunk } from 'store/profile/actions';
import { hash } from 'utils/crypto';

import {
  selectAuthData,
  selectPlayerOnboardingScreenShown,
} from '../../store/profile/selectors';

const SubjectsEvaluation = () => {
  const brightIdBackup = useBrightIdBackupWithUpdatedConnectionLevels();
  const { itemsFiltered: filteredSubjects } = useSubjectsListContext();

  const authData = useSelector(selectAuthData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { myRatings, loading: loadingMyEvaluations } =
    useMyEvaluationsContext();
  const playerOnboardingScreenShown = useSelector(
    selectPlayerOnboardingScreenShown,
  );

  const refreshBrightIdBackup = useCallback(async () => {
    if (!authData) return;
    setLoading(true);
    const authKey = hash(authData.brightId + authData.password);
    await dispatch(getBrightIdBackupThunk({ authKey }));
    setLoading(false);
  }, [authData, dispatch]);

  const { t } = useTranslation();

  return myRatings?.length === 0 && !playerOnboardingScreenShown ? (
    <Onboarding />
  ) : loadingMyEvaluations ? (
    <div>Loading...</div>
  ) : (
    <div className="page page__dashboard h-screen flex flex-col">
      <SubjectSearch />
      <div className="text-lg text-white mb-5 mt-7 flex">
        Subjects{' '}
        <strong className="ml-1">
          ({brightIdBackup?.connections.length ?? '...'})
        </strong>
        {filteredSubjects !== null &&
          filteredSubjects.length !== brightIdBackup?.connections.length && (
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
  );
};

export default SubjectsEvaluation;
