import { UsersResponse } from '@/@types/database';
import pb from '@/api/pocketbase';
import ChatItem from '@/components/molecules/ChatItem/ChatItem';
import setChatRead from './setChatRead';
import { and } from 'typed-pocketbase';
import compareDate from './compareDate';
import DateDivider from '@/components/atoms/DateDivider/DateDivider';

export const getChatRoomData = async (roomId: string, userId: string) => {
  const responseData = await pb.from('chatRooms').getFullList({
    select: {
      expand: {
        members: true,
      },
    },
    filter: and(['id', '=', roomId], ['members', '~', userId]),
  });

  const response = responseData[0];

  setChatRead(roomId, userId, response);

  const userDatas = response?.expand as { members: UsersResponse[] };

  // 발신자 정보
  let sender: { name: string };

  if (response?.members[0] === userId) {
    sender = userDatas.members[1];
  } else {
    sender = userDatas.members[0];
  }

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
      const isDivide = compareDate(date);
      const sendDate = date.getTime();

      return (
        <>
          {!isDivide ? <DateDivider date={date} /> : null}
          <ChatItem
            key={index}
            id={String(index)}
            isOwn={isOwn}
            message={message}
            username={username}
            sendDate={sendDate}
          />
        </>
      );
    }
  );

  const data = { default: response, chatItem: newResponse, senderData: sender };

  return data;
};
