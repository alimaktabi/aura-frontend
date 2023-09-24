import { ModalItem } from 'components/Shared/Modal/ModalItem';
import { AuraSortId, AuraSortOption } from 'hooks/useSorts';
import * as React from 'react';

interface ModalSortItemProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  isAscending: boolean;
  testidPrefix?: string;
  isSelectedSort: (id: AuraSortId, ascending: boolean) => boolean;
  setSelectedSort: (id: AuraSortId, ascending?: boolean) => void;
  item: AuraSortOption<T>;
}

export function ModalSortItem<T>({
  isAscending,
  testidPrefix,
  item,
  isSelectedSort,
  setSelectedSort,
  ...props
}: ModalSortItemProps<T>) {
  return (
    <ModalItem
      data-testid={`${testidPrefix}-option-${item.title.split(' ').join('')}-${
        isAscending ? 'ascending' : 'descending'
      }`}
      title={
        isAscending
          ? item.ascendingLabel || 'Ascending'
          : item.descendingLabel || 'Descending'
      }
      isSelected={isSelectedSort(item.id, isAscending)}
      onClick={() => setSelectedSort(item.id, isAscending)}
      icon={
        isAscending
          ? '/assets/images/Shared/arrow-up-icon'
          : '/assets/images/Shared/arrow-down-icon'
      }
      className="flex-1"
      {...props}
    />
  );
}
