import { BrowserRouter } from 'react-router-dom';
import GlobalNavList from './GlobalNavList';

/**@type{import('@storybook/react').Meta} */
export default {
  component: GlobalNavList,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

/**@type{import('@storybook/react').StoryObj} */
export const 홈 = {
  args: {},
};
