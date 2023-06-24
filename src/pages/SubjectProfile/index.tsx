import EvaluationsDetails from '../../components/Shared/EvaluationsDetails';
import { ProfileInfo } from '../../components/Shared/ProfileInfo';
import { YourEvaluation } from './YourEvaluation';

const SubjectProfile = () => {
  return (
    <div className="page page__dashboard flex flex-col gap-4">
      <ProfileInfo />
      <YourEvaluation />
      <EvaluationsDetails />
    </div>
  );
};

export default SubjectProfile;
