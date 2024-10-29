import useBrightIdBackupWithAuraConnectionData from 'hooks/useBrightIdBackupWithAuraConnectionData';
import { FilterCategoryId } from 'hooks/useFilterAndSort';
import { getAuraVerification } from 'hooks/useParseBrightIdVerificationData';
import { useOutboundEvaluations } from 'hooks/useSubjectEvaluations';
import { useMemo } from 'react';
import {
  AuraInboundConnectionAndRatingData,
  AuraNodeBrightIdConnectionWithBackupData,
  AuraOutboundConnectionAndRatingData,
  BrightIdConnection,
} from 'types';

import useViewMode from './useViewMode';

export enum AuraFilterId {
  EvaluationMutualConnections = 1,
  // EvaluationJustEvaluations,
  // EvaluationJustConnections,
  EvaluationPositiveEvaluations,
  EvaluationNegativeEvaluations,
  ConnectionMutualConnections,
  ConnectionYourEvaluationPositive,
  ConnectionYourEvaluationNegative,
  ConnectionYourEvaluationNotEvaluatedYet,
  ConnectionConnectionTypeSuspiciousOrReported,
  ConnectionConnectionTypeJustMet,
  ConnectionConnectionTypeAlreadyKnownPlus,
  ConnectionConnectionTypeRecovery,
  EvaluationConnectionTypeSuspiciousOrReported,
  EvaluationConnectionTypeJustMet,
  EvaluationConnectionTypeAlreadyKnownPlus,
  EvaluationConnectionTypeRecovery,
  EvaluationTheirRecovery,
  ConnectionLevelZero = 1000,
  ConnectionLevelNegative,
  ConnectionLevelOne,
  ConnectionLevelTwo,
  ConnectionLevelThree,
  ConnectionLevelFour,
}

export type AuraFilterOption<T> = {
  id: AuraFilterId;
  title: string;
  category: FilterCategoryId;
  func: (item: T) => boolean;
};

export type AuraFilterOptions<T> = AuraFilterOption<T>[];

