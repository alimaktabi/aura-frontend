import { useState } from 'react';
import { ModalItem } from '../../components/Shared/Modal/ModalItem';

export const FiltersModal = () => {
  const [filters] = useState([
    {
      id: 1,
      name: 'Tier',
      items: [
        {
          id: 1,
          name: 'Not yet',
        },
        {
          id: 2,
          name: 'Sybil',
        },
        {
          id: 3,
          name: 'Bronze',
        },
        {
          id: 4,
          name: 'Silver',
        },
        {
          id: 5,
          name: 'Gold',
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
        },
        {
          id: 2,
          name: 'Positive',
        },
        {
          id: 3,
          name: 'Negative',
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
        },
        {
          id: 2,
          name: 'Already known+',
        },
      ],
    },
  ]);
  return (
    <div className="w-full flex flex-col gap-5">
      {filters.map((filter) => (
        <div className="flex flex-col gap-3" key={filter.id}>
          <p className="text-black2">{filter.name}</p>
          <div className="flex flex-row flex-wrap gap-2">
            {filter.items.map((item) => (
              <ModalItem key={item.id} title={item.name} isSelected={false} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
