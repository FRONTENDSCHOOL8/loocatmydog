import { StoryObj } from '@storybook/react';
import DateDivider from './DateDivider';

/**@type{import('@storybook/react').Meta} */
export default {
  component: DateDivider,
};

type Story = StoryObj<typeof DateDivider>;

export const 기본표시: Story = {
  args: {
    date: new Date().getTime(),
  },
};
