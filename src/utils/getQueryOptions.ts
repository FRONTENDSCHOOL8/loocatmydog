import { fetchPlaceList } from '@/api/fetchPlaceList';
import { infiniteQueryOptions } from '@tanstack/react-query';

const INITIAL_PAGE = 1;

export const getPlaceInfiniteQueryOptions = (
  queryKey: string[],
  perPage: number = 1,
  options = {}
) => {
  return infiniteQueryOptions({
    queryKey,
    queryFn: (pageInfo) => fetchPlaceList(pageInfo, perPage, options),
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.page < lastPage.totalPages ? allPages.length + 1 : null;
    },
  });
};
