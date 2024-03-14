import { useQuery } from '@tanstack/react-query';
import { getChatRoomData } from './getChatRoomData';

export const useChatRoomData = (roomId: string, userId: string) => {
  return useQuery({
    queryKey: ['chatRoomData', roomId, userId],
    queryFn: () => getChatRoomData(roomId, userId),
  });
};
