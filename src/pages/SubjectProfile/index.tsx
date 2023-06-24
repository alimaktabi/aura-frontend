import EvaluationsDetails from '../../components/Shared/EvaluationsDetails';
import ProfileEvaluation from '../../components/Shared/ProfileEvaluation';
import { ProfileInfo } from '../../components/Shared/ProfileInfo';
import { YourEvaluation } from './YourEvaluation';
import { useState } from 'react';

const SubjectProfile = () => {
  const [profiles] = useState([
    {
      id: 1,
      name: 'Adam Stallard',
      image: '/assets/images/profile.jpeg',
      connections: 432,
      mutualConnections: 323,
      rate: '233K',
      evaluationInfo: {
        notes: true,
        evaluation: 'POSITIVE',
        evaluationStrength: 'Very High',
        score: '2.32K',
        isYourEvaluation: false,
      },
    },
    {
      id: 2,
      name: 'Adam Stallard',
      image: 'assets/images/profile.jpeg',
      connections: 432,
      mutualConnections: 323,
      rate: '233K',
      evaluationInfo: {
        notes: false,
        evaluation: 'NEGATIVE',
        evaluationStrength: 'Very High',
        score: '-2.32K',
        isYourEvaluation: false,
      },
    },
    {
      id: 3,
      name: 'Adam Stallard',
      image: 'assets/images/profile.jpeg',
      connections: 432,
      mutualConnections: 323,
      rate: '233K',
      evaluationInfo: {
        notes: true,
        evaluation: 'NEGATIVE',
        evaluationStrength: 'Very High',
        score: '-2.32K',
        isYourEvaluation: false,
      },
    },
  ]);
  return (
    <div className="page page__dashboard flex flex-col gap-4">
      <ProfileInfo />
      <YourEvaluation />
      <EvaluationsDetails />
      <div className="flex gap-2.5 w-full overflow-x-auto !min-w-[100vw] -ml-5 px-5">
        {profiles.map((profiles: any) => (
          <ProfileEvaluation
            profile={profiles}
            className="!min-w-[305px] !py-5"
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectProfile;
