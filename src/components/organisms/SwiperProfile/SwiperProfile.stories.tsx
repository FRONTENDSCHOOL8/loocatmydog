import { StoryObj } from '@storybook/react';
import SwiperProfile from './SwiperProfile';

/**@type{import('@storybook/react').Meta} */
export default {
  component: SwiperProfile,
};

type Story = StoryObj<typeof SwiperProfile>;

export const 기본표시: Story = {
  args: {},
};
