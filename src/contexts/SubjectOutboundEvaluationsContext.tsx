import useFilterAndSort from 'hooks/useFilterAndSort';
import {
  AuraFilterId,
  AuraFilterOptions,
  useOutboundEvaluationFilters,
} from 'hooks/useFilters';
import { useOutboundEvaluations } from 'hooks/useOutboundEvaluations';
import {
  AuraSortId,
  AuraSortOptions,
  useOutboundEvaluationSorts,
} from 'hooks/useSorts';
import { useSubjectConnections } from 'hooks/useSubjectConnections';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectBrightIdBackup } from 'store/profile/selectors';
import { AuraOutboundConnectionAndRatingData } from 'types';

// Define the context
export const SubjectOutboundEvaluationsContext = createContext<
  | (ReturnType<typeof useOutboundEvaluations> & {
      subjectId: string;
    } & ReturnType<
        typeof useFilterAndSort<AuraOutboundConnectionAndRatingData>
      > & {
        sorts: AuraSortOptions<AuraOutboundConnectionAndRatingData>;
        filters: AuraFilterOptions<AuraOutboundConnectionAndRatingData>;
      })
  | null
>(null);

interface ProviderProps {
  subjectId: string;
  children: ReactNode;
}

// Define the Provider component
export const SubjectOutboundEvaluationsContextProvider: React.FC<
  ProviderProps
> = ({ subjectId, children }) => {
  const useOutboundEvaluationsHookData = useOutboundEvaluations(subjectId);
  const { outboundRatings } = useOutboundEvaluationsHookData;
  const filters = useOutboundEvaluationFilters(
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

  const sorts = useOutboundEvaluationSorts([
    AuraSortId.RecentEvaluation,
    AuraSortId.EvaluationScore,
    AuraSortId.EvaluationPlayerScore,
  ]);

  const subjectConnections = useSubjectConnections(subjectId);

  const brightIdBackup = useSelector(selectBrightIdBackup);

  const outboundOpinions: AuraOutboundConnectionAndRatingData[] =
    useMemo(() => {
      const outboundConnections = subjectConnections.outboundConnections;
      if (!outboundConnections || outboundRatings === null || !brightIdBackup)
        return [];
      const outboundOpinions: AuraOutboundConnectionAndRatingData[] =
        outboundRatings.map((r) => ({
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
        const notRated =
          outboundRatings.findIndex((r) => r.fromBrightId === c.id) === -1;
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
    }, [
      brightIdBackup,
      outboundRatings,
      subjectConnections.outboundConnections,
    ]);

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

export const useOutboundEvaluationsContext = (subjectId: string) => {
  const context = useContext(SubjectOutboundEvaluationsContext);
  if (context === null) {
    throw new Error(
      'SubjectOutboundEvaluationsContext must be used within a SubjectOutboundEvaluationsContextProvider',
    );
  }
  if (context.subjectId !== subjectId) {
    throw new Error(
      'SubjectOutboundEvaluationsContextProvider for ' +
        subjectId +
        'not provided',
    );
  }
  return context;
};
