import { ModalItem } from 'components/Shared/Modal/ModalItem';
import { FilterOrSortCategory } from 'hooks/useFilterAndSort';
import {
  AuraFilterId,
  AuraFilterOptions,
  useCategorizeAuraFilterOptions,
} from 'hooks/useFilters';

export function FiltersModal<T>({
  filters,
  selectedFilterIds,
  toggleFilterById,
  testidPrefix,
}: {
  filters: AuraFilterOptions<T>;
  selectedFilterIds: AuraFilterId[] | null;
  toggleFilterById: (item: AuraFilterId | null) => void;
  testidPrefix?: string;
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
                data-testid={`${testidPrefix}-option-${item.title
                  .split(' ')
                  .join('')}`}
                key={item.id}
                title={item.title}
                isSelected={selectedFilterIds?.includes(item.id) ?? false}
                onClick={() => toggleFilterById(item.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
