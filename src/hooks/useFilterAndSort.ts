import { AuraFilter, AuraFilterOption } from 'hooks/useFilters.ts';
import { AuraSort, AuraSortOption } from 'hooks/useSorts.ts';
import { useMemo, useState } from 'react';

export default function useFilterAndSort<T>(
  items: T[] | null | undefined,
  filters: AuraFilterOption<T>[],
  sorts: AuraSortOption<T>[],
  searchKeys?: (keyof T)[],
) {
  const [selectedFilterId, setSelectedFilterId] = useState<AuraFilter | null>(
    null,
  );
  const [selectedSortId, setSelectedSortId] = useState<AuraSort | null>(null);
  const [searchString, setSearchString] = useState('');
  const itemsFiltered = useMemo(() => {
    const selectedFilter = filters.find((f) => f.id === selectedFilterId)?.func;
    const selectedSort = sorts.find((s) => s.id === selectedSortId)?.func;
    let result = items?.filter(selectedFilter ?? ((_item) => true));
    if (searchString && searchKeys?.length) {
      const searchStringFinal = searchString.trim().toLowerCase();
      result = result?.filter((item) =>
        searchKeys.some((key) =>
          String(item[key]).toLowerCase().includes(searchStringFinal),
        ),
      );
    }
    console.log('hi2');
    return selectedSort ? result?.sort(selectedSort) : result;
  }, [
    filters,
    items,
    searchKeys,
    searchString,
    selectedFilterId,
    selectedSortId,
    sorts,
  ]);

  return {
    selectedFilterId,
    setSelectedFilterId,
    selectedSortId,
    setSelectedSortId,
    searchString,
    setSearchString,
    itemsFiltered,
  };
}
