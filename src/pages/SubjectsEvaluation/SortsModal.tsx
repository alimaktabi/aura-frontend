import { ModalItem } from '../../components/Shared/Modal/ModalItem';
import {
  AuraSelectedSort,
  AuraSortId,
  AuraSortOptions,
  useCategorizeAuraSortOptions,
} from 'hooks/useSorts.ts';
import { FilterOrSortCategory } from 'hooks/useFilterAndSort.ts';
import { useCallback } from 'react';

//TODO: merge this with FiltersModal
export function SortsModal<T>({
  sorts,
  selectedSort,
  setSelectedSort,
}: {
  sorts: AuraSortOptions<T>;
  selectedSort: AuraSelectedSort<T> | null;
  setSelectedSort: (id: AuraSortId, ascending?: boolean) => void;
}) {
  const res = useCategorizeAuraSortOptions(sorts);
  const isSelectedSort = useCallback(
    (id: AuraSortId, ascending: boolean) => {
      if (!selectedSort) return false;
      if (selectedSort.id !== id) return false;
      if (ascending) {
        return (
          (selectedSort.defaultAscending && !selectedSort.isReversed) ||
          (!selectedSort.defaultAscending && selectedSort.isReversed)
        );
      } else {
        return (
          (selectedSort.defaultAscending && selectedSort.isReversed) ||
          (!selectedSort.defaultAscending && !selectedSort.isReversed)
        );
      }
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
                  title="Ascending"
                  isSelected={isSelectedSort(item.id, true)}
                  onClick={() => setSelectedSort(item.id, true)}
                  icon={'/assets/images/Shared/arrow-up-icon'}
                  className="flex-1"
                />
                <ModalItem
                  title="Descending"
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
