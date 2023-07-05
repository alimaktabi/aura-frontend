import { useMemo, useState } from 'react';
import SubjectEvaluation from '../../components/Shared/ProfileEvaluation';
import { useInboundRatings } from '../../hooks/useSubjectRatings.ts';
import { SelectItems } from '../../components/Shared/SelectItems.tsx';
import { AuraRating } from '../../types';
import { useSelector } from 'react-redux';
import { selectBrightIdBackup } from '../../store/profile/selectors.ts';

export const EvaluationListModal = ({ subjectId }: { subjectId: string }) => {
  const brightIdBackup = useSelector(selectBrightIdBackup);
  const filters = useMemo(
    () => [
      {
        id: 1,
        title: 'Mutual connections',
        isSelected: false,
        func: (item: AuraRating) =>
          !!brightIdBackup?.connections.find(
            (conn) => item.fromBrightId === conn.id,
          ),
      },
      {
        id: 2,
        title: 'Positive Evaluations',
        isSelected: true,
        func: (item: AuraRating) => Number(item.rating) > 0,
      },
      {
        id: 3,
        title: 'Negative Evaluations',
        isSelected: false,
        func: (item: AuraRating) => Number(item.rating) < 0,
      },
    ],
    [brightIdBackup?.connections],
  );
  const sorts = useMemo(
    () => [
      {
        id: 1,
        title: 'Recent',
        isSelected: false,
        func: (a: AuraRating, b: AuraRating) =>
          new Date(b.updatedAt ?? 0).getTime() -
          new Date(a.updatedAt ?? 0).getTime(),
      },
      {
        id: 2,
        title: 'Evaluation Score',
        isSelected: true,
        func: (a: AuraRating, b: AuraRating) =>
          Number(b.rating) - Number(a.rating),
      },
      // {
      //   id: 3,
      //   title: 'Player Score',
      //   isSelected: false,
      //   func: (a: AuraRating, b: AuraRating) => Number(a.updatedAt) - Number(b.updatedAt),
      // },
    ],
    [],
  );
  const { inboundRatings } = useInboundRatings(subjectId);

  const [selectedFilterId, setSelectedFilterId] = useState<number | null>(null);
  const [selectedSortId, setSelectedSortId] = useState<number | null>(null);

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
      <div className="flex flex-col overflow-scroll overscroll-contain gap-2.5 w-full -mb-5 pb-5">
        {inboundRatingsFiltered?.map((rating) => (
          <SubjectEvaluation
            key={rating.id}
            fromSubjectId={rating.fromBrightId}
            toSubjectId={rating.toBrightId}
            className="!min-w-[305px] !py-5"
          />
        ))}
      </div>
    </div>
  );
};
