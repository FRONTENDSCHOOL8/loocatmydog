import { StoryObj } from '@storybook/react';
import ProfileCard from './ProfileCard';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ProfileCard,
};

type Story = StoryObj<typeof ProfileCard>;

export const 기본표시: Story = {
  args: {
    name: '테스트',
    children: '테스트입니다',
    isChecked: true,
    profile: true,
  },
};
