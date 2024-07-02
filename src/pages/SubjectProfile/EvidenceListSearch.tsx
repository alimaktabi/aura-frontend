import { FiltersModal } from 'components/EvaluationFlow/FiltersModal';
import { SortsModal } from 'components/EvaluationFlow/SortsModal';
import { useSubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { useState } from 'react';

import { SelectButtonWithModal } from '../../components/Shared/SelectButtonWithModal';

export const EvidenceListSearch = ({ subjectId }: { subjectId: string }) => {
  const {
    searchString,
    setSearchString,
    selectedFilter,
    selectedFilterId,
    toggleFilterById,
    selectedSort,
    setSelectedSort,
    filters,
    sorts,
  } = useSubjectInboundEvaluationsContext({ subjectId });

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
          placeholder="name or ID ..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
      <div className="card__filters flex gap-3">
        <SelectButtonWithModal
          testidPrefix={'subject-filter'}
          title="Filters"
          iconLeft={false}
          selectedItem={selectedFilter?.title ?? 'No filter'}
          isOpen={isFiltersModalOpen}
          openModalHandler={() => setIsFiltersModalOpen(true)}
          closeModalHandler={() => setIsFiltersModalOpen(false)}
        >
          <FiltersModal
            testidPrefix={'subject-filter'}
            filters={filters}
            selectedFilterId={selectedFilterId}
            toggleFilterById={(value) => {
              setIsFiltersModalOpen(false);
              toggleFilterById(value);
            }}
          />
        </SelectButtonWithModal>
        <SelectButtonWithModal
          title="Sort By"
          testidPrefix={'subject-sort'}
          iconLeft={false}
          selectedItem={selectedSort?.title || 'No sort'}
          isOpen={isSortsModalOpen}
          openModalHandler={() => setIsSortsModalOpen(true)}
          closeModalHandler={() => setIsSortsModalOpen(false)}
        >
          <SortsModal
            testidPrefix={'subject-sort'}
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
