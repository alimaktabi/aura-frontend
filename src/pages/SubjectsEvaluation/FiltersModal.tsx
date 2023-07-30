import { ModalItem } from '../../components/Shared/Modal/ModalItem';
import {
  AuraFilterId,
  AuraFilterOptions,
  useCategorizeAuraFilterOptions,
} from 'hooks/useFilters.ts';
import { FilterOrSortCategory } from 'hooks/useFilterAndSort.ts';

export function FiltersModal<T>({
  filters,
  selectedFilterId,
  setSelectedFilterId,
}: {
  filters: AuraFilterOptions<T>;
  selectedFilterId: AuraFilterId | null;
  setSelectedFilterId: (item: AuraFilterId | null) => void;
}) {
  const res = useCategorizeAuraFilterOptions(filters);
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
                isSelected={selectedFilterId === item.id}
                onClick={() => setSelectedFilterId(item.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
