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
      inboundRatings.map((r) => ({
        fromSubjectId: r.fromBrightId,
        rating: r,
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
          inboundConnection: c,
        });
      }
    });
    return inboundOpinions;
  }, [inboundRatings, subjectConnections.inboundConnections]);

  console.log('op', inboundOpinions?.[0]);

  const filterAndSortHookData = useFilterAndSort(
    inboundOpinions,
    filters,
    sorts,
    undefined, //TODO: fix search keys
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

export const useSubjectInboundEvaluationsContext = (subjectId: string) => {
  const context = useContext(SubjectInboundEvaluationsContext);
  if (context === null || context.subjectId !== subjectId) {
    throw new Error(
      'SubjectInboundEvaluationsContext must be used within a SubjectInboundEvaluationsContextProvider',
    );
  }
  return context;
};
