import { useQuery } from '@tanstack/react-query';
import { getChatRoomData } from './getChatRoomData';

export const useChatRoomData = (
  roomId: string,
  userId: string,
  observer: any
) => {
  return useQuery({
    queryKey: ['chatRoomData', roomId, userId, observer],
    queryFn: () => getChatRoomData(roomId, userId),
  });
};
