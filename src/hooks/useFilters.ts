import { useSelector } from 'react-redux';
import { selectBrightIdBackup } from 'store/profile/selectors.ts';
import { AuraRating, BrightIdConnection } from 'types';
import { useMemo } from 'react';
import { FilterOrSortCategory } from 'hooks/useFilterAndSort.ts';

export enum AuraFilterId {
  EvaluationMutualConnections = 1,
  EvaluationPositiveEvaluations = 2,
  EvaluationNegativeEvaluations = 3,
  ConnectionMutualConnections = 4,
}

export type AuraFilterOption<T> = {
  id: AuraFilterId;
  title: string;
  category: FilterOrSortCategory;
  func: (item: T) => boolean;
};

export function useSubjectFilters(filterIds: AuraFilterId[]) {
  const brightIdBackup = useSelector(selectBrightIdBackup);
  return useMemo(() => {
    const filters: AuraFilterOption<BrightIdConnection>[] = [
      {
        id: AuraFilterId.ConnectionMutualConnections,
        category: FilterOrSortCategory.Default,
        title: 'Mutual Connections',
        func: (item) =>
          !!brightIdBackup?.connections.find((conn) => item.id === conn.id),
      },
    ];
    return filterIds
      .map((id) => filters.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraFilterOption<BrightIdConnection>[];
  }, [brightIdBackup?.connections, filterIds]);
}

export function useEvaluationFilters(filterIds: AuraFilterId[]) {
  const brightIdBackup = useSelector(selectBrightIdBackup);
  return useMemo(() => {
    const filters: AuraFilterOption<AuraRating>[] = [
      {
        id: AuraFilterId.EvaluationMutualConnections,
        category: FilterOrSortCategory.Default,
        title: 'Mutual Connections',
        func: (item) =>
          !!brightIdBackup?.connections.find(
            (conn) => item.fromBrightId === conn.id,
          ),
      },
      {
        id: AuraFilterId.EvaluationPositiveEvaluations,
        category: FilterOrSortCategory.Default,
        title: 'Positive Evaluations',
        func: (item) => Number(item.rating) > 0,
      },
      {
        id: AuraFilterId.EvaluationNegativeEvaluations,
        category: FilterOrSortCategory.Default,
        title: 'Negative Evaluations',
        func: (item) => Number(item.rating) < 0,
      },
    ];
    return filterIds
      .map((id) => filters.find((f) => f.id === id))
      .filter((item) => item !== undefined) as AuraFilterOption<AuraRating>[];
  }, [brightIdBackup?.connections, filterIds]);
}
