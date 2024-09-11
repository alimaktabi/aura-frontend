import { FiltersModal } from 'components/EvaluationFlow/FiltersModal';
import { SortsModal } from 'components/EvaluationFlow/SortsModal';
import { SelectButtonWithModal } from 'components/Shared/SelectButtonWithModal';
import { useSubjectsListContext } from 'contexts/SubjectsListContext';
import * as React from 'react';
import { useState } from 'react';

function FilterAndSortModalBody() {
  const {
    selectedFilterIds,
    toggleFiltersById,
    selectedSort,
    setSelectedSort,
    filters,
    sorts,
  } = useSubjectsListContext();

  return (
    <div>
      <p className="text-black2 font-bold">Filters</p>
      <FiltersModal
        testidPrefix={'subject-filter'}
        filters={filters}
        selectedFilterIds={selectedFilterIds}
        toggleFiltersById={toggleFiltersById}
      />
      <p className="text-black2 font-bold pt-3 pb-1">Sorts</p>
      <SortsModal
        testidPrefix={'subject-sort'}
        sorts={sorts}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
    </div>
  );
}

export const SubjectSearch = () => {
  const { searchString, setSearchString, selectedFilters, selectedSort } =
    useSubjectsListContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="card flex flex-col gap-4 max-h-[175px]">
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
          testidPrefix={'subject-filter'}
          title="Custom View"
          iconLeft={false}
          selectedItem={
            selectedFilters?.map((f) => f.title).join(', ') ?? 'No filter'
          }
          isOpen={isModalOpen}
          openModalHandler={() => setIsModalOpen(true)}
          closeModalHandler={() => setIsModalOpen(false)}
        >
          <FilterAndSortModalBody />
        </SelectButtonWithModal>
        <SelectButtonWithModal
          title="Custom View"
          testidPrefix={'subject-sort'}
          iconLeft={false}
          selectedItem={
            selectedSort
              ? `${selectedSort.title} (${
                  selectedSort.defaultAscending !== selectedSort.isReversed
                    ? selectedSort.ascendingLabel || 'Ascending'
                    : selectedSort.descendingLabel || 'Descending'
                })`
              : 'No sort'
          }
          isOpen={isModalOpen}
          openModalHandler={() => setIsModalOpen(true)}
          closeModalHandler={() => setIsModalOpen(false)}
        >
          <FilterAndSortModalBody />
        </SelectButtonWithModal>
      </div>
    </div>
  );
};
