import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import useBrightIdBackupWithUpdatedConnectionData from 'hooks/useBrightIdBackupWithAuraConnectionData';
import useFilterAndSort from 'hooks/useFilterAndSort';
import {
  AuraFilterId,
  AuraFilterOptions,
  useSubjectFilters,
} from 'hooks/useFilters';
import { AuraSortId, AuraSortOptions, useSubjectSorts } from 'hooks/useSorts';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { AuraNodeBrightIdConnectionWithBackupData } from 'types';

// Define the context
const SubjectsListContext = createContext<
  | (ReturnType<
      typeof useFilterAndSort<AuraNodeBrightIdConnectionWithBackupData>
    > & {
      sorts: AuraSortOptions<AuraNodeBrightIdConnectionWithBackupData>;
      filters: AuraFilterOptions<AuraNodeBrightIdConnectionWithBackupData>;
    })
  | null
>(null);

interface ProviderProps {
  children: ReactNode;
}

// Define the Provider component
export const SubjectsListContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const brightIdBackup = useBrightIdBackupWithUpdatedConnectionData();

  const filters = useSubjectFilters(
    useMemo(
      () => [
        AuraFilterId.ConnectionLevelNotYet,
        AuraFilterId.ConnectionLevelSybil,
        AuraFilterId.ConnectionLevelBronze,
        AuraFilterId.ConnectionLevelSilver,
        AuraFilterId.ConnectionLevelGold,
        AuraFilterId.ConnectionYourEvaluationPositive,
        AuraFilterId.ConnectionYourEvaluationNegative,
        AuraFilterId.ConnectionYourEvaluationNotEvaluatedYet,
        AuraFilterId.ConnectionConnectionTypeSuspiciousOrReported,
        AuraFilterId.ConnectionConnectionTypeJustMet,
        AuraFilterId.ConnectionConnectionTypeAlreadyKnownPlus,
        AuraFilterId.ConnectionConnectionTypeRecovery,
      ],
      [],
    ),
  );
  const sorts = useSubjectSorts(
    useMemo(
      () => [
        AuraSortId.ConnectionLastUpdated,
        // AuraSortId.ConnectionMostEvaluations,
        AuraSortId.ConnectionScore,
        // AuraSortId.MostMutualConnections,
      ],
      [],
    ),
  );

  const { loading, myRatings } = useMyEvaluationsContext();

  const connectionsSortedDefault = useMemo(() => {
    if (!brightIdBackup?.connections || loading || myRatings === null)
      return null;
    const connections = [...brightIdBackup.connections].sort(
      (a, b) =>
        new Date(b.timestamp ?? 0).getTime() -
        new Date(a.timestamp ?? 0).getTime(),
    );
    return connections
      .reduce(
        (acc, c) => {
          const ratingIndex = myRatings.findIndex((r) => r.toBrightId === c.id);
          if (ratingIndex === -1) acc[0].push(c);
          else acc[1].push(c);
          return acc;
        },
        [[], []] as [
          AuraNodeBrightIdConnectionWithBackupData[],
          AuraNodeBrightIdConnectionWithBackupData[],
        ],
      )
      .flat();
  }, [brightIdBackup, loading, myRatings]);

  const filterAndSortHookData = useFilterAndSort(
    connectionsSortedDefault,
    filters,
    sorts,
    useMemo(() => ['id', 'name'], []),
    'subjectsList',
  );

  return (
    <SubjectsListContext.Provider
      value={{ ...filterAndSortHookData, filters, sorts }}
    >
      {children}
    </SubjectsListContext.Provider>
  );
};

export const useSubjectsListContext = () => {
  const context = useContext(SubjectsListContext);
  if (context === null) {
    throw new Error(
      'SubjectsListContext must be used within a SubjectsListContextProvider',
    );
  }
  return context;
};
