import { fetchPlaceFullList } from '@/api/fetchPlaceList';
import { useAuthStore } from '@/store/useAuthStore';

export const loader = async () => {
  const myData = useAuthStore.getState().user;
  if (!myData) return null;
  const response = await fetchPlaceFullList({
    filter: `userId = "${myData.id}"`,
  });
  return response;
};
