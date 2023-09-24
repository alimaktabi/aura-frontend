import InfiniteScrollLocal from 'components/InfiniteScrollLocal';
import { ModalItem } from 'components/Shared/Modal/ModalItem';
import useFilterAndSort from 'hooks/useFilterAndSort';
import { AuraFilterId, useEvaluationFilters } from 'hooks/useFilters';
import { AuraSortId, AuraSortOption, useEvaluationSorts } from 'hooks/useSorts';
import { useCallback, useState } from 'react';
import { AuraRating } from 'types';

import SubjectEvaluation from '../../components/Shared/ProfileEvaluation';
import { SelectItems } from '../../components/Shared/SelectItems';
import { useInboundRatings } from '../../hooks/useSubjectRatings';

export const EvaluationListModal = ({ subjectId }: { subjectId: string }) => {
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

  const { inboundRatings } = useInboundRatings(subjectId);

  const {
    selectedFilterId,
    toggleFilterById,
    selectedSortId,
    setSelectedSort,
    itemsFiltered: inboundRatingsFiltered,
    selectedSort,
  } = useFilterAndSort(inboundRatings, filters, sorts);

  const isManagerView = false;
  const [isCurrentEpoch, setIsCurrentEpoch] = useState(true);

  const selectCurrentEpoch = () => {
    setIsCurrentEpoch(true);
  };

  const selectPreviousEpoch = () => {
    setIsCurrentEpoch(false);
  };

  const isSortItemAscending = useCallback(
    function (item: AuraSortOption<AuraRating>) {
      return selectedSort?.id === item.id
        ? selectedSort.defaultAscending !== selectedSort.isReversed
        : item.defaultAscending;
    },
    [selectedSort],
  );
  return (
    <div className="flex flex-col gap-[18px] max-h-[600px]">
      {isManagerView && (
        <div className="p-1.5 w-full h-[48px] rounded-md border border-white bg-white">
          <div className={'flex flex-wrap relative h-[34px]'}>
            <div
              className={`background absolute w-1/2 top-0 bottom-0 rounded-md transition-all duration-300 ease-in-out ${
                isCurrentEpoch
                  ? 'left-0 right-1/2 bg-pastel-orange'
                  : 'right-0 left-1/2 bg-pastel-blue'
              }`}
            ></div>
            <div
              className={`flex items-center justify-center gap-1 bg-transparent absolute cursor-pointer w-1/2 left-0 top-1/2 -translate-y-1/2 text-center font-medium transition-all duration-300 ease-in-out ${
                isCurrentEpoch ? 'text-black' : 'text-black'
              }`}
              onClick={() => selectCurrentEpoch()}
            >
              <img
                src={`${
                  isCurrentEpoch
                    ? '/assets/images/Shared/trainer-icon-s-black.svg'
                    : '/assets/images/Shared/trainer-icon-s-orange.svg'
                }`}
                alt=""
              />
              <span>Trainers</span>
            </div>
            <div
              className={`flex items-center justify-center gap-1 bg-transparent absolute cursor-pointer w-1/2 right-0 top-1/2 -translate-y-1/2 text-center font-medium transition-all duration-300 ease-in-out ${
                isCurrentEpoch ? 'text-black' : 'text-black'
              }`}
              onClick={() => selectPreviousEpoch()}
            >
              <img
                src={`${
                  isCurrentEpoch
                    ? '/assets/images/Shared/manager-icon-s-blue.svg'
                    : '/assets/images/Shared/manager-icon-s-black.svg'
                }`}
                alt=""
              />
              <span>Managers</span>
            </div>
          </div>
        </div>
      )}

      <SelectItems
        title="Filters"
        isOpenInitial={true}
        items={filters}
        selectedItemId={selectedFilterId}
        setSelectedItemId={toggleFilterById}
        renderItem={(item) => (
          <ModalItem
            key={item.id}
            className="w-auto min-w-min"
            title={item.title}
            isSelected={item.id === selectedFilterId}
            onClick={() => toggleFilterById(item.id)}
          />
        )}
      />

      <SelectItems
        title="Sort"
        isOpenInitial={false}
        items={sorts}
        selectedItemId={selectedSortId}
        setSelectedItemId={(id) => setSelectedSort(id)}
        renderItem={(item) => {
          const isSelected = item.id === selectedSortId;
          const ascending = isSortItemAscending(item);
          const sortDirectionLabel = ascending
            ? item.ascendingLabel
            : item.descendingLabel;
          return (
            <ModalItem
              key={item.id}
              className="w-auto min-w-min"
              title={
                item.title +
                (sortDirectionLabel ? ` (${sortDirectionLabel})` : '')
              }
              icon={
                ascending
                  ? '/assets/images/Shared/arrow-up-icon'
                  : '/assets/images/Shared/arrow-down-icon'
              }
              isSelected={isSelected}
              onClick={() =>
                setSelectedSort(item.id, isSelected ? !ascending : ascending)
              }
            />
          );
        }}
      />
      <div className={'overflow-auto'}>
        <InfiniteScrollLocal
          className={'flex flex-col gap-2.5 w-full -mb-5 pb-5'}
          items={inboundRatingsFiltered}
          renderItem={(rating) => (
            <SubjectEvaluation
              fromSubjectId={rating.fromBrightId}
              toSubjectId={rating.toBrightId}
              className="!min-w-[305px] !py-5"
            />
          )}
        />
      </div>
    </div>
  );
};
