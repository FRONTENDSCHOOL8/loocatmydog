import { StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';

/**@type{import('@storybook/react').Meta} */
export default {
  component: SearchInput,
};

type Story = StoryObj<typeof SearchInput>;

export const 기본표시: Story = {
  args: {
    address: '마포구',
    dateRange: [new Date(), new Date()],
  },
};
