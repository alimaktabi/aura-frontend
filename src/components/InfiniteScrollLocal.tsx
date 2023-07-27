import InfiniteScroll from 'react-infinite-scroller';
import * as React from 'react';
import { JSX, useMemo, useState } from 'react';

interface InfiniteScrollLocalProps<T> extends React.HTMLProps<InfiniteScroll> {
  items: T[] | null;
  renderItem: (item: T) => JSX.Element;
}

export default function InfiniteScrollLocal<T>({
  items,
  renderItem,
  ...props
}: InfiniteScrollLocalProps<T>) {
  const [itemsLocal, setItemsLocal] = useState<T[]>([]);
  const loadMore = (_page: number) => {
    console.log({ _page });
    if (!items) return;
    setItemsLocal([
      ...itemsLocal,
      ...items.slice(itemsLocal.length, itemsLocal.length + 10),
    ]);
  };

  const hasMore = useMemo(
    () => items !== null && items.length !== itemsLocal.length,
    [items, itemsLocal.length],
  );
  return (
    <>
      {items && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          initialLoad={true}
          useWindow={false}
          {...props}
        >
          {itemsLocal.map((item, index) =>
            React.cloneElement(renderItem(item), { key: index }),
          )}
        </InfiniteScroll>
      )}
    </>
  );
}
