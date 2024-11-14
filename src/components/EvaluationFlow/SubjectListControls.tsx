import { FiltersModal } from 'components/EvaluationFlow/FiltersModal';
import { SortsModal } from 'components/EvaluationFlow/SortsModal';
import { useSubjectsListContext } from 'contexts/SubjectsListContext';
import * as React from 'react';
import { useMemo, useState } from 'react';

import useBrightIdBackupWithAuraConnectionData from '../../hooks/useBrightIdBackupWithAuraConnectionData';
import { AuraSortId } from '../../hooks/useSorts';
import useViewMode from '../../hooks/useViewMode';
import { AuraFilterDropdownOption } from '../../types';
import { PreferredView } from '../../types/dashboard';
import Dropdown from '../Shared/Dropdown';
import Modal from '../Shared/Modal';

function FilterAndSortModalBody({ isPlayerMode }: { isPlayerMode: boolean }) {
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
        includeConnectionFilters={isPlayerMode}
        testidPrefix={'subject-filter'}
        filters={filters}
        selectedFilterIds={selectedFilterIds}
        toggleFiltersById={toggleFiltersById}
      />
      <p className="text-black2 font-bold pt-3 pb-1">Sorts</p>
      <SortsModal
        includeLastConnectionFilter={isPlayerMode}
        testidPrefix={'subject-sort'}
        sorts={sorts}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
    </div>
  );
}

export const SubjectListControls = ({
  refreshBrightIdBackup,
}: {
  refreshBrightIdBackup: () => void;
}) => {
  const {
    searchString,
    setSearchString,
    selectedFilters,
    selectedSort,
    clearSortAndFilter,
    toggleFiltersById,
    setSelectedSort,
  } = useSubjectsListContext();

  const brightIdBackup = useBrightIdBackupWithAuraConnectionData();

  const { currentViewMode, setPreferredView } = useViewMode();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const customViewOption = useMemo(
    () => ({
      value: -1,
      label: <p>Custom view</p>,
      filterIds: null,
      sortId: null,
      onClick: () => setIsModalOpen(true),
    }),
    [],
  );
  const defaultOption = useMemo(
    () => ({
      value: 0,
      label: <p>Recent connections (default)</p>,
      filterIds: null,
      sortId: null,
      onClick: () => clearSortAndFilter(),
    }),
    [clearSortAndFilter],
  );
  const dropdownOptions: AuraFilterDropdownOption[] = useMemo(
    () => [
      defaultOption,
      ...[
        {
          value: 2,
          label: <p>Recently evaluated</p>,
          filterIds: null,
          sortId: AuraSortId.ConnectionRecentEvaluation,
          ascending: false,
        },
      ].map((item) => ({
        ...item,
        onClick: () => {
          toggleFiltersById(item.filterIds, true);
          setSelectedSort(item.sortId, item.ascending);
        },
      })),
      customViewOption,
    ],
    [customViewOption, defaultOption, setSelectedSort, toggleFiltersById],
  );

  const selectedItem: AuraFilterDropdownOption = useMemo(() => {
    if (!selectedFilters && !selectedSort) {
      return defaultOption;
    }
    const selectedItem = dropdownOptions.find((item) => {
      const isSelectedSort =
        selectedSort?.id === item.sortId &&
        item.ascending ===
          (selectedSort.defaultAscending !== selectedSort.isReversed);
      if (!isSelectedSort) return false;
      if (!selectedFilters) return !item.filterIds;
      if (!item.filterIds) return false;
      const selectedFilterIdsSorted = selectedFilters.map((f) => f.id).sort();
      const itemFilterIdsSorted = [...item.filterIds].sort();
      for (let i = 0; i < selectedFilterIdsSorted.length; i++) {
        if (itemFilterIdsSorted[i] !== selectedFilterIdsSorted[i]) return false;
      }
      return true;
    });
    return selectedItem ?? customViewOption;
  }, [
    customViewOption,
    defaultOption,
    dropdownOptions,
    selectedFilters,
    selectedSort,
  ]);

  const { itemsFiltered: filteredSubjects } = useSubjectsListContext();

  return (
    <>
      <div className="bg-gray40 rounded-[10px] p-1 flex-1 flex flex-col justify-center gap-4 max-h-[175px]">
        <div className="card__input flex gap-2 items-center rounded px-3.5">
          <img
            className="w-4 h-4"
            src="/assets/images/Shared/search-icon.svg"
            alt=""
          />
          <input
            className="bg-gray40 w-full text-black2 font-medium placeholder-black2 text-sm h-11 focus:outline-none"
            type="text"
            placeholder="Subject name or ID ..."
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
      </div>
      <div className="text-lg text-white mb-3 mt-3 flex items-center">
        <Dropdown
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          items={dropdownOptions}
          selectedItem={selectedItem}
          onItemClick={(item) => item.onClick()}
          className="h-10"
        />
        <Modal
          title="Custom View"
          isOpen={isModalOpen}
          closeModalHandler={() => setIsModalOpen(false)}
          className="select-button-with-modal__modal"
        >
          <FilterAndSortModalBody
            isPlayerMode={currentViewMode === PreferredView.PLAYER}
          />
        </Modal>
        <span className="ml-1">
          (
          {filteredSubjects?.length ??
            brightIdBackup?.connections.length ??
            '...'}{' '}
          result
          {(filteredSubjects?.length ?? brightIdBackup?.connections.length) !==
          1
            ? 's'
            : ''}
          )
        </span>
        <img
          src="/assets/images/Shared/refresh.svg"
          alt="refresh"
          className="w-7 h-7 ml-1 mt-0.5 cursor-pointer"
          onClick={refreshBrightIdBackup}
        />
        {currentViewMode === PreferredView.MANAGER_EVALUATING_TRAINER && (
          <p
            className="ml-auto font-medium cursor-pointer text-white"
            onClick={() =>
              setPreferredView(PreferredView.MANAGER_EVALUATING_MANAGER)
            }
          >
            View Managers
          </p>
        )}
        {currentViewMode === PreferredView.MANAGER_EVALUATING_MANAGER && (
          <p
            className="ml-auto font-medium cursor-pointer text-white"
            onClick={() =>
              setPreferredView(PreferredView.MANAGER_EVALUATING_TRAINER)
            }
          >
            View Trainers
          </p>
        )}
      </div>
    </>
  );
};
