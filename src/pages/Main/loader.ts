import { getPlaceInfiniteQueryOptions } from '@/utils';
import { QueryClient } from '@tanstack/react-query';

export const loader =
  (queryClient: QueryClient, queryKey: string[]) => async () => {
    let placeData = null;

    const cachedPlaceData = queryClient.getQueryData(queryKey);
    console.log('Main loader 호출');
    if (cachedPlaceData) {
      placeData = cachedPlaceData;
      console.log('캐시 데이터 있음');
    } else {
      placeData = queryClient.fetchInfiniteQuery({
        ...getPlaceInfiniteQueryOptions(queryKey, 3),
      });
      console.log('캐시 데이터 없음 fetch했음');
    }
    return placeData;
  };
