import { useState } from 'react';
import { SubjectCard } from './SubjectCard.tsx';

const SubjectsEvaluation = () => {
  const [subjects] = useState<any>([
    {
      id: 1,
      image: '/assets/images/profile.jpg',
      name: 'Sina Parvizi',
      tier: 'Bronze',
      score: '2.5k',
      status: '18 Pos / 5 Neg',
      evaluation: null,
      evaluationStrength: 'Very High',
    },
    {
      id: 2,
      image: '/assets/images/profile.jpg',
      name: 'Sina Parvizi',
      tier: 'Bronze',
      score: '2.5k',
      status: '18 Pos / 5 Neg',
      evaluation: 'POSITIVE',
      evaluationStrength: 'Very High',
    },
    {
      id: 3,
      image: '/assets/images/profile.jpg',
      name: 'Sina Parvizi',
      tier: 'Bronze',
      score: '2.5k',
      status: '18 Pos / 5 Neg',
      evaluation: 'NEGATIVE',
      evaluationStrength: 'Medium',
    },
  ]);

  return (
    <div className="page page__dashboard">
      <div className="card mb-4"></div>
      <p className="text-lg text-white mb-5 mt-7">
        Subjects <strong>(23)</strong>
      </p>
      <div className="flex flex-col gap-3">
        {subjects.map((subject: any) => (
          <SubjectCard subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default SubjectsEvaluation;
