import styled from 'styled-components';
import { useChatListData } from './useChatListData';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
const StyledChatList = styled.div`
  display: flex;
  flex-flow: column nowrap;

  & a:hover {
    text-decoration: none;
  }
`;

const ChatList = () => {
  const currentUserData = useAuthStore.getState().user;
  const currentUserId = currentUserData?.id;

  const { data, isLoading } = useChatListData(currentUserId);
  const [chatRooms, setChatRooms] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    if (isLoading) return;

    if (data) {
      setChatRooms(data);
    }
  }, [data, isLoading]);

  return <StyledChatList>{chatRooms}</StyledChatList>;
};

export default ChatList;
