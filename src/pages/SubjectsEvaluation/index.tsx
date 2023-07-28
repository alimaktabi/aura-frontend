import { SubjectCard } from './SubjectCard.tsx';
import { SubjectSearch } from './SubjectSearch.tsx';
import { selectBrightIdBackup } from '../../store/profile/selectors.ts';
import { useSelector } from 'react-redux';
import InfiniteScrollLocal from 'components/InfiniteScrollLocal.tsx';

const SubjectsEvaluation = () => {
  const brightIdBackup = useSelector(selectBrightIdBackup);

  return (
    <div className="page page__dashboard">
      <SubjectSearch />
      <p className="text-lg text-white mb-5 mt-7">
        Subjects{' '}
        <strong>({brightIdBackup?.connections.length ?? '...'})</strong>
      </p>
      {brightIdBackup ? (
        <div className="overflow-auto">
          <InfiniteScrollLocal
            className={'flex flex-col gap-3'}
            items={brightIdBackup.connections}
            renderItem={(conn) => <SubjectCard subjectId={conn.id} />}
          />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default SubjectsEvaluation;
