import { AuraFilterId, AuraFilterOptions } from 'hooks/useFilters';
import { AuraSelectedSort, AuraSortId, AuraSortOptions } from 'hooks/useSorts';
import { useCallback, useEffect, useMemo, useState } from 'react';

export enum FilterOrSortCategory {
  Default = 'Default',
  YourEvaluation = 'Your Evaluation',
  Level = 'Level (Not Implemented)',
  ConnectionType = 'Connection Type',
}

export default function useFilterAndSort<T>(
  items: T[] | null,
  filters: AuraFilterOptions<T>,
  sorts: AuraSortOptions<T>,
  searchKeys?: (keyof T)[],
  localStoragePrefix?: string,
) {
  const [selectedFilterId, setSelectedFilterId] = useState<AuraFilterId | null>(
    null,
  );
  const toggleFilterById = useCallback(
    (filterId: AuraFilterId | null, forceNewValue = false) => {
      setSelectedFilterId((value) => {
        const newValue = forceNewValue || value !== filterId ? filterId : null;
        if (localStoragePrefix) {
          if (newValue !== null) {
            localStorage.setItem(
              localStoragePrefix + 'FilterId',
              String(newValue),
            );
          } else {
            localStorage.removeItem(localStoragePrefix + 'FilterId');
          }
        }
        return newValue;
      });
    },
    [localStoragePrefix],
  );

  const [selectedSortId, setSelectedSortId] = useState<AuraSortId | null>(null);
  const [isSortReversed, setIsSortReversed] = useState(false);

  const setSelectedSort = useCallback(
    (id: AuraSortId | null, ascending?: boolean) => {
      let sortId: AuraSortId | null = null;
      let isSortReversed = false;
      if (id) {
        const obj = sorts.find((s) => s.id === id);
        if (obj) {
          sortId = id;
          if (ascending !== undefined) {
            isSortReversed = obj.defaultAscending !== ascending;
          } else {
            isSortReversed = false;
          }
        } else {
          return;
        }
      }
      if (localStoragePrefix) {
        if (sortId !== null) {
          localStorage.setItem(localStoragePrefix + 'SortId', String(sortId));
        } else {
          localStorage.removeItem(localStoragePrefix + 'SortId');
        }
        localStorage.setItem(
          localStoragePrefix + 'IsSortReversed',
          String(isSortReversed),
        );
      }
      setSelectedSortId(sortId);
      setIsSortReversed(isSortReversed);
    },
    [localStoragePrefix, sorts],
  );

  useEffect(() => {
    if (localStoragePrefix) {
      const filterId = localStorage.getItem(localStoragePrefix + 'FilterId');
      if (filterId) {
        setSelectedFilterId(Number(filterId));
      }
      const sortId = localStorage.getItem(localStoragePrefix + 'SortId');
      if (sortId) {
        setSelectedSortId(Number(sortId));
      }
      setIsSortReversed(
        localStorage.getItem(localStoragePrefix + 'IsSortReversed') === 'true',
      );
    }
  }, [localStoragePrefix]);

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

  const itemsFiltered: T[] | null = useMemo(() => {
    if (items === null) return null;
    let result = [...items];
    console.log(result[0]);
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
    console.log(selectedSort);
    console.log(result[0]);
    return selectedSort?.isReversed ? result.reverse() : result;
  }, [items, searchString, searchKeys, selectedFilter, selectedSort]);

  const clearSort = useCallback(() => {
    setSelectedSort(null);
  }, [setSelectedSort]);

  const clearSortAndFilter = useCallback(() => {
    clearSort();
    toggleFilterById(null);
  }, [clearSort, toggleFilterById]);

  return {
    selectedFilter,
    selectedSort,
    selectedFilterId,
    toggleFilterById,
    selectedSortId,
    setSelectedSort,
    searchString,
    setSearchString,
    itemsFiltered,
    clearSort,
    clearSortAndFilter,
  };
}
