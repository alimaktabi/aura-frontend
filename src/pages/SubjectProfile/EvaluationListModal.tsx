import SubjectEvaluation from '../../components/Shared/ProfileEvaluation';
import { useInboundRatings } from '../../hooks/useSubjectRatings.ts';
import { SelectItems } from '../../components/Shared/SelectItems.tsx';
import InfiniteScrollLocal from 'components/InfiniteScrollLocal.tsx';
import { AuraFilterId, useEvaluationFilters } from 'hooks/useFilters.ts';
import { AuraSortId, useEvaluationSorts } from 'hooks/useSorts.ts';
import useFilterAndSort from 'hooks/useFilterAndSort.ts';

export const EvaluationListModal = ({ subjectId }: { subjectId: string }) => {
  const filters = useEvaluationFilters([
    AuraFilterId.EvaluationMutualConnections,
    AuraFilterId.EvaluationPositiveEvaluations,
    AuraFilterId.EvaluationNegativeEvaluations,
  ]);

  const sorts = useEvaluationSorts([
    AuraSortId.RecentEvaluation,
    AuraSortId.EvaluationScore,
  ]);

  const { inboundRatings } = useInboundRatings(subjectId);

  const {
    selectedFilterId,
    toggleFilterById,
    selectedSortId,
    setSelectedSortId,
    itemsFiltered: inboundRatingsFiltered,
  } = useFilterAndSort(inboundRatings, filters, sorts);

  return (
    <div className="flex flex-col gap-[18px] max-h-[600px]">
      <SelectItems
        title="Filters"
        isOpenInitial={true}
        items={filters}
        selectedItemId={selectedFilterId}
        setSelectedItemId={toggleFilterById}
      />
      <SelectItems
        title="Sort"
        isOpenInitial={false}
        items={sorts}
        selectedItemId={selectedSortId}
        setSelectedItemId={setSelectedSortId}
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
