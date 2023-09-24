import { FilterOrSortCategory } from 'hooks/useFilterAndSort';
import {
  AuraSelectedSort,
  AuraSortId,
  AuraSortOption,
  AuraSortOptions,
  useCategorizeAuraSortOptions,
} from 'hooks/useSorts';
import * as React from 'react';
import { useCallback } from 'react';

import { ModalItem } from '../../components/Shared/Modal/ModalItem';

interface SortModalItemProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  isAscending: boolean;
  testidPrefix?: string;
  isSelectedSort: (id: AuraSortId, ascending: boolean) => boolean;
  setSelectedSort: (id: AuraSortId, ascending?: boolean) => void;
  item: AuraSortOption<T>;
}

function SortModalItem<T>({
  isAscending,
  testidPrefix,
  item,
  isSelectedSort,
  setSelectedSort,
  ...props
}: SortModalItemProps<T>) {
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
    />
  );
}

//TODO: merge this with FiltersModal
export function SortsModal<T>({
  sorts,
  selectedSort,
  setSelectedSort,
  testidPrefix,
}: {
  sorts: AuraSortOptions<T>;
  selectedSort: AuraSelectedSort<T> | null;
  setSelectedSort: (id: AuraSortId, ascending?: boolean) => void;
  testidPrefix?: string;
}) {
  const res = useCategorizeAuraSortOptions(sorts);
  const isSelectedSort = useCallback(
    (id: AuraSortId, ascending: boolean) => {
      return (
        selectedSort?.id === id &&
        ascending ===
          (selectedSort.defaultAscending !== selectedSort.isReversed)
      );
    },
    [selectedSort],
  );
  return (
    <div className="w-full flex flex-col gap-5">
      {(Object.keys(res) as FilterOrSortCategory[]).map((category) => (
        <div className="flex flex-col gap-3" key={category}>
          {category !== FilterOrSortCategory.Default && (
            <p className="text-black2">{category}</p>
          )}
          {res[category]?.map((item) => (
            <div key={item.id}>
              <p className="text-black2">{item.title}</p>
              <div className="flex flex-row gap-2">
                <SortModalItem
                  testidPrefix={testidPrefix}
                  item={item}
                  isSelectedSort={isSelectedSort}
                  setSelectedSort={setSelectedSort}
                  isAscending={item.defaultAscending}
                />
                <SortModalItem
                  testidPrefix={testidPrefix}
                  item={item}
                  isSelectedSort={isSelectedSort}
                  setSelectedSort={setSelectedSort}
                  isAscending={!item.defaultAscending}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
