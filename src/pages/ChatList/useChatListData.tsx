import { QueryObserver, useQuery } from '@tanstack/react-query';
import { getChatListData } from './getChatListData';

export const useChatListData = (userId: string) => {
  return useQuery({
    queryKey: ['chatListData', userId],
    queryFn: () => {
      return getChatListData(userId);
    },
  });
};
