import { UsersResponse } from '@/@types/database';
import pb from '@/api/pocketbase';
import ChatRoomList from '@/components/molecules/ChatRoomList/ChatRoomList';
import getPbImageURL from '@/utils/getPbImageURL';
import { Link } from 'react-router-dom';

export const getChatListData = async (userId: string) => {
  const response = await pb.from('chatRooms').getFullList({
    sort: '-updated',
    filter: `members ~ "${userId}"`,
    select: {
      expand: {
        placeId: true,
        members: true,
      },
    },
  });

  const newResponse = response.map((data, index) => {
    const userDatas = data.expand as any;
    let placeName = userDatas.placeId.title;
    if (placeName.length > 8) {
      placeName = `${placeName.substr(0, 8)}...`;
    }

    let sender;

    // sender에 보낸이 정보 저장
    if (data.members[0] === userId) {
      sender = userDatas.members[1];
    } else {
      sender = userDatas.members[0];
    }

    // 채팅 데이터
    const chatData = data.messageBox;

    // 마지막 메세지
    let lastMessage = null;

    // 안 읽은 메세지 수
    let count = 0;

    // 마지막 시간
    let time = 0;

    if (chatData) {
      // 마지막 데이터
      const lastChatDataReceieve = chatData[chatData.length - 1];

      // 마지막 메세지
      lastMessage = lastChatDataReceieve.message;

      // 안 읽은 메세지 수
      chatData.forEach((data: { userId: string; read: boolean }) => {
        if (!data.read && data.userId !== userId) {
          count += 1;
        }
      });

      // 마지막 시간
      const dataTime = new Date(lastChatDataReceieve.sendDate);
      time = dataTime.getTime();
    } else {
      console.log('실패했습니다');
    }

    // 보낸이 프로필 사진
    let senderImg;
    if (sender.avatar === '') {
      senderImg = '/images/profileNone.svg';
    } else {
      senderImg = getPbImageURL(sender.collectionId, sender.id, sender.avatar);
    }

    // 채팅방 id
    const id = data.id;

    return (
      <Link key={index} to={`/chat_room/${id}`}>
        <ChatRoomList
          name={`${sender.name} [${placeName}]`}
          recentMessage={lastMessage}
          createdDate={time}
          chatCount={count}
          src={senderImg}
        />
      </Link>
    );
  });

  return newResponse;
};
