import { StoryObj } from '@storybook/react';
import AnimalRateInput from './AnimalRateInput';

/**@type{import('@storybook/react').Meta} */
export default {
  component: AnimalRateInput,
};

type Story = StoryObj<typeof AnimalRateInput>;

export const 기본표시: Story = {
  args: {},
};
