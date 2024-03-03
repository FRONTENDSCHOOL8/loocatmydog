import { StoryObj } from '@storybook/react';
import SignUpAgree from './SignUpAgree';

/**@type{import('@storybook/react').Meta} */
export default {
  component: SignUpAgree,
};

type Story = StoryObj<typeof SignUpAgree>;

export const 기본표시: Story = {
  args: {},
};
