import { StoryObj } from '@storybook/react';
import SignUpEmail from './SignUpEmail';

/**@type{import('@storybook/react').Meta} */
export default {
  component: SignUpEmail,
};

type Story = StoryObj<typeof SignUpEmail>;

export const 기본표시: Story = {
  args: {},
};
