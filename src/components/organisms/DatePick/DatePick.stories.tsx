import { StoryObj } from '@storybook/react';
import DatePick from './DatePick';

/**@type{import('@storybook/react').Meta} */
export default {
  component: DatePick,
};

type Story = StoryObj<typeof DatePick>;

export const 기본표시: Story = {
  args: {},
};
