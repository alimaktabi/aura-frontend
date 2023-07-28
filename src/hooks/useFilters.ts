import { useSelector } from 'react-redux';
import { selectBrightIdBackup } from 'store/profile/selectors.ts';
import { AuraRating } from 'types';
import { useMemo } from 'react';

export enum AuraFilter {
  EvaluationMutualConnections = 1,
  PositiveEvaluations = 2,
  NegativeEvaluations = 3,
}

export type AuraFilterOption<T> = {
  id: AuraFilter;
  title: string;
  func: (item: T) => boolean;
};

export function useEvaluationFilters(filterIds: AuraFilter[]) {
  const brightIdBackup = useSelector(selectBrightIdBackup);
  return useMemo(() => {
    const filters: AuraFilterOption<AuraRating>[] = [
      {
        id: AuraFilter.EvaluationMutualConnections,
        title: 'Mutual connections',
        func: (item: AuraRating) =>
          !!brightIdBackup?.connections.find(
            (conn) => item.fromBrightId === conn.id,
          ),
      },
      {
        id: AuraFilter.PositiveEvaluations,
        title: 'Positive Evaluations',
        func: (item: AuraRating) => Number(item.rating) > 0,
      },
      {
        id: AuraFilter.NegativeEvaluations,
        title: 'Negative Evaluations',
        func: (item: AuraRating) => Number(item.rating) < 0,
      },
    ];
    return filterIds
      .map((id) => filters.find((f) => f.id === id))
      .filter((item) => item !== undefined) as AuraFilterOption<AuraRating>[];
  }, [brightIdBackup?.connections, filterIds]);
}
