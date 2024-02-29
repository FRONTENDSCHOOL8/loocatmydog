import { StoryObj } from '@storybook/react';
import InputWrapper from './InputWrapper';

/**@type{import('@storybook/react').Meta} */
export default {
  component: InputWrapper,
};

type Story = StoryObj<typeof InputWrapper>;

export const 기본표시: Story = {
  args: {},
};
