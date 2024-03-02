import { BrowserRouter } from 'react-router-dom';
import ContentSwiperContainer from './ContentSwiperContainer';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ContentSwiperContainer,
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
  args: {},
};
