import { StoryObj } from '@storybook/react';
import AnimalRateInput from './AnimalRateInput';

/**@type{import('@storybook/react').Meta} */
export default {
  component: AnimalRateInput,
};

type Story = StoryObj<typeof AnimalRateInput>;

export const 기본표시: Story = {
  args: {
    price: 62000,
    name: '소형금액',
    size: '소형',
  },
};
