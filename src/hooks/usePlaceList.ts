import { fetchPlaceList } from '@/pages/Main';
import { useQuery } from '@tanstack/react-query';

const usePlaceList = () => {
  return useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaceList,
    staleTime: 1 * 5 * 1000,
  });
};

export default usePlaceList;
