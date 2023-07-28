import { AuraRating } from 'types';
import { useMemo } from 'react';

export enum AuraSort {
  RecentEvaluation = 1,
  EvaluationScore = 2,
}

export type AuraSortOption<T> = {
  id: AuraSort;
  title: string;
  func: (a: T, b: T) => number;
};

export function useEvaluationSorts(sortIds: AuraSort[]) {
  return useMemo(() => {
    const sorts: AuraSortOption<AuraRating>[] = [
      {
        id: AuraSort.RecentEvaluation,
        title: 'Recent',
        func: (a: AuraRating, b: AuraRating) =>
          new Date(b.updatedAt ?? 0).getTime() -
          new Date(a.updatedAt ?? 0).getTime(),
      },
      {
        id: AuraSort.EvaluationScore,
        title: 'Evaluation Score',
        func: (a: AuraRating, b: AuraRating) =>
          Number(b.rating) - Number(a.rating),
      },
      // TODO: handle this sort function
      // {
      //   id: 3,
      //   title: 'Player Score',
      //   func: (a: AuraRating, b: AuraRating) => Number(a.updatedAt) - Number(b.updatedAt),
      // },
    ];
    return sortIds
      .map((id) => sorts.find((f) => f.id === id))
      .filter((item) => item !== undefined) as AuraSortOption<AuraRating>[];
  }, [sortIds]);
}
