import { StoryObj } from '@storybook/react';
import SignUpPhone from './SignUpPhone';

/**@type{import('@storybook/react').Meta} */
export default {
  component: SignUpPhone,
};

type Story = StoryObj<typeof SignUpPhone>;

export const 기본표시: Story = {
  args: {},
};
