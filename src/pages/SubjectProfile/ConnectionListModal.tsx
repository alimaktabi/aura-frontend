import { ModalItem } from '../../components/Shared/Modal/ModalItem';
import { SubjectCard } from '../SubjectsEvaluation/SubjectCard';
import { useInboundConnections } from '../../hooks/useSubjectConnections.ts';
import InfiniteScroll from 'react-infinite-scroller';
import { useMemo, useState } from 'react';
import { BrightIdConnection } from 'types';

export const ConnectionListModal = ({
  subjectId,
}: {
  subjectId: string | undefined;
}) => {
  const { inboundConnections } = useInboundConnections(subjectId);
  const [items, setItems] = useState<BrightIdConnection[]>([]);
  const loadMore = (_page: number) => {
    console.log({ _page });
    if (!inboundConnections) return;
    setItems([
      ...items,
      ...inboundConnections.slice(items.length, items.length + 10),
    ]);
  };

  const hasMore = useMemo(
    () =>
      inboundConnections !== null && inboundConnections.length !== items.length,
    [inboundConnections, items.length],
  );

  return (
    <div className="flex flex-col gap-6 max-h-[600px]">
      <div className="flex w-full justify-between">
        <p>Filters:</p>
        <ModalItem title="Mutual Connections" isSelected={false} />
      </div>
      {String(hasMore)}
      <div className="flex flex-col overflow-scroll overscroll-contain gap-2.5 w-full -mb-5 pb-5">
        {inboundConnections && (
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            initialLoad={true}
            useWindow={false}
          >
            {items.map((subject) => (
              <SubjectCard subjectId={subject.id} key={subject.id} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
