import { useState } from 'react';
import { ModalItem } from '../../components/Shared/Modal/ModalItem';

export const SortModal = () => {
  const [filters] = useState<any>([
    {
      id: 1,
      name: 'Last updated',
      items: [
        {
          id: 1,
          name: 'Ascending',

          icon: '/assets/images/Shared/arrow-up-icon',
        },
        {
          id: 2,
          name: 'Descending',

          icon: '/assets/images/Shared/arrow-down-icon',
        },
      ],
    },
    {
      id: 2,
      name: 'Most evaluations',
      items: [
        {
          id: 1,
          name: 'Ascending',

          icon: '/assets/images/Shared/arrow-up-icon',
        },
        {
          id: 2,
          name: 'Descending',

          icon: '/assets/images/Shared/arrow-down-icon',
        },
      ],
    },
    {
      id: 3,
      name: 'Score',
      items: [
        {
          id: 1,
          name: 'Ascending',

          icon: '/assets/images/Shared/arrow-up-icon',
        },
        {
          id: 2,
          name: 'Descending',

          icon: '/assets/images/Shared/arrow-down-icon',
        },
      ],
    },
    {
      id: 4,
      name: 'Most mutal connections',
      items: [
        {
          id: 1,
          name: 'Ascending',

          icon: '/assets/images/Shared/arrow-up-icon',
        },
        {
          id: 2,
          name: 'Descending',

          icon: '/assets/images/Shared/arrow-down-icon',
        },
      ],
    },
  ]);
  return (
    <div className="w-full flex flex-col gap-5">
      {filters.map((filter: any) => (
        <div className="flex flex-col gap-3">
          <p className="text-black2">{filter.name}</p>
          <div className="flex flex-row gap-2">
            {filter.items.map((item: any) => (
              <ModalItem
                className="flex-1"
                title={item.name}
                isSelected={false}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
