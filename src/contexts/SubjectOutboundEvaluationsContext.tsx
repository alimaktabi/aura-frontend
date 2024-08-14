import useFilterAndSort from 'hooks/useFilterAndSort';
import {
  AuraFilterId,
  AuraFilterOptions,
  useOutboundEvaluationFilters,
} from 'hooks/useFilters';
import {
  AuraSortId,
  AuraSortOptions,
  useOutboundEvaluationSorts,
} from 'hooks/useSorts';
import { useOutboundEvaluations } from 'hooks/useSubjectEvaluations';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectBrightIdBackup } from 'store/profile/selectors';
import { AuraOutboundConnectionAndRatingData } from 'types';

import { viewModeToViewAs } from '../constants';
import useViewMode from '../hooks/useViewMode';
import { EvaluationCategory } from '../types/dashboard';

type SubjectOutboundEvaluationsContextType = ReturnType<
  typeof useOutboundEvaluations
> & {
  subjectId: string;
} & ReturnType<typeof useFilterAndSort<AuraOutboundConnectionAndRatingData>> & {
    sorts: AuraSortOptions<AuraOutboundConnectionAndRatingData>;
    filters: AuraFilterOptions<AuraOutboundConnectionAndRatingData>;
  };

// Define the context
export const SubjectOutboundEvaluationsContext =
  createContext<SubjectOutboundEvaluationsContextType | null>(null);

interface ProviderProps {
  subjectId: string;
  children: ReactNode;
}

// Define the Provider component
export const SubjectOutboundEvaluationsContextProvider: React.FC<
  ProviderProps
> = ({ subjectId, children }) => {
  const useOutboundEvaluationsHookData = useOutboundEvaluations({ subjectId });
  const { ratings, connections } = useOutboundEvaluationsHookData;
  const filters = useOutboundEvaluationFilters(
    [
      AuraFilterId.EvaluationMutualConnections,
      AuraFilterId.EvaluationPositiveEvaluations,
      AuraFilterId.EvaluationNegativeEvaluations,
      AuraFilterId.EvaluationJustEvaluations,
      AuraFilterId.EvaluationJustConnections,
      AuraFilterId.EvaluationConnectionTypeSuspiciousOrReported,
      AuraFilterId.EvaluationConnectionTypeJustMet,
      AuraFilterId.EvaluationConnectionTypeAlreadyKnownPlus,
      AuraFilterId.EvaluationConnectionTypeRecovery,
      AuraFilterId.EvaluationTheirRecovery,
    ],
    subjectId,
  );

  const sorts = useOutboundEvaluationSorts([
    AuraSortId.RecentEvaluation,
    AuraSortId.EvaluationScore,
    AuraSortId.EvaluationPlayerScore,
  ]);

  const brightIdBackup = useSelector(selectBrightIdBackup);

  const outboundOpinions: AuraOutboundConnectionAndRatingData[] =
    useMemo(() => {
      const outboundConnections = connections;
      if (!outboundConnections || ratings === null || !brightIdBackup)
        return [];
      const outboundOpinions: AuraOutboundConnectionAndRatingData[] =
        ratings.map((r) => ({
          toSubjectId: r.toBrightId,
          rating: r,
          name: brightIdBackup.connections.find(
            (conn) => conn.id === r.fromBrightId,
          )?.name,
          outboundConnection: outboundConnections.find(
            (c) => c.id === r.fromBrightId,
          ),
        }));
      outboundConnections.forEach((c) => {
        const notRated = ratings.findIndex((r) => r.toBrightId === c.id) === -1;
        if (notRated) {
          outboundOpinions.push({
            toSubjectId: c.id,
            name: brightIdBackup.connections.find((conn) => conn.id === c.id)
              ?.name,
            outboundConnection: c,
          });
        }
      });
      return outboundOpinions;
    }, [brightIdBackup, ratings, connections]);
  const filterAndSortHookData = useFilterAndSort(
    outboundOpinions,
    filters,
    sorts,
    useMemo(() => ['toSubjectId', 'name'], []),
    'evaluationsList',
  );

  return (
    <SubjectOutboundEvaluationsContext.Provider
      value={{
        ...useOutboundEvaluationsHookData,
        ...filterAndSortHookData,
        sorts,
        filters,
        subjectId,
      }}
    >
      {children}
    </SubjectOutboundEvaluationsContext.Provider>
  );
};

export const useOutboundEvaluationsContext = (props: {
  subjectId: string;
  evaluationCategory?: EvaluationCategory;
}): SubjectOutboundEvaluationsContextType => {
  const context = useContext(SubjectOutboundEvaluationsContext);
  if (context === null) {
    throw new Error(
      'SubjectOutboundEvaluationsContext must be used within a SubjectOutboundEvaluationsContextProvider',
    );
  }
  if (context.subjectId !== props.subjectId) {
    throw new Error(
      'SubjectOutboundEvaluationsContextProvider for ' +
        props.subjectId +
        'not provided',
    );
  }
  const { currentViewMode } = useViewMode();
  const itemsFiltered = useMemo(
    () =>
      context.itemsFiltered
        ? context.itemsFiltered.filter(
            (o) =>
              o.rating === undefined ||
              o.rating.category ===
                (props?.evaluationCategory ??
                  viewModeToViewAs[currentViewMode]),
          )
        : null,
    [context.itemsFiltered, currentViewMode, props?.evaluationCategory],
  );
  return {
    ...context,
    itemsFiltered,
    ratings: useMemo(
      () =>
        context.ratings
          ? context.ratings.filter(
              (r) =>
                r.category ===
                (props?.evaluationCategory ??
                  viewModeToViewAs[currentViewMode]),
            )
          : null,
      [context.ratings, currentViewMode, props?.evaluationCategory],
    ),
  };
};
