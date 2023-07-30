import { ModalItem } from '../../components/Shared/Modal/ModalItem';
import {
  AuraSortId,
  AuraSortOptions,
  useCategorizeAuraSortOptions,
} from 'hooks/useSorts.ts';
import { FilterOrSortCategory } from 'hooks/useFilterAndSort.ts';

//TODO: merge this with FiltersModal
export function SortModal<T>({
  sorts,
  selectedSortId,
  setSelectedSort,
}: {
  sorts: AuraSortOptions<T>;
  selectedSortId: AuraSortId | null;
  setSelectedSort: (id: AuraSortId, ascending?: boolean) => void;
}) {
  const res = useCategorizeAuraSortOptions(sorts);
  return (
    <div className="w-full flex flex-col gap-5">
      {(Object.keys(res) as FilterOrSortCategory[]).map((category) => (
        <div className="flex flex-col gap-3" key={category}>
          {category !== FilterOrSortCategory.Default && (
            <p className="text-black2">{category}</p>
          )}
          <div className="flex flex-row flex-wrap gap-2">
            {res[category]?.map((item) => (
              <ModalItem
                key={item.id}
                title={item.title}
                isSelected={selectedSortId === item.id}
                onClick={() => setSelectedSort(item.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
