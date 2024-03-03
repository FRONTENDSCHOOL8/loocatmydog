import { StoryObj } from '@storybook/react';
import PlaceTitleSection from './PlaceTitle';

/**@type{import('@storybook/react').Meta} */
export default {
  component: PlaceTitleSection,
};

type Story = StoryObj<typeof PlaceTitleSection>;

export const 기본표시: Story = {
  args: {},
};
