import useBrightIdBackupWithUpdatedConnectionLevels from 'hooks/useBrightIdBackupWithUpdatedConnectionLevels';
import useFilterAndSort from 'hooks/useFilterAndSort';
import {
  AuraFilterId,
  AuraFilterOptions,
  useSubjectFilters,
} from 'hooks/useFilters';
import { AuraSortId, AuraSortOptions, useSubjectSorts } from 'hooks/useSorts';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { BrightIdConnection, Connection } from 'types';

// Define the context
const SubjectsListContext = createContext<
  | (ReturnType<typeof useFilterAndSort<Connection>> & {
      sorts: AuraSortOptions<BrightIdConnection>;
      filters: AuraFilterOptions<BrightIdConnection>;
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
  const brightIdBackup = useBrightIdBackupWithUpdatedConnectionLevels();

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
        AuraFilterId.ConnectionConnectionTypeJustMet,
        AuraFilterId.ConnectionConnectionTypeAlreadyKnownPlus,
      ],
      [],
    ),
  );
  const sorts = useSubjectSorts(
    useMemo(
      () => [
        AuraSortId.ConnectionLastUpdated,
        AuraSortId.ConnectionMostEvaluations,
        AuraSortId.ConnectionScore,
        AuraSortId.MostMutualConnections,
      ],
      [],
    ),
  );

  const filterAndSortHookData = useFilterAndSort(
    brightIdBackup?.connections ?? null,
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
