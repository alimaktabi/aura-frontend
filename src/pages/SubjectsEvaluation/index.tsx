import { SubjectCard } from './SubjectCard.tsx';
import { SubjectSearch } from './SubjectSearch.tsx';
import { selectBrightIdBackup } from '../../store/profile/selectors.ts';
import { useSelector } from 'react-redux';
import InfiniteScrollLocal from 'components/InfiniteScrollLocal.tsx';
import { useSubjectsListContext } from 'contexts/SubjectsListContext.tsx';

const SubjectsEvaluation = () => {
  const brightIdBackup = useSelector(selectBrightIdBackup);
  const { itemsFiltered: filteredSubjects } = useSubjectsListContext();
  return (
    <div className="page page__dashboard h-screen flex flex-col">
      <SubjectSearch />
      <p className="text-lg text-white mb-5 mt-7">
        Subjects{' '}
        <strong>({brightIdBackup?.connections.length ?? '...'})</strong>
      </p>
      {filteredSubjects ? (
        <div className="overflow-auto flex-grow">
          <InfiniteScrollLocal
            className={'flex flex-col gap-3'}
            items={filteredSubjects}
            //TODO: optimize rendering by caching the rendered components
            renderItem={(conn, index) => (
              <SubjectCard index={index} subjectId={conn.id} />
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
