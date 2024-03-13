import { StoryObj } from '@storybook/react';
import EventPopup from './EventPopup';

/**@type{import('@storybook/react').Meta} */
export default {
  component: EventPopup,
};

type Story = StoryObj<typeof EventPopup>;

export const 기본표시: Story = {
  args: {},
};
