import { SortCategoryId } from 'hooks/useFilterAndSort';
import { getAuraVerification } from 'hooks/useParseBrightIdVerificationData';
import { useMemo } from 'react';
import {
  AuraInboundConnectionAndRatingData,
  AuraNodeBrightIdConnectionWithBackupData,
  AuraOutboundConnectionAndRatingData,
  BrightIdConnection,
} from 'types';

import useBrightIdBackupWithAuraConnectionData from './useBrightIdBackupWithAuraConnectionData';
import { useOutboundEvaluations } from './useSubjectEvaluations';
import useViewMode from './useViewMode';

export enum AuraSortId {
  RecentEvaluation = 1,
  EvaluationScore,
  ConnectionLastUpdated,
  // MostMutualConnections,
  ConnectionScore,
  ConnectionRecentEvaluation,
  // ConnectionMostEvaluations,
  EvaluationPlayerScore,
}

export type AuraSortOption<T> = {
  id: AuraSortId;
  title: string;
  defaultAscending: boolean;
  justDefaultDirection?: boolean;
  ascendingLabel?: string;
  descendingLabel?: string;
  category: SortCategoryId;
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
      [category in SortCategoryId]?: AuraSortOptions<T>;
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
  const brightIdBackup = useBrightIdBackupWithAuraConnectionData();
  const { currentEvaluationCategory } = useViewMode();
  const { ratings: outboundRatings } = useOutboundEvaluations({
    subjectId: brightIdBackup?.userData.id,
    evaluationCategory: currentEvaluationCategory,
  });

  return useMemo(() => {
    const sorts: AuraSortOptions<AuraNodeBrightIdConnectionWithBackupData> = [
      {
        id: AuraSortId.ConnectionLastUpdated,
        title: 'Last Connected',
        defaultAscending: false,
        category: SortCategoryId.Default,
        ascendingLabel: 'Oldest',
        descendingLabel: 'Newest',
        func: (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0),
      },
      // {
      //   id: AuraSortId.ConnectionMostEvaluations,
      //   title: 'Most Evaluations (Not Implemented)',
      //   defaultAscending: true,
      //   category: SortCategoryId.Default,
      //   func: (_a, _b) => 1,
      // },
      {
        id: AuraSortId.ConnectionScore,
        title: 'Score',
        defaultAscending: true,
        category: SortCategoryId.Default,
        func: (a, b) =>
          (getAuraVerification(a.verifications, currentEvaluationCategory)
            ?.score ?? 0) -
          (getAuraVerification(b.verifications, currentEvaluationCategory)
            ?.score ?? 0),
      },
      {
        id: AuraSortId.ConnectionRecentEvaluation,
        title: 'Recently Evaluated',
        defaultAscending: false,
        category: SortCategoryId.Default,
        ascendingLabel: 'Oldest',
        descendingLabel: 'Newest',
        func: (a, b) =>
          (outboundRatings?.find((r) => r.toBrightId === b.id)?.timestamp ??
            0) -
          (outboundRatings?.find((r) => r.toBrightId === a.id)?.timestamp ?? 0),
      },
      // {
      //   id: AuraSortId.MostMutualConnections,
      //   title: 'Most Mutual Connections (Not Implemented)',
      //   defaultAscending: true,
      //   category: SortCategoryId.Default,
      //   func: (_a, _b) => 1,
      // },
    ];
    return sortIds
      .map((id) => sorts.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraSortOptions<BrightIdConnection>;
  }, [currentEvaluationCategory, outboundRatings, sortIds]);
}

export function useInboundEvaluationSorts(sortIds: AuraSortId[]) {
  return useMemo(() => {
    const sorts: AuraSortOptions<AuraInboundConnectionAndRatingData> = [
      {
        id: AuraSortId.RecentEvaluation,
        title: 'Date',
        defaultAscending: false,
        justDefaultDirection: true,
        descendingLabel: 'Most Recent',
        category: SortCategoryId.Default,
        func: (a, b) =>
          new Date(b.rating?.updatedAt ?? 0).getTime() -
          new Date(a.rating?.updatedAt ?? 0).getTime(),
      },
      {
        id: AuraSortId.EvaluationScore,
        title: 'Evaluation Score',
        defaultAscending: false,
        category: SortCategoryId.Default,
        func: (a, b) => {
          return (
            Number(b.rating?.rating || '0') - Number(a.rating?.rating || '0')
          );
        },
      },
      {
        id: AuraSortId.EvaluationPlayerScore,
        title: 'Player Score (Not Implemented)',
        category: SortCategoryId.Default,
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

export function useOutboundEvaluationSorts(sortIds: AuraSortId[]) {
  return useMemo(() => {
    const sorts: AuraSortOptions<AuraOutboundConnectionAndRatingData> = [
      {
        id: AuraSortId.RecentEvaluation,
        title: 'Date',
        defaultAscending: false,
        justDefaultDirection: true,
        descendingLabel: 'Most Recent',
        category: SortCategoryId.Default,
        func: (a, b) =>
          new Date(b.rating?.updatedAt ?? 0).getTime() -
          new Date(a.rating?.updatedAt ?? 0).getTime(),
      },
      {
        id: AuraSortId.EvaluationScore,
        title: 'Evaluation Score',
        defaultAscending: false,
        category: SortCategoryId.Default,
        func: (a, b) => {
          return (
            Number(b.rating?.rating || '0') - Number(a.rating?.rating || '0')
          );
        },
      },
      {
        id: AuraSortId.EvaluationPlayerScore,
        title: 'Player Score (Not Implemented)',
        category: SortCategoryId.Default,
        defaultAscending: true,
        func: (_a, _b) => 1,
      },
    ];
    return sortIds
      .map((id) => sorts.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraSortOptions<AuraOutboundConnectionAndRatingData>;
  }, [sortIds]);
}
