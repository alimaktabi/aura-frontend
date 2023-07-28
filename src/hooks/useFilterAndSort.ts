import { AuraFilterId, AuraFilterOption } from 'hooks/useFilters.ts';
import { AuraSortId, AuraSortOption } from 'hooks/useSorts.ts';
import { useCallback, useMemo, useState } from 'react';

export enum FilterOrSortCategory {
  Default = 'Default',
  YourEvaluation = 'Your Evaluation',
  Tier = 'Tier',
  ConnectionType = 'Connection Type',
}

export default function useFilterAndSort<T>(
  items: T[] | null | undefined,
  filters: AuraFilterOption<T>[],
  sorts: AuraSortOption<T>[],
  searchKeys?: (keyof T)[],
) {
  const [selectedFilterId, setSelectedFilterId] = useState<AuraFilterId | null>(
    null,
  );
  const toggleFilterById = useCallback(
    (filterId: AuraFilterId | null | undefined) => {
      if (filterId) {
        setSelectedFilterId((value) => (value === filterId ? null : filterId));
      }
    },
    [],
  );
  //TODO: handle ascending and decending sort
  const [selectedSortId, setSelectedSortId] = useState<AuraSortId | null>(null);
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
    toggleFilterById,
    selectedSortId,
    setSelectedSortId,
    searchString,
    setSearchString,
    itemsFiltered,
  };
}
