import pb from '@/api/pocketbase';
import { getPlaceInfiniteQueryOptions } from '@/utils';
import { QueryClient } from '@tanstack/react-query';

export const loader =
  (queryClient: QueryClient, queryKey: string[]) => async () => {
    let placeData = null;

    // 플레이스 데이터 수신
    const cachedPlaceData = queryClient.getQueryData(queryKey);
    if (cachedPlaceData) {
      placeData = cachedPlaceData;
    } else {
      placeData = queryClient.fetchInfiniteQuery({
        ...getPlaceInfiniteQueryOptions(queryKey, 3),
      });
    }

    // 스와이퍼 이미지 데이터 수신
    const response = await pb
      .from('events')
      .getOne('xa406ln74v45u9v', { requestKey: null });
    const imageUrlArray = response.carouselImages?.map((filename) =>
      pb.files.getUrl(response, filename, { thumb: '500x0' })
    );

    return { placeData, imageUrlArray };
  };
