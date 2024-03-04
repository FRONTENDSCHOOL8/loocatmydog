import { StoryObj } from '@storybook/react';
import PlaceSection from './PlaceSection';

/**@type{import('@storybook/react').Meta} */
export default {
  component: PlaceSection,
};

type Story = StoryObj<typeof PlaceSection>;

export const 기본표시: Story = {
  args: {
    title: 'test',
  },
};
