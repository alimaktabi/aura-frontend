import { ModalSortItem } from 'components/Shared/Modal/ModalSortItem';
import { FilterOrSortCategory } from 'hooks/useFilterAndSort';
import {
  AuraSelectedSort,
  AuraSortId,
  AuraSortOptions,
  useCategorizeAuraSortOptions,
} from 'hooks/useSorts';
import * as React from 'react';
import { useCallback } from 'react';

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
              <p className="text-black2 pb-2">{item.title}</p>
              <div className="flex flex-row gap-2">
                <ModalSortItem
                  testidPrefix={testidPrefix}
                  item={item}
                  isSelectedSort={isSelectedSort}
                  setSelectedSort={setSelectedSort}
                  isAscending={item.defaultAscending}
                />
                {!item.justDefaultDirection && (
                  <ModalSortItem
                    testidPrefix={testidPrefix}
                    item={item}
                    isSelectedSort={isSelectedSort}
                    setSelectedSort={setSelectedSort}
                    isAscending={!item.defaultAscending}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