export function useCategorizeAuraFilterOptions<T>(
  filters: AuraFilterOptions<T>,
) {
  return useMemo(() => {
    const result: {
      [category in FilterCategoryId]?: AuraFilterOptions<T>;
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
  const { ratings: outboundRatings } = useOutboundEvaluations({
    subjectId: brightIdBackup?.userData.id,
  });
  const { currentEvaluationCategory } = useViewMode();
  return useMemo(() => {
    const filters: AuraFilterOptions<AuraNodeBrightIdConnectionWithBackupData> =
      [
        {
          id: AuraFilterId.ConnectionMutualConnections,
          category: FilterCategoryId.Default,
          title: 'Mutual Connections',
          func: (item) =>
            !!brightIdBackup?.connections.find((conn) => item.id === conn.id),
        },
        {
          id: AuraFilterId.ConnectionLevelNegative,
          category: FilterCategoryId.Level,
          title: 'Negative',
          func: (_item) => true,
        },
        {
          id: AuraFilterId.ConnectionLevelZero,
          category: FilterCategoryId.Level,
          title: 'Level 0',
          func: (item) =>
            !getAuraVerification(item.verifications, currentEvaluationCategory)
              ?.level,
        },
        {
          id: AuraFilterId.ConnectionLevelOne,
          category: FilterCategoryId.Level,
          title: 'Level 1',
          func: (item) =>
            getAuraVerification(item.verifications, currentEvaluationCategory)
              ?.level === 1,
        },
        {
          id: AuraFilterId.ConnectionLevelTwo,
          category: FilterCategoryId.Level,
          title: 'Level 2',
          func: (item) =>
            getAuraVerification(item.verifications, currentEvaluationCategory)
              ?.level === 2,
        },
        {
          id: AuraFilterId.ConnectionLevelThree,
          category: FilterCategoryId.Level,
          title: 'Level 3',
          func: (item) =>
            getAuraVerification(item.verifications, currentEvaluationCategory)
              ?.level === 3,
        },
        {
          id: AuraFilterId.ConnectionLevelFour,
          category: FilterCategoryId.Level,
          title: 'Level 4',
          func: (item) =>
            getAuraVerification(item.verifications, currentEvaluationCategory)
              ?.level === 4,
        },
        {
          id: AuraFilterId.ConnectionYourEvaluationPositive,
          category: FilterCategoryId.YourEvaluation,
          title: 'Positive',
          func: (item) => {
            const rating = outboundRatings?.find(
              (r) =>
                r.toBrightId === item.id &&
                r.category === currentEvaluationCategory,
            )?.rating;
            if (rating !== undefined) {
              return Number(rating) > 0;
            }
            return false;
          },
        },
        {
          id: AuraFilterId.ConnectionYourEvaluationNegative,
          category: FilterCategoryId.YourEvaluation,
          title: 'Negative',
          func: (item) => {
            const rating = outboundRatings?.find(
              (r) =>
                r.toBrightId === item.id &&
                r.category === currentEvaluationCategory,
            )?.rating;
            if (rating !== undefined) {
              return Number(rating) < 0;
            }
            return false;
          },
        },
        {
          id: AuraFilterId.ConnectionYourEvaluationNotEvaluatedYet,
          category: FilterCategoryId.YourEvaluation,
          title: 'Not Evaluated Yet',
          func: (item) => {
            const rating = outboundRatings?.find(
              (r) =>
                r.toBrightId === item.id &&
                r.category === currentEvaluationCategory,
            )?.rating;
            return !rating || !Number(rating);
          },
        },
        {
          id: AuraFilterId.ConnectionConnectionTypeSuspiciousOrReported,
          category: FilterCategoryId.ConnectionType,
          title: 'Suspicious | Reported',
          func: (item) =>
            item.level === 'suspicious' || item.level === 'reported',
        },
        {
          id: AuraFilterId.ConnectionConnectionTypeJustMet,
          category: FilterCategoryId.ConnectionType,
          title: 'Just Met',
          func: (item) => item.level === 'just met',
        },
        {
          id: AuraFilterId.ConnectionConnectionTypeAlreadyKnownPlus,
          category: FilterCategoryId.ConnectionType,
          title: 'Already Known+',
          func: (item) =>
            item.level === 'already known' || item.level === 'recovery',
        },
        {
          id: AuraFilterId.ConnectionConnectionTypeRecovery,
          category: FilterCategoryId.ConnectionType,
          title: 'Recovery',
          func: (item) => item.level === 'recovery',
        },
      ];
    return filterIds
      .map((id) => filters.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraFilterOptions<BrightIdConnection>;
  }, [
    brightIdBackup?.connections,
    currentEvaluationCategory,
    filterIds,
    outboundRatings,
  ]);
}

export function useInboundEvaluationsFilters(
  filterIds: AuraFilterId[],
  subjectId?: string,
) {
  return useMemo(() => {
    const filters: AuraFilterOptions<AuraInboundConnectionAndRatingData> = [
      // {
      //   id: AuraFilterId.EvaluationMutualConnections,
      //   category: FilterCategoryId.Default,
      //   title: 'Mutual Connections',
      //   func: (item) =>
      //     !!brightIdBackup?.connections.find(
      //       (conn) =>
      //         item.rating?.fromBrightId === conn.id ||
      //         item.inboundConnection?.id === conn.id,
      //     ),
      // },
      {
        id: AuraFilterId.EvaluationPositiveEvaluations,
        category: FilterCategoryId.Default,
        title: 'Positive Evaluations',
        func: (item) =>
          item.rating !== undefined && Number(item.rating.rating) > 0,
      },
      {
        id: AuraFilterId.EvaluationNegativeEvaluations,
        category: FilterCategoryId.Default,
        title: 'Negative Evaluations',
        func: (item) =>
          item.rating !== undefined && Number(item.rating.rating) < 0,
      },
    ];
    return filterIds
      .map((id) => filters.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraFilterOptions<AuraInboundConnectionAndRatingData>;
  }, [filterIds]);
}

export function useInboundConnectionsFilters(
  filterIds: AuraFilterId[],
  subjectId?: string,
) {
  const brightIdBackup = useBrightIdBackupWithAuraConnectionData();
  const { connections } = useOutboundEvaluations({ subjectId });
  return useMemo(() => {
    const filters: AuraFilterOptions<AuraInboundConnectionAndRatingData> = [
      {
        id: AuraFilterId.EvaluationMutualConnections,
        category: FilterCategoryId.Default,
        title: 'Mutual Connections',
        func: (item) =>
          !!brightIdBackup?.connections.find(
            (conn) =>
              item.rating?.fromBrightId === conn.id ||
              item.inboundConnection?.id === conn.id,
          ),
      },
      {
        id: AuraFilterId.EvaluationTheirRecovery,
        category: FilterCategoryId.Default,
        title: 'Their Recovery',
        func: (item) =>
          connections?.find((c) => c.id === item.fromSubjectId)?.level ===
          'recovery',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeSuspiciousOrReported,
        category: FilterCategoryId.ConnectionType,
        title: 'Suspicious | Reported',
        func: (item) =>
          item.inboundConnection?.level === 'suspicious' ||
          item.inboundConnection?.level === 'reported',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeJustMet,
        category: FilterCategoryId.ConnectionType,
        title: 'Just Met',
        func: (item) => item.inboundConnection?.level === 'just met',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeAlreadyKnownPlus,
        category: FilterCategoryId.ConnectionType,
        title: 'Already Known +',
        func: (item) =>
          item.inboundConnection?.level === 'already known' ||
          item.inboundConnection?.level === 'recovery',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeRecovery,
        category: FilterCategoryId.ConnectionType,
        title: 'Recovery',
        func: (item) => item.inboundConnection?.level === 'recovery',
      },
    ];
    return filterIds
      .map((id) => filters.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraFilterOptions<AuraInboundConnectionAndRatingData>;
  }, [brightIdBackup?.connections, filterIds, connections]);
}

export function useOutboundEvaluationFilters(
  filterIds: AuraFilterId[],
  subjectId?: string,
) {
  const brightIdBackup = useBrightIdBackupWithAuraConnectionData();
  const { connections } = useOutboundEvaluations({ subjectId });
  return useMemo(() => {
    const filters: AuraFilterOptions<AuraOutboundConnectionAndRatingData> = [
      {
        id: AuraFilterId.EvaluationMutualConnections,
        category: FilterCategoryId.Default,
        title: 'Mutual Connections',
        func: (item) =>
          !!brightIdBackup?.connections.find(
            (conn) =>
              item.rating?.toBrightId === conn.id ||
              item.outboundConnection?.id === conn.id,
          ),
      },
      // {
      //   id: AuraFilterId.EvaluationJustEvaluations,
      //   category: FilterCategoryId.Default,
      //   title: 'Just Evaluations',
      //   func: (item) =>
      //     item.rating !== undefined && Number(item.rating.rating) !== 0,
      // },
      // {
      //   id: AuraFilterId.EvaluationJustConnections,
      //   category: FilterCategoryId.Default,
      //   title: 'Just Connections',
      //   func: (item) => item.rating === undefined,
      // },
      {
        id: AuraFilterId.EvaluationPositiveEvaluations,
        category: FilterCategoryId.Default,
        title: 'Positive Evaluations',
        func: (item) =>
          item.rating !== undefined && Number(item.rating.rating) > 0,
      },
      {
        id: AuraFilterId.EvaluationNegativeEvaluations,
        category: FilterCategoryId.Default,
        title: 'Negative Evaluations',
        func: (item) =>
          item.rating !== undefined && Number(item.rating.rating) < 0,
      },
      {
        id: AuraFilterId.EvaluationTheirRecovery,
        category: FilterCategoryId.Default,
        title: 'Their Recovery',
        func: (item) =>
          connections?.find((c) => c.id === item.toSubjectId)?.level ===
          'recovery',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeSuspiciousOrReported,
        category: FilterCategoryId.ConnectionType,
        title: 'Suspicious | Reported',
        func: (item) =>
          item.outboundConnection?.level === 'suspicious' ||
          item.outboundConnection?.level === 'reported',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeJustMet,
        category: FilterCategoryId.ConnectionType,
        title: 'Just Met',
        func: (item) => item.outboundConnection?.level === 'just met',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeAlreadyKnownPlus,
        category: FilterCategoryId.ConnectionType,
        title: 'Already Known',
        func: (item) =>
          item.outboundConnection?.level === 'already known' ||
          item.outboundConnection?.level === 'recovery',
      },
      {
        id: AuraFilterId.EvaluationConnectionTypeRecovery,
        category: FilterCategoryId.ConnectionType,
        title: 'Recovery',
        func: (item) => item.outboundConnection?.level === 'recovery',
      },
    ];
    return filterIds
      .map((id) => filters.find((f) => f.id === id))
      .filter(
        (item) => item !== undefined,
      ) as AuraFilterOptions<AuraOutboundConnectionAndRatingData>;
  }, [brightIdBackup?.connections, filterIds, connections]);
}
