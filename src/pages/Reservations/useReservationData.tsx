import { useQuery } from '@tanstack/react-query';
import getReservations from './getReservations';

const useReservationData = (userId: string) => {
  return useQuery({
    queryKey: ['reservationData', userId],
    queryFn: () => getReservations(userId),
  });
};

export default useReservationData;
