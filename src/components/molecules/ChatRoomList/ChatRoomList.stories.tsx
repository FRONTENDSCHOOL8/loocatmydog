import ChatRoomList from './ChatRoomList';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ChatRoomList,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    name: '펫플래닛',
    recentMessage: '채팅 메세지를 입력해주세요',
    timeAgo: '12시간',
    chatCount: 5,
  },
};
