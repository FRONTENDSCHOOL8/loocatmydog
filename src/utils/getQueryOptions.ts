import { fetchPlaceList } from '@/api/fetchPlaceList';
import { infiniteQueryOptions } from '@tanstack/react-query';

const INITIAL_PAGE = 1;

export const getPlaceInifiniteQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['places'],
    queryFn: fetchPlaceList,
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.page < lastPage.totalPages ? allPages.length + 1 : null;
    },
  });
};
