import pb from './pocketbase';

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
  const newResponseItems = response.items.map((item) => {
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
  return { ...response, items: newResponseItems };
};
