import useBrightIdBackupWithAuraConnectionData from 'hooks/useBrightIdBackupWithAuraConnectionData';
import { getAuraVerificationLevel } from 'hooks/useBrightIdVerificationData';
import { FilterOrSortCategory } from 'hooks/useFilterAndSort';
import { useOutboundRatings } from 'hooks/useSubjectRatings';
import { useMemo } from 'react';
import {
  AuraInboundConnectionAndRatingData,
  AuraNodeBrightIdConnectionWithBackupData,
  BrightIdConnection,
} from 'types';

export enum AuraFilterId {
  EvaluationMutualConnections = 1,
  EvaluationJustEvaluations,
  EvaluationJustConnections,
  EvaluationPositiveEvaluations,
  EvaluationNegativeEvaluations,
  ConnectionMutualConnections,
  ConnectionLevelNotYet,
  ConnectionLevelSybil,
  ConnectionLevelBronze,
  ConnectionLevelSilver,
  ConnectionLevelGold,
  ConnectionYourEvaluationPositive,
  ConnectionYourEvaluationNegative,
  ConnectionYourEvaluationNotEvaluatedYet,
  ConnectionConnectionTypeJustMet,
  ConnectionConnectionTypeAlreadyKnownPlus,
  EvaluationConnectionTypeSuspiciousOrReported,
  EvaluationConnectionTypeJustMet,
  EvaluationConnectionTypeAlreadyKnown,
  EvaluationConnectionTypeRecovery,
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
  const brightIdBackup = useBrightIdBackupWithAuraConnectionData();
  const { outboundRatings } = useOutboundRatings(brightIdBackup?.userData.id);
  return useMemo(() => {
    const filters: AuraFilterOptions<AuraNodeBrightIdConnectionWithBackupData> =
      [
        {
          id: AuraFilterId.ConnectionMutualConnections,
          category: FilterOrSortCategory.Default,
          title: 'Mutual Connections',
          func: (item) =>
            !!brightIdBackup?.connections.find((conn) => item.id === conn.id),
        },
        {
          id: AuraFilterId.ConnectionLevelNotYet,
          category: FilterOrSortCategory.Level,
          title: 'Not yet',
          func: (item) =>
            getAuraVerificationLevel(item.verifications) === 'Not yet',
        },
        {
          id: AuraFilterId.ConnectionLevelSybil,
          category: FilterOrSortCategory.Level,
          title: 'Sybil (Not implemented)',
          func: (_item) => true,
        },
        {
          id: AuraFilterId.ConnectionLevelBronze,
          category: FilterOrSortCategory.Level,
          title: 'Bronze',
          func: (item) =>
            getAuraVerificationLevel(item.verifications) === 'Bronze',
        },
        {
          id: AuraFilterId.ConnectionLevelSilver,
          category: FilterOrSortCategory.Level,
          title: 'Silver',
          func: (item) =>
            getAuraVerificationLevel(item.verifications) === 'Silver',
        },
        {
          id: AuraFilterId.ConnectionLevelGold,
          category: FilterOrSortCategory.Level,
          title: 'Gold',
          func: (item) =>
            getAuraVerificationLevel(item.verifications) === 'Gold',
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
  const brightIdBackup = useBrightIdBackupWithAuraConnectionData();
  return useMemo(() => {
    const filters: AuraFilterOptions<AuraInboundConnectionAndRatingData> = [
      {
        id: AuraFilterId.EvaluationMutualConnections,
        category: FilterOrSortCategory.Default,
        title: 'Mutual Connections',
        func: (item) =>
          !!brightIdBackup?.connections.find(
            (conn) => item.rating?.fromBrightId === conn.id,
          ),
      },
      {
        id: AuraFilterId.EvaluationJustEvaluations,
        category: FilterOrSortCategory.Default,
        title: 'Just Evaluations',
        func: (item) =>
          item.rating !== undefined && Number(item.rating.rating) !== 0,
      },
      {
        id: AuraFilterId.EvaluationJustConnections,
        category: FilterOrSortCategory.Default,
        title: 'Just Connections',
        func: (item) => item.rating === undefined,
      },
      {
        id: AuraFilterId.EvaluationPositiveEvaluations,
        category: FilterOrSortCategory.Default,
        title: 'Positive Evaluations',
        func: (item) =>
          item.rating !== undefined && Number(item.rating.rating) > 0,
      },
      {
        id: AuraFilterId.EvaluationNegativeEvaluations,
        category: FilterOrSortCategory.Default,
        title: 'Negative Evaluations',
        func: (item) =>
          item.rating !== undefined && Number(item.rating.rating) < 0,
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeSuspiciousOrReported,
        category: FilterOrSortCategory.ConnectionType,
        title: 'Suspicious | Reported',
        func: (item) =>
          item.inboundConnection?.level === 'suspicious' ||
          item.inboundConnection?.level === 'reported',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeJustMet,
        category: FilterOrSortCategory.ConnectionType,
        title: 'Just Met',
        func: (item) => item.inboundConnection?.level === 'just met',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeAlreadyKnown,
        category: FilterOrSortCategory.ConnectionType,
        title: 'Already Known',
        func: (item) => item.inboundConnection?.level === 'already known',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeRecovery,
        category: FilterOrSortCategory.ConnectionType,
        title: 'Recovery',
        func: (item) => item.inboundConnection?.level === 'recovery',
      },
    ];
    return filterIds
      .map((id) => filters.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraFilterOptions<AuraInboundConnectionAndRatingData>;
  }, [brightIdBackup?.connections, filterIds]);
}
