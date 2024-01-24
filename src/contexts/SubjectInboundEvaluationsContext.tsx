import useFilterAndSort from 'hooks/useFilterAndSort';
import {
  AuraFilterId,
  AuraFilterOptions,
  useEvaluationFilters,
} from 'hooks/useFilters';
import {
  AuraSortId,
  AuraSortOptions,
  useEvaluationSorts,
} from 'hooks/useSorts';
import { useSubjectConnections } from 'hooks/useSubjectConnections';
import { useSubjectInboundEvaluations } from 'hooks/useSubjectInboundEvaluations';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthData, selectBrightIdBackup } from 'store/profile/selectors';
import { AuraInboundConnectionAndRatingData, AuraRating } from 'types';

// Define the context
export const SubjectInboundEvaluationsContext = createContext<
  | (ReturnType<typeof useSubjectInboundEvaluations> & {
      subjectId: string;
    } & ReturnType<
        typeof useFilterAndSort<AuraInboundConnectionAndRatingData>
      > & {
        sorts: AuraSortOptions<AuraInboundConnectionAndRatingData>;
        filters: AuraFilterOptions<AuraInboundConnectionAndRatingData>;
        myRatingObject: AuraRating | undefined;
      })
  | null
>(null);

interface ProviderProps {
  subjectId: string;
  children: ReactNode;
}

// Define the Provider component
export const SubjectInboundEvaluationsContextProvider: React.FC<
  ProviderProps
> = ({ subjectId, children }) => {
  const useSubjectInboundEvaluationsHookData =
    useSubjectInboundEvaluations(subjectId);
  const { inboundRatings } = useSubjectInboundEvaluationsHookData;
  const filters = useEvaluationFilters([
    AuraFilterId.EvaluationMutualConnections,
    AuraFilterId.EvaluationPositiveEvaluations,
    AuraFilterId.EvaluationNegativeEvaluations,
    AuraFilterId.EvaluationJustEvaluations,
    AuraFilterId.EvaluationJustConnections,
    AuraFilterId.EvaluationConnectionTypeSuspiciousOrReported,
    AuraFilterId.EvaluationConnectionTypeJustMet,
    AuraFilterId.EvaluationConnectionTypeAlreadyKnown,
    AuraFilterId.EvaluationConnectionTypeRecovery,
  ]);

  const sorts = useEvaluationSorts([
    AuraSortId.RecentEvaluation,
    AuraSortId.EvaluationScore,
    AuraSortId.EvaluationPlayerScore,
  ]);

  const subjectConnections = useSubjectConnections(subjectId);

  const brightIdBackup = useSelector(selectBrightIdBackup);

  const inboundOpinions: AuraInboundConnectionAndRatingData[] = useMemo(() => {
    const inboundConnections = subjectConnections.inboundConnections;
    if (!inboundConnections || inboundRatings === null || !brightIdBackup)
      return [];
    const inboundOpinions: AuraInboundConnectionAndRatingData[] =
      inboundRatings.map((r) => ({
        fromSubjectId: r.fromBrightId,
        rating: r,
        name: brightIdBackup.connections.find(
          (conn) => conn.id === r.fromBrightId,
        )?.name,
        inboundConnection: inboundConnections.find(
          (c) => c.id === r.fromBrightId,
        ),
      }));
    inboundConnections.forEach((c) => {
      const notRated =
        inboundRatings.findIndex((r) => r.fromBrightId === c.id) === -1;
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
  }, [brightIdBackup, inboundRatings, subjectConnections.inboundConnections]);

  const filterAndSortHookData = useFilterAndSort(
    inboundOpinions,
    filters,
    sorts,
    useMemo(() => ['fromSubjectId', 'name'], []),
    'evaluationsList',
  );
  const authData = useSelector(selectAuthData);

  const myRatingObject = useMemo(() => {
    if (!authData) return undefined;
    const rating = inboundRatings?.find(
      (r) => r.fromBrightId === authData.brightId,
    );
    return rating;
  }, [authData, inboundRatings]);

  return (
    <SubjectInboundEvaluationsContext.Provider
      value={{
        ...useSubjectInboundEvaluationsHookData,
        ...filterAndSortHookData,
        sorts,
        filters,
        subjectId,
        myRatingObject,
      }}
    >
      {children}
    </SubjectInboundEvaluationsContext.Provider>
  );
};

export const useSubjectInboundEvaluationsContext = (subjectId: string) => {
  const context = useContext(SubjectInboundEvaluationsContext);
  if (context === null) {
    throw new Error(
      'SubjectInboundEvaluationsContext must be used within a SubjectInboundEvaluationsContextProvider',
    );
  }
  if (context.subjectId !== subjectId) {
    throw new Error(
      'SubjectInboundEvaluationsContextProvider for ' +
        subjectId +
        'not provided',
    );
  }
  return context;
};
