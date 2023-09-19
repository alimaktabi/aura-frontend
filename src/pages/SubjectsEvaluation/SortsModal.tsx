import { FilterOrSortCategory } from 'hooks/useFilterAndSort';
import {
  AuraSelectedSort,
  AuraSortId,
  AuraSortOptions,
  useCategorizeAuraSortOptions,
} from 'hooks/useSorts';
import { useCallback } from 'react';

import { ModalItem } from '../../components/Shared/Modal/ModalItem';

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
                <ModalItem
                  data-testid={`${testidPrefix}-option-${item.title
                    .split(' ')
                    .join('')}-ascending`}
                  title="Ascending"
                  isSelected={isSelectedSort(item.id, true)}
                  onClick={() => setSelectedSort(item.id, true)}
                  icon={'/assets/images/Shared/arrow-up-icon'}
                  className="flex-1"
                />
                <ModalItem
                  title="Descending"
                  data-testid={`${testidPrefix}-option-${item.title
                    .split(' ')
                    .join('')}-descending`}
                  isSelected={isSelectedSort(item.id, false)}
                  onClick={() => setSelectedSort(item.id, false)}
                  icon={'/assets/images/Shared/arrow-down-icon'}
                  className="flex-1"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
