import styled from 'styled-components';
import { useChatListData } from './useChatListData';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import pb from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';

const StyledChatList = styled.div`
  display: flex;
  flex-flow: column nowrap;

  & a:hover {
    text-decoration: none;
  }
`;

const ChatList = () => {
  // 로그인 유저 정보
  const currentUserData = useAuthStore.getState().user;
  const currentUserId = currentUserData?.id;

  // 로그인 여부 랜딩으로 보내기
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserId) {
      navigate('/');
    }
  }, []);

  const [observer, setObserver] = useState<boolean>(false);

  const { data, isLoading } = useChatListData(currentUserId, observer);
  const [chatRooms, setChatRooms] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    pb.from('chatRooms').subscribe('*', async (e) => {
      if (e.record) {
        setObserver(true);
      }
    });

    return () => {
      pb.collection('chatRooms').unsubscribe();
      setObserver(false);
    };
  });

  useEffect(() => {
    if (isLoading) return;

    if (data) {
      setChatRooms(data);
    }
  }, [data, isLoading]);

  return <StyledChatList>{chatRooms}</StyledChatList>;
};

export default ChatList;
