import { StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

/**@type{import('@storybook/react').Meta} */
export default {
  component: LoadingSpinner,
};

type Story = StoryObj<typeof LoadingSpinner>;

export const 기본표시: Story = {
  args: {},
};
