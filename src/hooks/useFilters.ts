import { useSelector } from 'react-redux';
import { selectBrightIdBackup } from 'store/profile/selectors.ts';
import { AuraRating, BrightIdConnection } from 'types';
import { useMemo } from 'react';
import { FilterOrSortCategory } from 'hooks/useFilterAndSort.ts';
import { useOutboundRatings } from 'hooks/useSubjectRatings.ts';

export enum AuraFilterId {
  EvaluationMutualConnections = 1,
  EvaluationPositiveEvaluations,
  EvaluationNegativeEvaluations,
  ConnectionMutualConnections,
  ConnectionTierNotYet,
  ConnectionTierSybil,
  ConnectionTierBronze,
  ConnectionTierSilver,
  ConnectionTierGold,
  ConnectionYourEvaluationPositive,
  ConnectionYourEvaluationNegative,
  ConnectionYourEvaluationNotEvaluatedYet,
  ConnectionConnectionTypeJustMet,
  ConnectionConnectionTypeAlreadyKnownPlus,
}

export type AuraFilterOption<T> = {
  id: AuraFilterId;
  title: string;
  category: FilterOrSortCategory;
  func: (item: T) => boolean;
};

export type AuraFilterOptions<T> = AuraFilterOption<T>[];

export function useCategorizeAuraFilterOptions<T>(
  filters: AuraFilterOptions<T>,
) {
  return useMemo(() => {
    const result: {
      [category in FilterOrSortCategory]?: AuraFilterOptions<T>;
    } = {};

    for (const item of filters) {
      if (result[item.category]) {
        // ? is added to fix build problem
        result[item.category]?.push(item);
      } else {
        result[item.category] = [item];
      }
    }

    return result;
  }, [filters]);
}

export function useSubjectFilters(filterIds: AuraFilterId[]) {
  const brightIdBackup = useSelector(selectBrightIdBackup);
  const { outboundRatings } = useOutboundRatings(brightIdBackup?.userData.id);
  return useMemo(() => {
    const filters: AuraFilterOptions<BrightIdConnection> = [
      {
        id: AuraFilterId.ConnectionMutualConnections,
        category: FilterOrSortCategory.Default,
        title: 'Mutual Connections',
        func: (item) =>
          !!brightIdBackup?.connections.find((conn) => item.id === conn.id),
      },
      {
        id: AuraFilterId.ConnectionTierNotYet,
        category: FilterOrSortCategory.Tier,
        title: 'Not yet',
        func: (_item) => true,
      },
      {
        id: AuraFilterId.ConnectionTierSybil,
        category: FilterOrSortCategory.Tier,
        title: 'Sybil',
        func: (_item) => true,
      },
      {
        id: AuraFilterId.ConnectionTierBronze,
        category: FilterOrSortCategory.Tier,
        title: 'Bronze',
        func: (_item) => true,
      },
      {
        id: AuraFilterId.ConnectionTierSilver,
        category: FilterOrSortCategory.Tier,
        title: 'Silver',
        func: (_item) => true,
      },
      {
        id: AuraFilterId.ConnectionTierGold,
        category: FilterOrSortCategory.Tier,
        title: 'Gold',
        func: (_item) => true,
      },
      {
        id: AuraFilterId.ConnectionYourEvaluationPositive,
        category: FilterOrSortCategory.YourEvaluation,
        title: 'Positive',
        func: (item) => {
          const rating = outboundRatings?.find(
            (r) => r.toBrightId === item.id,
          )?.rating;
          if (rating !== undefined) {
            return Number(rating) > 0;
          }
          return false;
        },
      },
      {
        id: AuraFilterId.ConnectionYourEvaluationNegative,
        category: FilterOrSortCategory.YourEvaluation,
        title: 'Negative',
        func: (item) => {
          const rating = outboundRatings?.find(
            (r) => r.toBrightId === item.id,
          )?.rating;
          if (rating !== undefined) {
            return Number(rating) < 0;
          }
          return false;
        },
      },
      {
        id: AuraFilterId.ConnectionYourEvaluationNotEvaluatedYet,
        category: FilterOrSortCategory.YourEvaluation,
        title: 'Not Evaluated Yet',
        func: (item) => {
          const rating = outboundRatings?.find(
            (r) => r.toBrightId === item.id,
          )?.rating;
          return !rating || !Number(rating);
        },
      },
      {
        id: AuraFilterId.ConnectionConnectionTypeJustMet,
        category: FilterOrSortCategory.ConnectionType,
        title: 'Just Met',
        func: (item) => item.level === 'just met',
      },
      {
        id: AuraFilterId.ConnectionConnectionTypeAlreadyKnownPlus,
        category: FilterOrSortCategory.ConnectionType,
        title: 'Already Known+',
        func: (item) =>
          item.level === 'already known' || item.level === 'recovery',
      },
    ];
    return filterIds
      .map((id) => filters.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraFilterOptions<BrightIdConnection>;
  }, [brightIdBackup?.connections, filterIds, outboundRatings]);
}

export function useEvaluationFilters(filterIds: AuraFilterId[]) {
  const brightIdBackup = useSelector(selectBrightIdBackup);
  return useMemo(() => {
    const filters: AuraFilterOptions<AuraRating> = [
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
      .filter((item) => item !== undefined) as AuraFilterOptions<AuraRating>;
  }, [brightIdBackup?.connections, filterIds]);
}
