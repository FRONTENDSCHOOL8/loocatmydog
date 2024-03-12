import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useChatRoomData } from './useChatRoomData';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import pb from '@/api/pocketbase';
import { useAuthStore } from '@/store/useAuthStore';

const StyledChatRoom = styled.div`
  inline-size: 100%;
  block-size: 100%;
  display: flex;
  flex-flow: column;

  & a {
    font-size: 12px;
    position: absolute;
    right: 15px;
    top: 17px;
  }

  & form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 15px;

    padding: 15px 15px;
  }
  .chatArea {
    inline-size: 100%;
    block-size: 100%;
    background-color: ${(props) => props.theme.colors.gray100};
    padding: 15px;
    display: flex;
    flex-flow: column nowrap;
    gap: 15px;
    overflow: auto;
  }

  .addImage {
    inline-size: 26px;
    block-size: 26px;
    overflow: hidden;

    & label {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      color: #919191;
      line-height: 100%;
      cursor: pointer;
    }

    #addImage {
      display: none;
    }
  }

  .messageInput {
    inline-size: 100%;

    #messageArea {
      inline-size: 100%;
      block-size: 100%;
      border: 0px;
      border-radius: 20px;
      padding: 10px;
      background-color: ${(props) => props.theme.colors.gray100};
    }

    #messageArea:focus {
      outline: none;
    }
  }

  .chatSubmitBtn {
    inline-size: 26px;
    block-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ChatRoom = () => {
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

  // 채팅방 id 값
  const roomId = useParams().id as string;
  const [chatItems, setChatItems] = useState<React.JSX.Element[]>([]);
  const [placeId, setPlaceId] = useState<string>('');
  const [observer, setObserver] = useState<boolean>(false);

  useEffect(() => {
    pb.collection('chatRooms').subscribe(roomId, async (e) => {
      if (e.record.messageBox) {
        setObserver(true);
      }
    });

    return () => {
      pb.collection('chatRooms').unsubscribe(roomId);
      setObserver(false);
    };
  });

  const { data, isLoading } = useChatRoomData(roomId, currentUserId, observer);

  useEffect(() => {
    if (isLoading) return;

    if (data) {
      setChatItems(data.chatItem);
      const defaultData = data.default;
      setPlaceId(defaultData.placeId);
    }
  }, [data, isLoading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const defaultData = data?.default;
    const messageBox = defaultData?.messageBox;

    const textInput = document.getElementById('messageArea');

    const message = (textInput as HTMLInputElement).value;

    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    const messageData = {
      message: message,
      read: false,
      sendDate: currentDate,
      userId: currentUserId,
    };

    messageBox.push(messageData);

    const record = await pb
      .from('chatRooms')
      .update(roomId, { messageBox: messageBox });

    (textInput as HTMLInputElement).value = '';
  };

  // 스크롤 아래로
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatItems]);

  return (
    <StyledChatRoom>
      <Link to={`/place_detail/${placeId}`}>바로가기</Link>
      <div className="chatArea" ref={scrollRef}>
        {chatItems}
      </div>
      <Form
        id="chatroomForm"
        method="post"
        action={`/chatroom/${roomId}`}
        onSubmit={handleSubmit}
      >
        <div className="addImage">
          <label htmlFor="addImage">+</label>
          <input type="file" name="addImage" id="addImage" />
        </div>
        <div className="messageInput">
          <label htmlFor="messageArea"></label>
          <input
            type="text"
            name="messageArea"
            id="messageArea"
            placeholder="메세지 보내기"
            autoComplete="off"
          />
        </div>
        <button className="chatSubmitBtn" type="submit" form="chatroomForm">
          <img src="/images/iconSend.svg" alt="" />
        </button>
      </Form>
    </StyledChatRoom>
  );
};

export default ChatRoom;
