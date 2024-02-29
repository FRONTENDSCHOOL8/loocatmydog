import { StoryObj } from '@storybook/react';
import HeartList from './HeartList';

/**@type{import('@storybook/react').Meta} */
export default {
  component: HeartList,
};

type Story = StoryObj<typeof HeartList>;

export const 기본표시: Story = {
  args: {},
};
