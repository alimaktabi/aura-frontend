import { AuraFilterId, AuraFilterOptions } from 'hooks/useFilters';
import { AuraSelectedSort, AuraSortId, AuraSortOptions } from 'hooks/useSorts';
import { useCallback, useEffect, useMemo, useState } from 'react';

export enum FilterOrSortCategory {
  Default = 'Default',
  YourEvaluation = 'Your Evaluation',
  Level = 'Level',
  ConnectionType = 'Connection Type',
}

export default function useFilterAndSort<T>(
  items: T[] | null,
  filters: AuraFilterOptions<T>,
  sorts: AuraSortOptions<T>,
  searchKeys?: (keyof T)[],
  localStoragePrefix?: string,
) {
  const [selectedFilterIds, setSelectedFilterIds] = useState<
    AuraFilterId[] | null
  >(null);
  const toggleFilterById = useCallback(
    (filterId: AuraFilterId | null, forceNewValue = false) => {
      setSelectedFilterIds((value) => {
        let newValue: AuraFilterId[] | null = [];
        if (filterId !== null) {
          if (forceNewValue) {
            newValue = [filterId];
          } else {
            newValue = value?.includes(filterId)
              ? value.filter((f) => f !== filterId)
              : [...(value || []), filterId];
          }
        }
        if (newValue.length === 0) {
          newValue = null;
        }
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
      const filterIds = localStorage.getItem(localStoragePrefix + 'FilterIds');
      try {
        if (filterIds && Array.isArray(JSON.parse(filterIds))) {
          setSelectedFilterIds(JSON.parse(filterIds));
        }
      } catch (e) {}
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
  const selectedFilters = useMemo(
    () =>
      selectedFilterIds
        ? filters.filter((f) => selectedFilterIds.includes(f.id))
        : null,
    [filters, selectedFilterIds],
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
    if (searchString && searchKeys?.length) {
      const searchStringFinal = searchString.trim().toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) =>
          String(item[key]).toLowerCase().includes(searchStringFinal),
        ),
      );
    } else if (selectedFilters) {
      selectedFilters.forEach((selectedFilters) => {
        result = items.filter(selectedFilters.func);
      });
    }
    if (selectedSort) {
      result.sort(selectedSort?.func);
    }
    return selectedSort?.isReversed ? result.reverse() : result;
  }, [items, searchString, searchKeys, selectedFilters, selectedSort]);

  const clearSort = useCallback(() => {
    setSelectedSort(null);
  }, [setSelectedSort]);

  const clearFilter = useCallback(() => {
    toggleFilterById(null);
  }, [toggleFilterById]);

  const clearSortAndFilter = useCallback(() => {
    clearSort();
    clearFilter();
  }, [clearFilter, clearSort]);

  return {
    selectedFilters,
    selectedSort,
    selectedFilterIds,
    toggleFilterById,
    selectedSortId,
    setSelectedSort,
    searchString,
    setSearchString,
    itemsOriginal: items,
    itemsFiltered,
    clearSort,
    clearFilter,
    clearSortAndFilter,
  };
}
