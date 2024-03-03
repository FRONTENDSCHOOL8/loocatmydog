import { StoryObj } from '@storybook/react';
import Splash from './Splash';

/**@type{import('@storybook/react').Meta} */
export default {
  component: Splash,
};

type Story = StoryObj<typeof Splash>;

export const 기본표시: Story = {
  args: {},
};
