import { getPlaceInfiniteQueryOptions } from '@/utils';
import { QueryClient } from '@tanstack/react-query';

export const loader =
  (queryClient: QueryClient, queryKey: string[]) => async () => {
    let placeData = null;

    const cachedPlaceData = queryClient.getQueryData(queryKey);

    if (cachedPlaceData) {
      placeData = cachedPlaceData;
    } else {
      placeData = queryClient.fetchInfiniteQuery({
        ...getPlaceInfiniteQueryOptions(queryKey, 3),
      });
    }
    return placeData;
  };
