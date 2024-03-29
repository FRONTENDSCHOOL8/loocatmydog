import { StoryObj } from '@storybook/react';
import InputTypes from './InputTypes';

/**@type{import('@storybook/react').Meta} */
export default {
  component: InputTypes,
};

type Story = StoryObj<typeof InputTypes>;

export const 기본표시: Story = {
  args: {
    check: false,
    name: '이름',
    list: ['댕댕이'],
    unit: '',
  },
};
