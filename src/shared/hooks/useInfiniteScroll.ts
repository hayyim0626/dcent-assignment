import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface InfiniteScrollProps {
  data: any[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export const useInfiniteScroll = ({
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage
}: InfiniteScrollProps) => {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px"
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const flattenedItems = useMemo(() => {
    return data.flatMap((page) => page.data || []);
  }, [data]);

  return {
    loadMoreRef,
    flattenedItems
  };
};
