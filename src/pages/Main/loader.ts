import { getPlaceInifiniteQueryOptions } from '@/utils/getQueryOptions';
import { QueryClient } from '@tanstack/react-query';

export const loader = (queryClient: QueryClient) => async () => {
  let placeData = null;

  const cachedPlaceData = queryClient.getQueryData(['places']);

  if (cachedPlaceData) placeData = cachedPlaceData;
  else
    placeData = queryClient.fetchInfiniteQuery(getPlaceInifiniteQueryOptions());
  return placeData;
};
