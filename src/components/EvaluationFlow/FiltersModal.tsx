import { ModalItem } from 'components/Shared/Modal/ModalItem';
import { FilterCategoryId } from 'hooks/useFilterAndSort';
import {
  AuraFilterId,
  AuraFilterOptions,
  useCategorizeAuraFilterOptions,
} from 'hooks/useFilters';

export function FiltersModal<T>({
  filters,
  selectedFilterIds,
  toggleFiltersById,
  testidPrefix,
}: {
  filters: AuraFilterOptions<T>;
  selectedFilterIds: AuraFilterId[] | null;
  toggleFiltersById: (item: AuraFilterId[] | null) => void;
  testidPrefix?: string;
}) {
  const res = useCategorizeAuraFilterOptions(filters);
  return (
    <div className="w-full flex flex-col gap-5">
      {(Object.keys(res) as FilterCategoryId[]).map((category) => (
        <div className="flex flex-col gap-3" key={category}>
          <p className="text-black2">
            {category !== FilterCategoryId.Default && category}
          </p>
          <div className="flex flex-row flex-wrap gap-2">
            {res[category]?.map((item) => (
              <ModalItem
                data-testid={`${testidPrefix}-option-${item.title
                  .split(' ')
                  .join('')}`}
                key={item.id}
                title={item.title}
                isSelected={selectedFilterIds?.includes(item.id) ?? false}
                onClick={() => toggleFiltersById([item.id])}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
