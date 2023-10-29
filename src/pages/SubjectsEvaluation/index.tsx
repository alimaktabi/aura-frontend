import InfiniteScrollLocal from 'components/InfiniteScrollLocal';
import { SubjectInboundEvaluationsContextProvider } from 'contexts/SubjectInboundEvaluationsContext';
import { useSubjectsListContext } from 'contexts/SubjectsListContext';
import { useSelector } from 'react-redux';

import { selectBrightIdBackup } from '../../store/profile/selectors';
import { SubjectCard } from './SubjectCard';
import { SubjectSearch } from './SubjectSearch';

const SubjectsEvaluation = () => {
  const brightIdBackup = useSelector(selectBrightIdBackup);
  const { itemsFiltered: filteredSubjects } = useSubjectsListContext();
  return (
    <div className="page page__dashboard h-screen flex flex-col">
      <SubjectSearch />
      <p className="text-lg text-white mb-5 mt-7">
        Subjects{' '}
        <strong>({brightIdBackup?.connections.length ?? '...'})</strong>
        {filteredSubjects !== null &&
          filteredSubjects.length !== brightIdBackup?.connections.length && (
            <span className="pl-2">
              ({filteredSubjects.length} filter result
              {filteredSubjects.length !== 1 ? 's' : ''})
            </span>
          )}
      </p>
      {filteredSubjects ? (
        <div className="overflow-auto flex-grow">
          <InfiniteScrollLocal
            className={'flex flex-col gap-3'}
            items={filteredSubjects}
            //TODO: optimize rendering by caching the rendered components
            renderItem={(conn, index) => (
              <SubjectInboundEvaluationsContextProvider subjectId={conn.id}>
                <SubjectCard index={index} subjectId={conn.id} />
              </SubjectInboundEvaluationsContextProvider>
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
