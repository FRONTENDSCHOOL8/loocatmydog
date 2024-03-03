import { StoryObj } from '@storybook/react';
import SignUpAddress from './SignUpAddress';

/**@type{import('@storybook/react').Meta} */
export default {
  component: SignUpAddress,
};

type Story = StoryObj<typeof SignUpAddress>;

export const 기본표시: Story = {
  args: {},
};
