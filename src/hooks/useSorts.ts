import { AuraRating } from 'types';
import { useMemo } from 'react';

export enum AuraSortId {
  RecentEvaluation = 1,
  EvaluationScore = 2,
}

export type AuraSortOption<T> = {
  id: AuraSortId;
  title: string;
  func: (a: T, b: T) => number;
};

export function useEvaluationSorts(sortIds: AuraSortId[]) {
  return useMemo(() => {
    const sorts: AuraSortOption<AuraRating>[] = [
      {
        id: AuraSortId.RecentEvaluation,
        title: 'Recent',
        func: (a, b) =>
          new Date(b.updatedAt ?? 0).getTime() -
          new Date(a.updatedAt ?? 0).getTime(),
      },
      {
        id: AuraSortId.EvaluationScore,
        title: 'Evaluation Score',
        func: (a, b) => Number(b.rating) - Number(a.rating),
      },
      // TODO: handle this sort function
      // {
      //   id: 3,
      //   title: 'Player Score',
      //   func: (a, b) => Number(a.updatedAt) - Number(b.updatedAt),
      // },
    ];
    return sortIds
      .map((id) => sorts.find((f) => f.id === id))
      .filter((item) => item !== undefined) as AuraSortOption<AuraRating>[];
  }, [sortIds]);
}
