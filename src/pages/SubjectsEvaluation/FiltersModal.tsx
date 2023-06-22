import { useState } from 'react';
import { ModalItem } from '../../components/Shared/Modal/ModalItem';

export const FiltersModal = () => {
  const [filters] = useState<any>([
    {
      id: 1,
      name: 'Tier',
      items: [
        {
          id: 1,
          name: 'Not yet',
          isSelected: false,
        },
        {
          id: 2,
          name: 'Sybil',
          isSelected: true,
        },
        {
          id: 3,
          name: 'Bronze',
          isSelected: false,
        },
        {
          id: 4,
          name: 'Silver',
          isSelected: false,
        },
        {
          id: 5,
          name: 'Gold',
          isSelected: true,
        },
      ],
    },
    {
      id: 2,
      name: 'Your evaluation',
      items: [
        {
          id: 1,
          name: 'All',
          isSelected: false,
        },
        {
          id: 2,
          name: 'Positive',
          isSelected: false,
        },
        {
          id: 3,
          name: 'Negative',
          isSelected: false,
        },
        {
          id: 4,
          name: 'not evaluated yet',
        },
      ],
    },
    {
      id: 3,
      name: 'Connection type',
      items: [
        {
          id: 1,
          name: 'Just met',
          isSelected: false,
        },
        {
          id: 2,
          name: 'Already known+',
          isSelected: false,
        },
      ],
    },
  ]);
  return (
    <div className="w-full flex flex-col gap-5">
      {filters.map((filter: any) => (
        <div className="flex flex-col gap-3">
          <p className="text-black2">{filter.name}</p>
          <div className="flex flex-row flex-wrap gap-2">
            {filter.items.map((item: any) => (
              <ModalItem
                title={item.name}
                isSelected={item.isSelected}
                icon={null}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
