import pb from './pocketbase';

// FullList로 가져오기
export const fetchPlaceFullList = async () => {
  const response = await pb.from('places').getFullList({
    select: {
      expand: {
        userId: true,
        'boards(placeId)': true,
      },
    },
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
  console.log('fetchPlaceList 호출, 페이지넘버', pageInfo.pageParam);
  console.log('fetchPlaceList 호출, perPage', perPage);
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
