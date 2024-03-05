import { StoryObj } from '@storybook/react';
import AnimalPick from './AnimalPick';

/**@type{import('@storybook/react').Meta} */
export default {
  component: AnimalPick,
};

type Story = StoryObj<typeof AnimalPick>;

export const 기본표시: Story = {
  args: {},
};
