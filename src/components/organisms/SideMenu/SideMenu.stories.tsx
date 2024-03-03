import { StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import SideMenu from './SideMenu';

/**@type{import('@storybook/react').Meta} */
export default {
  component: SideMenu,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <div style={{ inlineSize: '320px' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

type Story = StoryObj<typeof SideMenu>;

export const 기본표시: Story = {
  args: {},
};
