import { SubjectCard } from './SubjectCard.tsx';
import { SubjectSearch } from './SubjectSearch.tsx';
import { selectBrightIdBackup } from '../../store/profile/selectors.ts';
import { useSelector } from 'react-redux';

const SubjectsEvaluation = () => {
  const brightIdBackup = useSelector(selectBrightIdBackup);

  return (
    <div className="page page__dashboard">
      <SubjectSearch />
      <p className="text-lg text-white mb-5 mt-7">
        Subjects <strong>(23)</strong>
      </p>
      {brightIdBackup ? (
        <div className="flex flex-col gap-3">
          {brightIdBackup.connections.map((conn) => (
            <SubjectCard subjectId={conn.id} key={conn.id} />
          ))}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default SubjectsEvaluation;
