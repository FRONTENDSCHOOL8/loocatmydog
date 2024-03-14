import pb from '@/api/pocketbase';
import { and } from 'typed-pocketbase';

// placeId, senderId, receiverId, message

const createChatRoom = async (
  placeId: string,
  senderId: string,
  receiverId: string,
  message: string
) => {
  // 채팅 룸 확인
  const findRoom = await pb.from('chatRooms').getFullList({
    filter: and(
      ['members', '~', senderId],
      ['members', '~', receiverId],
      ['placeId', '=', placeId]
    ),
  });

  if (findRoom.length > 0) {
    location.href = `/chat_room/${findRoom[0].id}`;
  } else {
    const currentDate = new Date();

    const data = {
      placeId: placeId,
      members: [senderId, receiverId],
      messageBox: [
        {
          message: message,
          read: false,
          sendDate: currentDate,
          userId: senderId,
        },
      ],
    };

    const record = await pb.from('chatRooms').create(data);
    location.href = `/chat_list`;
  }
};

export default createChatRoom;
