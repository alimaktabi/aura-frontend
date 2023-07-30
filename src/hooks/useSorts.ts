import { AuraRating } from 'types';
import { useMemo } from 'react';
import { FilterOrSortCategory } from 'hooks/useFilterAndSort.ts';

export enum AuraSortId {
  RecentEvaluation = 1,
  EvaluationScore = 2,
}

export type AuraSortOption<T> = {
  id: AuraSortId;
  title: string;
  defaultAscending: boolean;
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
        result[item.category].push(item);
      } else {
        result[item.category] = [item];
      }
    }

    return result;
  }, [sorts]);
}

export function useEvaluationSorts(sortIds: AuraSortId[]) {
  return useMemo(() => {
    const sorts: AuraSortOptions<AuraRating> = [
      {
        id: AuraSortId.RecentEvaluation,
        title: 'Recent',
        defaultAscending: true,
        category: FilterOrSortCategory.Default,
        func: (a, b) =>
          new Date(b.updatedAt ?? 0).getTime() -
          new Date(a.updatedAt ?? 0).getTime(),
      },
      {
        id: AuraSortId.EvaluationScore,
        title: 'Evaluation Score',
        defaultAscending: true,
        category: FilterOrSortCategory.Default,
        func: (a, b) => Number(b.rating) - Number(a.rating),
      },
      // TODO: handle this sort function
      // {
      //   id: 3,
      //   title: 'Player Score',
      //   category: FilterOrSortCategory.Default,
      //   func: (a, b) => Number(a.updatedAt) - Number(b.updatedAt),
      // },
    ];
    return sortIds
      .map((id) => sorts.find((f) => f.id === id))
      .filter((item) => item !== undefined) as AuraSortOptions<AuraRating>;
  }, [sortIds]);
}
