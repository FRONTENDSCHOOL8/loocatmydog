import { ChatRoomsUpdate } from '@/@types/database';
import pb from '@/api/pocketbase';

const setChatRead = async (
  roomId: string,
  userId: string,
  response: ChatRoomsUpdate
) => {
  const messageBox = response.messageBox;

  const setMessageRead = messageBox.map(
    (chatData: { userId: string; read: boolean }) => {
      let setRead;

      if (chatData.userId !== userId) {
        setRead = { ...chatData, read: true };
      } else {
        setRead = { ...chatData };
      }

      return setRead;
    }
  );

  const newData = {
    ...response,
    messageBox: setMessageRead,
  };

  const record = await pb.from('chatRooms').update(roomId, newData);
};

export default setChatRead;
