import { BrowserRouter } from 'react-router-dom';
import GlobalNavBar from './GlobalNavBar';

/**@type{import('@storybook/react').Meta} */
export default {
  component: GlobalNavBar,
  decorators: [
    (Story: any) => (
      <div style={{ inlineSize: '320px' }}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </div>
    ),
  ],
};

/**@type{import('@storybook/react').StoryObj} */

export const 기본표시 = {
  args: {
    isShown: true,
  },
};

export const 숨김표시 = {
  args: {
    isShown: false,
  },
};
