import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

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

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    type: 'main',
    title: '타이틀',
  },
};
