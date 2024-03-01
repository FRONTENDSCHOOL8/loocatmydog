import { StoryObj } from '@storybook/react';
import ModifyProfile from './ModifyProfile';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ModifyProfile,
};

type Story = StoryObj<typeof ModifyProfile>;

export const 기본표시: Story = {
  args: {},
};
