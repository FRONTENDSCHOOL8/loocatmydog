import { StoryObj } from '@storybook/react';
import ChatItem from './ChatItem';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ChatItem,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};

type Story = StoryObj<typeof ChatItem>;

export const 기본표시: Story = {
  args: {
    isOwn: false,
    username: '김개냥',
    attachImageUrl: ['/images/story_sample1.jpg'],
    message:
      '메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. 메세지입니다. ',
    sendDate: new Date().getTime(),
  },
};
