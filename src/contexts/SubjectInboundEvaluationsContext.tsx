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
import { AuraInboundConnectionAndRatingData } from 'types';

// Define the context
const SubjectInboundEvaluationsContext = createContext<
  | (ReturnType<typeof useSubjectInboundEvaluations> & {
      subjectId: string;
    } & ReturnType<
        typeof useFilterAndSort<AuraInboundConnectionAndRatingData>
      > & {
        sorts: AuraSortOptions<AuraInboundConnectionAndRatingData>;
        filters: AuraFilterOptions<AuraInboundConnectionAndRatingData>;
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
  ]);

  const sorts = useEvaluationSorts([
    AuraSortId.RecentEvaluation,
    AuraSortId.EvaluationScore,
    AuraSortId.EvaluationPlayerScore,
  ]);

  const subjectConnections = useSubjectConnections(subjectId);

  const inboundOpinions: AuraInboundConnectionAndRatingData[] = useMemo(() => {
    const inboundConnections = subjectConnections.inboundConnections;
    if (!inboundConnections || inboundRatings === null) return [];
    const inboundOpinions: AuraInboundConnectionAndRatingData[] =
      inboundConnections.map((c) => ({
        fromSubjectId: c.id,
        rating: inboundRatings.find((r) => r.fromBrightId === c.id),
        inboundConnection: c,
      }));
    inboundRatings.forEach((r) => {
      const isNotConnection =
        inboundConnections.findIndex((c) => c.id === r.fromBrightId) === -1;
      if (isNotConnection) {
        inboundOpinions.push({
          fromSubjectId: r.fromBrightId,
          rating: r,
        });
      }
    });
    return inboundOpinions;
  }, [inboundRatings, subjectConnections.inboundConnections]);

  const filterAndSortHookData = useFilterAndSort(
    inboundOpinions,
    filters,
    sorts,
    undefined, //TODO: fix search keys
    'subjectsList',
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

export const useSubjectInboundEvaluationsContext = (subjectId: string) => {
  const context = useContext(SubjectInboundEvaluationsContext);
  if (context === null || context.subjectId !== subjectId) {
    throw new Error(
      'SubjectInboundEvaluationsContext must be used within a SubjectInboundEvaluationsContextProvider',
    );
  }
  return context;
};
