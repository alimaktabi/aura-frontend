import useFilterAndSort from 'hooks/useFilterAndSort';
import {
  AuraFilterId,
  AuraFilterOptions,
  useInboundEvaluationFilters,
} from 'hooks/useFilters';
import {
  AuraSortId,
  AuraSortOptions,
  useInboundEvaluationSorts,
} from 'hooks/useSorts';
import { useInboundEvaluations } from 'hooks/useSubjectEvaluations';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthData, selectBrightIdBackup } from 'store/profile/selectors';
import { AuraInboundConnectionAndRatingData, AuraRating } from 'types';

import { viewModeToViewAs } from '../constants';
import useViewMode from '../hooks/useViewMode';
import { EvaluationCategory } from '../types/dashboard';

type SubjectInboundEvaluationsContextType = ReturnType<
  typeof useInboundEvaluations
> & {
  subjectId: string;
} & ReturnType<typeof useFilterAndSort<AuraInboundConnectionAndRatingData>> & {
    sorts: AuraSortOptions<AuraInboundConnectionAndRatingData>;
    filters: AuraFilterOptions<AuraInboundConnectionAndRatingData>;
  };
// Define the context
export const SubjectInboundEvaluationsContext =
  createContext<SubjectInboundEvaluationsContextType | null>(null);

interface ProviderProps {
  subjectId: string;
  children: ReactNode;
}

// Define the Provider component
export const SubjectInboundEvaluationsContextProvider: React.FC<
  ProviderProps
> = ({ subjectId, children }) => {
  const useSubjectInboundEvaluationsHookData = useInboundEvaluations({
    subjectId,
  });
  const { ratings, connections } = useSubjectInboundEvaluationsHookData;
  const filters = useInboundEvaluationFilters(
    [
      AuraFilterId.EvaluationMutualConnections,
      AuraFilterId.EvaluationPositiveEvaluations,
      AuraFilterId.EvaluationNegativeEvaluations,
      AuraFilterId.EvaluationJustEvaluations,
      AuraFilterId.EvaluationJustConnections,
      AuraFilterId.EvaluationConnectionTypeSuspiciousOrReported,
      AuraFilterId.EvaluationConnectionTypeJustMet,
      AuraFilterId.EvaluationConnectionTypeAlreadyKnown,
      AuraFilterId.EvaluationConnectionTypeRecovery,
      AuraFilterId.EvaluationTheirRecovery,
    ],
    subjectId,
  );

  const sorts = useInboundEvaluationSorts([
    AuraSortId.RecentEvaluation,
    AuraSortId.EvaluationScore,
    AuraSortId.EvaluationPlayerScore,
  ]);

  const brightIdBackup = useSelector(selectBrightIdBackup);

  const inboundOpinions: AuraInboundConnectionAndRatingData[] = useMemo(() => {
    const inboundConnections = connections;
    if (!inboundConnections || ratings === null || !brightIdBackup) return [];
    const inboundOpinions: AuraInboundConnectionAndRatingData[] = ratings.map(
      (r) => ({
        fromSubjectId: r.fromBrightId,
        rating: r,
        name: brightIdBackup.connections.find(
          (conn) => conn.id === r.fromBrightId,
        )?.name,
        inboundConnection: inboundConnections.find(
          (c) => c.id === r.fromBrightId,
        ),
      }),
    );
    inboundConnections.forEach((c) => {
      const notRated = ratings.findIndex((r) => r.fromBrightId === c.id) === -1;
      if (notRated) {
        inboundOpinions.push({
          fromSubjectId: c.id,
          name: brightIdBackup.connections.find((conn) => conn.id === c.id)
            ?.name,
          inboundConnection: c,
        });
      }
    });
    return inboundOpinions;
  }, [brightIdBackup, ratings, connections]);

  const filterAndSortHookData = useFilterAndSort(
    inboundOpinions,
    filters,
    sorts,
    useMemo(() => ['fromSubjectId', 'name'], []),
    'evaluationsList',
  );

  return (
    <SubjectInboundEvaluationsContext.Provider
      value={{
        ...useSubjectInboundEvaluationsHookData,
        ...filterAndSortHookData,
        sorts,
        filters,
        subjectId,
      }}
    >
      {children}
    </SubjectInboundEvaluationsContext.Provider>
  );
};

export const useSubjectInboundEvaluationsContext = (props: {
  subjectId: string;
  evaluationCategory?: EvaluationCategory;
}): SubjectInboundEvaluationsContextType & {
  myRatingObject: AuraRating | undefined;
} => {
  const context = useContext(SubjectInboundEvaluationsContext);
  if (context === null) {
    throw new Error(
      'SubjectInboundEvaluationsContext must be used within a SubjectInboundEvaluationsContextProvider',
    );
  }
  if (context.subjectId !== props.subjectId) {
    throw new Error(
      'SubjectInboundEvaluationsContextProvider for ' +
        props.subjectId +
        'not provided',
    );
  }

  const { currentViewMode } = useViewMode();
  const ratings = useMemo(
    () =>
      context.ratings
        ? context.ratings.filter(
            (r) =>
              r.category ===
              (props?.evaluationCategory ?? viewModeToViewAs[currentViewMode]),
          )
        : null,
    [context.ratings, currentViewMode, props?.evaluationCategory],
  );
  const authData = useSelector(selectAuthData);
  const myRatingObject = useMemo(() => {
    if (!authData) return undefined;
    return ratings?.find((r) => r.fromBrightId === authData.brightId);
  }, [authData, ratings]);

  const inboundPositiveRatingsCount = useMemo(
    () => ratings?.filter((r) => Number(r.rating) > 0).length,
    [ratings],
  );
  const inboundNegativeRatingsCount = useMemo(
    () => ratings?.filter((r) => Number(r.rating) < 0).length,
    [ratings],
  );
  const inboundRatingsStatsString = useMemo(() => {
    return `${inboundPositiveRatingsCount ?? '...'} Pos / ${
      inboundNegativeRatingsCount ?? '...'
    } Neg`;
  }, [inboundNegativeRatingsCount, inboundPositiveRatingsCount]);

  return {
    ...context,
    itemsFiltered: useMemo(
      () =>
        context.itemsFiltered
          ? context.itemsFiltered.filter(
              (o) =>
                o.rating === undefined ||
                o.rating?.category ===
                  (props?.evaluationCategory ??
                    viewModeToViewAs[currentViewMode]),
            )
          : null,
      [context.itemsFiltered, currentViewMode, props?.evaluationCategory],
    ),
    ratings,
    inboundPositiveRatingsCount,
    inboundNegativeRatingsCount,
    inboundRatingsStatsString,
    myRatingObject,
  };
};
