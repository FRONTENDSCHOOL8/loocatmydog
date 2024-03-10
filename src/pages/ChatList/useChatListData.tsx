import { useQuery } from '@tanstack/react-query';
import { getChatListData } from './getChatListData';

export const useChatListData = (userId: string, observer: boolean) => {
  return useQuery({
    queryKey: ['chatListData', userId, observer],
    queryFn: () => {
      return getChatListData(userId);
    },
  });
};
