import { fetchPlaceFullList, fetchPlaceList } from '@/api/fetchPlaceList';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

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
    staleTime: 1 * 1000 * 60,
  });
};

export const getPlaceQueryOptions = (queryKey: string[]) => {
  return queryOptions({
    queryKey,
    queryFn: () => fetchPlaceFullList(),
    staleTime: 1 * 1000 * 60,
  });
};
