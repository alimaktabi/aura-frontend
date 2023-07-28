import { ModalItem } from '../../components/Shared/Modal/ModalItem';
import { SubjectCard } from '../SubjectsEvaluation/SubjectCard';
import { useInboundConnections } from '../../hooks/useSubjectConnections.ts';
import InfiniteScrollLocal from 'components/InfiniteScrollLocal.tsx';
import useFilterAndSort from 'hooks/useFilterAndSort.ts';
import { useMemo } from 'react';
import { AuraFilterId, useSubjectFilters } from 'hooks/useFilters.ts';

export const ConnectionListModal = ({
  subjectId,
}: {
  subjectId: string | undefined;
}) => {
  const { inboundConnections } = useInboundConnections(subjectId);
  const filters = useSubjectFilters([AuraFilterId.ConnectionMutualConnections]);
  const {
    selectedFilterId,
    toggleFilterById,
    itemsFiltered: inboundConnectionsFiltered,
  } = useFilterAndSort(
    inboundConnections,
    filters,
    useMemo(() => [], []),
  );
  return (
    <div className="flex flex-col gap-6 max-h-[600px]">
      <div className="flex w-full justify-between">
        <p>Filters:</p>
        {filters.map((f) => (
          <ModalItem
            key={f.id}
            title={f.title}
            isSelected={selectedFilterId === f.id}
            onClick={() => toggleFilterById(f.id)}
          />
        ))}
      </div>
      <div className="overflow-auto">
        <InfiniteScrollLocal
          className={'flex flex-col gap-2.5 w-full -mb-5 pb-5'}
          items={inboundConnectionsFiltered}
          renderItem={(subject) => <SubjectCard subjectId={subject.id} />}
        />
      </div>
    </div>
  );
};
