import { StoryObj } from '@storybook/react';
import MyPage from './MyPage';
import { BrowserRouter } from 'react-router-dom';

/**@type{import('@storybook/react').Meta} */
export default {
  component: MyPage,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
type Story = StoryObj<typeof MyPage>;

export const 기본표시: Story = {
  args: {},
};
