import pb from '@/api/pocketbase';

// placeId, senderId, receiverId, message

const createChatRoom = async (
  placeId: string,
  senderId: string,
  receiverId: string,
  message: string
) => {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  const data = {
    placeId: placeId,
    memebers: [senderId, receiverId],
    messageBox: [
      {
        message: message,
        read: false,
        sendDate: currentTime,
        userId: senderId,
      },
    ],
  };

  const record = await pb.from('chatRooms').create(data);

  console.log(record);
};

export default createChatRoom;
