import { BrowserRouter } from 'react-router-dom';
import Stories from './Stories';

/**@type{import('@storybook/react').Meta} */

export default {
  component: Stories,
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

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {};
