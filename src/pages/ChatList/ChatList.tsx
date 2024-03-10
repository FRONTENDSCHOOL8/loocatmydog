import styled from 'styled-components';
import { useChatListData } from './useChatListData';
import React, { useEffect, useState } from 'react';
const StyledChatList = styled.div`
  display: flex;
  flex-flow: column nowrap;

  & a:hover {
    text-decoration: none;
  }
`;

const userId = 'qx6lpgtzmsdy3id';

const ChatList = () => {
  const { data, isLoading } = useChatListData(userId);
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
