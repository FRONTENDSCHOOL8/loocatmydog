import { useAuthStore } from '@/store/useAuthStore';
import pb from './pocketbase';
import getDistanceByAddress from '@/utils/getDistanceByAddress';

// FullList로 가져오기
export const fetchPlaceFullList = async (
  options: { sort?: string; filter?: string } = {}
) => {
  const sortString = options?.sort || '@random';
  const filterString = options?.filter || '';
  const response = await pb.from('places').getFullList({
    select: {
      expand: {
        userId: true,
        'boards(placeId)': true,
      },
    },
    // @ts-ignore : typed-pocketbase가 @random을 지원하지 않음
    sort: sortString,
    filter: filterString,
    requestKey: null,
  });
  // 필요한 데이터 추가 (별점, 리뷰갯수)
  const newResponse = [...response].map((item) => {
    const newPhoto = item.photo.map((photo: string) => {
      const url = pb.files.getUrl(item, photo, { thumb: '500x0' });
      return url;
    });
    const reviewCount = item.expand?.['boards(placeId)']?.length || 0;
    const totalStar =
      item.expand?.['boards(placeId)']?.reduce(
        (acc, cur) => (acc += cur.rate),
        0
      ) || 0;
    const averageStar = isNaN(totalStar / reviewCount)
      ? 0
      : totalStar / reviewCount;
    return { ...item, photo: newPhoto, averageStar, reviewCount };
  });
  return newResponse;
};

// List로 가져오기
export const fetchPlaceList = async (
  pageInfo: any,
  perPage = 1,
  options = {}
) => {
  const myData = useAuthStore.getState().user;

  const response = await pb
    .from('places')
    .getList(pageInfo.pageParam, perPage, {
      select: {
        expand: {
          userId: true,
          'boards(placeId)': true,
        },
      },
      ...options,
      requestKey: null,
    });

  // 필요한 데이터 추가 (별점, 리뷰갯수)
  const newResponseItems = await Promise.all(
    response.items.map(async (item) => {
      // 이미지 url로 변환 후 삽입
      const newPhoto = item.photo.map((photo: string) => {
        const url = pb.files.getUrl(item, photo, { thumb: '500x0' });
        return url;
      });

      // 리뷰 갯수와 별점평균 삽입
      const reviewCount = item.expand?.['boards(placeId)']?.length || 0;
      const totalStar =
        item.expand?.['boards(placeId)']?.reduce(
          (acc, cur) => (acc += cur.rate),
          0
        ) || 0;
      const averageStar = isNaN(totalStar / reviewCount)
        ? 0
        : totalStar / reviewCount;

      // 거리 구하고 삽입

      const distance = myData
        ? +(await getDistanceByAddress(myData.address, item.address)).toFixed(3)
        : 9999;
      // 최종 삽입
      return { ...item, photo: newPhoto, averageStar, reviewCount, distance };
    })
  );

  return { ...response, items: newResponseItems };
};
