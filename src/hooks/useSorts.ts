import { FilterOrSortCategory } from 'hooks/useFilterAndSort';
import { useMemo } from 'react';
import { AuraInboundConnectionAndRatingData, BrightIdConnection } from 'types';

export enum AuraSortId {
  RecentEvaluation = 1,
  EvaluationScore,
  ConnectionLastUpdated,
  MostMutualConnections,
  ConnectionScore,
  ConnectionMostEvaluations,
  EvaluationPlayerScore,
}

export type AuraSortOption<T> = {
  id: AuraSortId;
  title: string;
  defaultAscending: boolean;
  justDefaultDirection?: boolean;
  ascendingLabel?: string;
  descendingLabel?: string;
  category: FilterOrSortCategory;
  func: (a: T, b: T) => number;
};

export type AuraSortOptions<T> = AuraSortOption<T>[];

export type AuraSelectedSort<T> = AuraSortOption<T> & {
  isReversed: boolean;
};

//TODO: use a generic type to merge this with useCategorizeAuraFilterOptions
export function useCategorizeAuraSortOptions<T>(sorts: AuraSortOptions<T>) {
  return useMemo(() => {
    const result: {
      [category in FilterOrSortCategory]?: AuraSortOptions<T>;
    } = {};

    for (const item of sorts) {
      if (result[item.category]) {
        // ? is added to fix build problem
        result[item.category]?.push(item);
      } else {
        result[item.category] = [item];
      }
    }

    return result;
  }, [sorts]);
}

export function useSubjectSorts(sortIds: AuraSortId[]) {
  return useMemo(() => {
    const sorts: AuraSortOptions<BrightIdConnection> = [
      {
        id: AuraSortId.ConnectionLastUpdated,
        title: 'Last Connection Update',
        defaultAscending: false,
        category: FilterOrSortCategory.Default,
        ascendingLabel: 'Oldest',
        descendingLabel: 'Newest',
        func: (a, b) =>
          new Date(b.timestamp ?? 0).getTime() -
          new Date(a.timestamp ?? 0).getTime(),
      },
      {
        id: AuraSortId.ConnectionMostEvaluations,
        title: 'Most Evaluations (Not Implemented)',
        defaultAscending: true,
        category: FilterOrSortCategory.Default,
        func: (_a, _b) => 1,
      },
      {
        id: AuraSortId.ConnectionScore,
        title: 'Score (Not Implemented)',
        defaultAscending: true,
        category: FilterOrSortCategory.Default,
        func: (_a, _b) => 1,
      },
      {
        id: AuraSortId.MostMutualConnections,
        title: 'Most Mutual Connections (Not Implemented)',
        defaultAscending: true,
        category: FilterOrSortCategory.Default,
        func: (_a, _b) => 1,
      },
    ];
    return sortIds
      .map((id) => sorts.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraSortOptions<BrightIdConnection>;
  }, [sortIds]);
}

export function useEvaluationSorts(sortIds: AuraSortId[]) {
  return useMemo(() => {
    const sorts: AuraSortOptions<AuraInboundConnectionAndRatingData> = [
      {
        id: AuraSortId.RecentEvaluation,
        title: 'Date',
        defaultAscending: false,
        justDefaultDirection: true,
        descendingLabel: 'Most Recent',
        category: FilterOrSortCategory.Default,
        func: (a, b) =>
          new Date(b.rating?.updatedAt ?? 0).getTime() -
          new Date(a.rating?.updatedAt ?? 0).getTime(),
      },
      {
        id: AuraSortId.EvaluationScore,
        title: 'Evaluation Score',
        defaultAscending: false,
        category: FilterOrSortCategory.Default,
        func: (a, b) => {
          return (
            Number(b.rating?.rating || '0') - Number(a.rating?.rating || '0')
          );
        },
      },
      {
        id: AuraSortId.EvaluationPlayerScore,
        title: 'Player Score (Not Implemented)',
        category: FilterOrSortCategory.Default,
        defaultAscending: true,
        func: (_a, _b) => 1,
      },
    ];
    return sortIds
      .map((id) => sorts.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraSortOptions<AuraInboundConnectionAndRatingData>;
  }, [sortIds]);
}
