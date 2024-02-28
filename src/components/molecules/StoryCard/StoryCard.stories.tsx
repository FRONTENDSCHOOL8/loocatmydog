import { StoryObj } from '@storybook/react';
import StoryCard from './StoryCard';

/**@type{import('@storybook/react').Meta} */
export default {
  component: StoryCard,
};

type Story = StoryObj<typeof StoryCard>;

/**@type{import('@storybook/react').StoryObj} */
export const 스토리카드: Story = {
  args: {
    type: 'story',
    profileImageUrl: 'images/starDog.svg',
    username: '김개냥',
    starCount: 3,
    attachImageUrl: [
      '/images/story_sample1.jpg',
      '/images/story_sample2.jpg',
      '/images/story_sample3.jpg',
      '/images/story_sample4.jpg',
    ],
    createdDate: new Date().getTime(),
    text: '텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.',
  },
};

export const 리뷰카드: Story = {
  args: {
    type: 'review',
    profileImageUrl: 'images/starDog.svg',
    username: '김개냥',
    starCount: 3,
    attachImageUrl: [
      '/images/story_sample1.jpg',
      '/images/story_sample2.jpg',
      '/images/story_sample3.jpg',
      '/images/story_sample4.jpg',
    ],
    createdDate: new Date().getTime(),
    text: '텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.텍스트가 들어가는 칸입니다.',
  },
};
