import { PlacesResponse } from '@/@types/database';
import pb from '@/api/pocketbase';
import { QueryClient } from '@tanstack/react-query';

export const fetchPlaceList = async () => {
  const response = await pb.from('places').getFullList({
    select: {
      expand: {
        userId: true,
      },
    },
  });

  const newResponse = [...response].map((item) => {
    const newPhoto = item.photo.map((photo: string) => {
      const url = pb.files.getUrl(item, photo, { thumb: '500x0' });
      return url;
    });
    return { ...item, photo: newPhoto };
  });
  return newResponse;
};

export const loader = (queryClient: QueryClient) => async () => {
  return await queryClient.ensureQueryData({
    queryKey: ['places'],
    queryFn: fetchPlaceList,
  });
};
