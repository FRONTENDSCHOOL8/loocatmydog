import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { StoryObj } from '@storybook/react';

/**@type{import('@storybook/react').Meta} */
export default {
  component: Header,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

type Story = StoryObj<typeof Header>;

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시: Story = {
  args: {
    type: 'main',
    title: '타이틀',
  },
};
