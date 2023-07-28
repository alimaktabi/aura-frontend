import { useMemo, useState } from 'react';
import SubjectEvaluation from '../../components/Shared/ProfileEvaluation';
import { useInboundRatings } from '../../hooks/useSubjectRatings.ts';
import { SelectItems } from '../../components/Shared/SelectItems.tsx';
import InfiniteScrollLocal from 'components/InfiniteScrollLocal.tsx';
import { AuraFilter, useEvaluationFilters } from 'hooks/useFilters.ts';
import { AuraSort, useEvaluationSorts } from 'hooks/useSorts.ts';

export const EvaluationListModal = ({ subjectId }: { subjectId: string }) => {
  const filters = useEvaluationFilters([
    AuraFilter.EvaluationMutualConnections,
    AuraFilter.PositiveEvaluations,
    AuraFilter.NegativeEvaluations,
  ]);

  const sorts = useEvaluationSorts([
    AuraSort.RecentEvaluation,
    AuraSort.EvaluationScore,
  ]);

  const { inboundRatings } = useInboundRatings(subjectId);

  const [selectedFilterId, setSelectedFilterId] = useState<AuraFilter | null>(
    null,
  );
  const [selectedSortId, setSelectedSortId] = useState<AuraSort | null>(null);

  const inboundRatingsFiltered = useMemo(() => {
    const selectedFilter = filters.find((f) => f.id === selectedFilterId)?.func;
    const selectedSort = sorts.find((s) => s.id === selectedSortId)?.func;
    const items = inboundRatings?.filter(selectedFilter ?? ((_item) => true));
    return selectedSort ? items?.sort(selectedSort) : items;
  }, [filters, inboundRatings, selectedFilterId, selectedSortId, sorts]);

  return (
    <div className="flex flex-col gap-[18px] max-h-[600px]">
      <SelectItems
        title="Filters"
        isOpenInitial={true}
        items={filters}
        selectedItemId={selectedFilterId}
        setSelectedItemId={setSelectedFilterId}
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
