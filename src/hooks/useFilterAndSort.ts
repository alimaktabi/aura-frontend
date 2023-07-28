import { AuraFilter, AuraFilterOption } from 'hooks/useFilters.ts';
import { AuraSort, AuraSortOption } from 'hooks/useSorts.ts';
import { useMemo, useState } from 'react';

export default function useFilterAndSort<T>(
  items: T[] | null | undefined,
  filters: AuraFilterOption<T>[],
  sorts: AuraSortOption<T>[],
) {
  const [selectedFilterId, setSelectedFilterId] = useState<AuraFilter | null>(
    null,
  );
  const [selectedSortId, setSelectedSortId] = useState<AuraSort | null>(null);

  const itemsFiltered = useMemo(() => {
    const selectedFilter = filters.find((f) => f.id === selectedFilterId)?.func;
    const selectedSort = sorts.find((s) => s.id === selectedSortId)?.func;
    const result = items?.filter(selectedFilter ?? ((_item) => true));
    return selectedSort ? result?.sort(selectedSort) : result;
  }, [filters, items, selectedFilterId, selectedSortId, sorts]);

  return {
    selectedFilterId,
    setSelectedFilterId,
    selectedSortId,
    setSelectedSortId,
    itemsFiltered,
  };
}
