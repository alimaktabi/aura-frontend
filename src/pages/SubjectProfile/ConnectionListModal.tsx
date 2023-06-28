import { ModalItem } from '../../components/Shared/Modal/ModalItem';
import { useState } from 'react';
import { SubjectCard } from '../SubjectsEvaluation/SubjectCard';

export const ConnectionListModal = () => {
  const [subjects] = useState<any>([
    {
      id: 1,
      image: '/assets/images/profile.jpeg',
      name: 'Sina Parvizi',
      tier: 'Bronze',
      score: '2.5k',
      status: '18 Pos / 5 Neg',
      evaluation: null,
      evaluationStrength: 'Very High',
    },
    {
      id: 2,
      image: '/assets/images/profile.jpeg',
      name: 'Sina Parvizi',
      tier: 'Bronze',
      score: '2.5k',
      status: '18 Pos / 5 Neg',
      evaluation: 'null',
      evaluationStrength: 'Very High',
    },
    {
      id: 3,
      image: '/assets/images/profile.jpeg',
      name: 'Sina Parvizi',
      tier: 'Bronze',
      score: '2.5k',
      status: '18 Pos / 5 Neg',
      evaluation: 'null',
      evaluationStrength: 'Medium',
    },
    {
      id: 4,
      image: '/assets/images/profile.jpeg',
      name: 'Sina Parvizi',
      tier: 'Bronze',
      score: '2.5k',
      status: '18 Pos / 5 Neg',
      evaluation: 'null',
      evaluationStrength: 'Medium',
    },
  ]);
  return (
    <div className="flex flex-col gap-6 overflow-scroll overscroll-contain max-h-[600px]">
      <div className="flex w-full justify-between">
        <p>Filters:</p>
        <ModalItem title="Mutual Connections" isSelected={false} icon={null} />
      </div>
      <div className="flex flex-col gap-2.5 w-full -mb-5 pb-5">
        {subjects.map((subject: any) => (
          <SubjectCard subject={subject} />
        ))}
      </div>
    </div>
  );
};
