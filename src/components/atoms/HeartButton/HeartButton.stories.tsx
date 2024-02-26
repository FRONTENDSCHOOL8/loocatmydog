import { StoryObj } from '@storybook/react';
import HeartButton from './HeartButton';

/**@type{import('@storybook/react').Meta} */
export default {
  component: HeartButton,
  tags: ['autodocs'],
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시: StoryObj<typeof HeartButton> = {
  args: {
    fill: false,
  },
};
