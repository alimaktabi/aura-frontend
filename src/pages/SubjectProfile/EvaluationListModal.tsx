import { useState } from 'react';
import { ModalItem } from '../../components/Shared/Modal/ModalItem';
import ProfileEvaluation from '../../components/Shared/ProfileEvaluation';

export const EvaluationListModal = () => {
  const [filters] = useState<any>([
    {
      id: 1,
      title: 'Mutual connections',
      isSelected: false,
    },
    {
      id: 2,
      title: 'Positive Evaluations',
      isSelected: true,
    },
    {
      id: 3,
      title: 'Negative Evaluations',
      isSelected: false,
    },
  ]);
  const [sorts] = useState<any>([
    {
      id: 1,
      title: 'Recent',
      isSelected: false,
    },
    {
      id: 2,
      title: 'Evaluation Score',
      isSelected: true,
    },
    {
      id: 3,
      title: 'Player Score',
      isSelected: false,
    },
  ]);
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
    <div className="flex flex-col gap-[18px] overflow-scroll overscroll-contain max-h-[600px]">
      <SelectItems title="Filters" isOpen={true} items={filters} />
      <SelectItems title="Sort" isOpen={false} items={sorts} />
      <div className="flex flex-col gap-2.5 w-full -mb-5 pb-5">
        {profiles.map((profiles: any) => (
          <ProfileEvaluation profile={profiles} />
        ))}
      </div>
    </div>
  );
};

const SelectItems = ({
  title,
  isOpen,
  items,
}: {
  title: string;
  isOpen: boolean;
  items: any;
}) => {
  return (
    <div className="flex flex-col w-full gap-2.5">
      <div className="flex justify-between">
        <p className="">{title}</p>
        <img
          src={`${
            isOpen
              ? '/assets/images/Shared/minus-icon.svg'
              : '/assets/images/Shared/plus-icon.svg'
          }`}
          alt=""
        />
      </div>
      {isOpen && (
        <div className="flex flex-row flex-wrap gap-2">
          {items.map((item: any) => (
            <ModalItem
              className="w-auto min-w-min"
              title={item.title}
              isSelected={item.isSelected}
              icon={item.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
};
