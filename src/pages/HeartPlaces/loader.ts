import { fetchPlaceFullList } from '@/api/fetchPlaceList';
import { useAuthStore } from '@/store/useAuthStore';
import { convertFilterString } from '@/utils';

export const loader = async () => {
  const myData = useAuthStore.getState().user;
  const heartList = myData?.heart;
  const filterString = convertFilterString('id', '=', heartList);
  if (!filterString) return [];
  const response = await fetchPlaceFullList({
    filter: filterString,
  });
  return response;
};
