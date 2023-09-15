import { AuraFilterId, AuraFilterOptions } from 'hooks/useFilters.ts';
import {
  AuraSelectedSort,
  AuraSortId,
  AuraSortOptions,
} from 'hooks/useSorts.ts';
import { useCallback, useMemo, useState } from 'react';

export enum FilterOrSortCategory {
  Default = 'Default',
  YourEvaluation = 'Your Evaluation',
  Tier = 'Tier (Not Implemented)',
  ConnectionType = 'Connection Type',
}

export default function useFilterAndSort<T>(
  items: T[] | null,
  filters: AuraFilterOptions<T>,
  sorts: AuraSortOptions<T>,
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

  const [selectedSortId, setSelectedSortId] = useState<AuraSortId | null>(null);
  const [isSortReversed, setIsSortReversed] = useState(false);
  const [searchString, setSearchString] = useState('');
  const selectedFilter = useMemo(
    () => filters.find((f) => f.id === selectedFilterId),
    [filters, selectedFilterId],
  );
  const selectedSort: AuraSelectedSort<T> | null = useMemo(() => {
    const obj = sorts.find((s) => s.id === selectedSortId);
    if (obj) {
      return {
        ...obj,
        isReversed: isSortReversed,
      };
    }
    return null;
  }, [isSortReversed, selectedSortId, sorts]);

  const setSelectedSort = useCallback(
    (id: AuraSortId, ascending?: boolean) => {
      const obj = sorts.find((s) => s.id === id);
      if (obj) {
        setSelectedSortId(id);
        if (ascending !== undefined) {
          setIsSortReversed(obj.defaultAscending != ascending);
        } else {
          setIsSortReversed(false);
        }
      }
    },
    [sorts],
  );

  const itemsFiltered: T[] | null = useMemo(() => {
    if (items === null) return null;
    let result = [...items];
    if (searchString && searchKeys?.length) {
      const searchStringFinal = searchString.trim().toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) =>
          String(item[key]).toLowerCase().includes(searchStringFinal),
        ),
      );
    } else if (selectedFilter) {
      result = items.filter(selectedFilter.func);
    }
    if (selectedSort) {
      result.sort(selectedSort?.func);
    }
    return selectedSort?.isReversed ? result.reverse() : result;
  }, [items, searchString, searchKeys, selectedFilter, selectedSort]);

  const clearSort = useCallback(() => {
    setSelectedSortId(null);
    setIsSortReversed(false);
  }, []);

  const clearSortAndFilter = useCallback(() => {
    clearSort();
    setSelectedFilterId(null);
  }, [clearSort]);

  return {
    selectedFilter,
    selectedSort,
    selectedFilterId,
    setSelectedFilterId,
    toggleFilterById,
    selectedSortId,
    setSelectedSort,
    setSelectedSortId,
    searchString,
    setSearchString,
    itemsFiltered,
    clearSort,
    clearSortAndFilter,
  };
}
