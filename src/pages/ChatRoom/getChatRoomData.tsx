import { UsersResponse } from '@/@types/database';
import pb from '@/api/pocketbase';
import ChatItem from '@/components/molecules/ChatItem/ChatItem';

// const getChatRoom = (roomId: string) => {
//   try {
//     return pb.from('chatRooms').getOne(roomId, {
//       select: {
//         expand: {
//           members: true,
//         },
//       },
//     });
//   } catch (error) {
//     console.log('error while get: ', error);
//   }
// };

export const getChatRoomData = async (roomId: string, userId: string) => {
  const response = await pb.from('chatRooms').getOne(roomId, {
    select: {
      expand: {
        members: true,
      },
    },
  });

  // let response = await getChatRoom(roomId);

  // pb.from('chatRooms').subscribe(roomId, async (e) => {
  //   response = await getChatRoom(roomId);
  // });

  console.log(response);

  const userDatas = response?.expand as { members: UsersResponse[] };

  // 발신자 정보
  let sender: { name: string };

  if (response?.members[0] === userId) {
    sender = userDatas.members[1];
  } else {
    sender = userDatas.members[0];
  }

  console.log(sender);

  // 채팅
  const chatData = response?.messageBox;

  const newResponse = chatData.map(
    (
      data: {
        userId: string;
        message: string;
        userName: string;
        sendDate: Date;
      },
      index: number
    ) => {
      const isOwn = data.userId === userId;
      const message = data.message;
      const username = sender.name;
      const date = new Date(data.sendDate);
      const sendDate = date.getTime();

      return (
        <ChatItem
          key={index}
          id={String(index)}
          isOwn={isOwn}
          message={message}
          username={username}
          sendDate={sendDate}
        />
      );
    }
  );

  const data = { default: response, chatItem: newResponse, senderData: sender };

  return data;
};
