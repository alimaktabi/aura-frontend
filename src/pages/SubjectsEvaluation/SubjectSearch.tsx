import { SelectButtonWithModal } from '../../components/Shared/SelectButtonWithModal';
import { FiltersModal } from './FiltersModal.tsx';
import { SortsModal } from 'pages/SubjectsEvaluation/SortsModal.tsx';
import { Connection } from 'types';
import { useEffect, useMemo, useState } from 'react';
import useFilterAndSort from 'hooks/useFilterAndSort.ts';
import { AuraFilterId, useSubjectFilters } from 'hooks/useFilters.ts';
import { AuraSortId, useSubjectSorts } from 'hooks/useSorts.ts';

export const SubjectSearch = ({
  subjects,
  setFilteredSubjects,
}: {
  subjects: Connection[] | null;
  setFilteredSubjects: (items: Connection[]) => void;
}) => {
  const filters = useSubjectFilters(
    useMemo(
      () => [
        AuraFilterId.ConnectionTierNotYet,
        AuraFilterId.ConnectionTierSybil,
        AuraFilterId.ConnectionTierBronze,
        AuraFilterId.ConnectionTierSilver,
        AuraFilterId.ConnectionTierGold,
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
  const {
    searchString,
    setSearchString,
    itemsFiltered,
    selectedFilter,
    selectedFilterId,
    setSelectedFilterId,
    selectedSort,
    setSelectedSort,
  } = useFilterAndSort(
    subjects,
    filters,
    sorts,
    useMemo(() => ['id', 'name'], []),
  );
  useEffect(() => {
    if (itemsFiltered) {
      setFilteredSubjects(itemsFiltered);
    }
  }, [setFilteredSubjects, itemsFiltered]);

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isSortsModalOpen, setIsSortsModalOpen] = useState(false);
  return (
    <div className="card flex flex-col gap-4">
      <div className="card__input flex gap-2 items-center rounded bg-gray30 px-3.5">
        <img
          className="w-4 h-4"
          src="/assets/images/Shared/search-icon.svg"
          alt=""
        />
        <input
          className="w-full bg-gray30 text-black2 font-medium placeholder-black2 text-sm h-11 focus:outline-none"
          type="text"
          placeholder="Subject name or ID ..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
      <div className="card__filters flex gap-3">
        <SelectButtonWithModal
          title="Filters"
          iconLeft={false}
          selectedItem={selectedFilter?.title ?? 'No filter'}
          isOpen={isFiltersModalOpen}
          openModalHandler={() => setIsFiltersModalOpen(true)}
          closeModalHandler={() => setIsFiltersModalOpen(false)}
        >
          <FiltersModal
            filters={filters}
            selectedFilterId={selectedFilterId}
            setSelectedFilterId={(value) => {
              setIsFiltersModalOpen(false);
              setSelectedFilterId(value);
            }}
          />
        </SelectButtonWithModal>
        <SelectButtonWithModal
          title="Sort By"
          iconLeft={false}
          selectedItem={selectedSort?.title || 'No sort'}
          isOpen={isSortsModalOpen}
          openModalHandler={() => setIsSortsModalOpen(true)}
          closeModalHandler={() => setIsSortsModalOpen(false)}
        >
          <SortsModal
            sorts={sorts}
            selectedSort={selectedSort}
            setSelectedSort={(...value) => {
              setIsSortsModalOpen(false);
              setSelectedSort(...value);
            }}
          />
        </SelectButtonWithModal>
      </div>
    </div>
  );
};
