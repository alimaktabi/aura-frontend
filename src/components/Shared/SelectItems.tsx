import { Key, useState } from 'react';
import { ModalItem } from './Modal/ModalItem.tsx';

interface SelectableItem<T extends Key> {
  id: T;
  title: string;
  icon?: string;
}

export function SelectItems<T extends Key>({
  title,
  isOpenInitial,
  items,
  selectedItemId,
  setSelectedItemId,
}: {
  title: string;
  isOpenInitial: boolean;
  items: SelectableItem<T>[];
  selectedItemId: T | null;
  setSelectedItemId: (item: T | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(isOpenInitial);
  return (
    <div className="flex flex-col w-full gap-2.5">
      <div className="flex justify-between">
        <p className="">{title}</p>
        <img
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
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
          {items.map((item) => (
            <ModalItem
              key={item.id}
              className="w-auto min-w-min"
              title={item.title}
              isSelected={item.id === selectedItemId}
              icon={item.icon}
              onClick={() => setSelectedItemId(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
