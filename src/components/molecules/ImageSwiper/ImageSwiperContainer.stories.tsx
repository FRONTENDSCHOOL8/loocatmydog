import { BrowserRouter } from 'react-router-dom';
import ImageSwiperContainer from './ImageSwiperContainer';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ImageSwiperContainer,
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
