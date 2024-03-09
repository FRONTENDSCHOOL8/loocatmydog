import pb from './pocketbase';

export const fetchPlaceFullList = async () => {
  const response = await pb.from('places').getFullList({
    select: {
      expand: {
        userId: true,
        'boards(placeId)': true,
      },
    },
  });
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

const PER_PAGE = 1;
export const fetchPlaceList = async (pageInfo: any) => {
  console.log('pageInfo', pageInfo);
  const response = await pb
    .from('places')
    .getList(pageInfo.pageParam, PER_PAGE, {
      select: {
        expand: {
          userId: true,
          'boards(placeId)': true,
        },
      },
    });

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
