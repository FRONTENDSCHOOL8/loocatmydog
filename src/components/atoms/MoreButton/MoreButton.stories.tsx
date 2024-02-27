import { BrowserRouter } from 'react-router-dom';
import MoreButton from './MoreButton';

/**@type{import('@storybook/react').Meta} */
export default {
  component: MoreButton,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본상태 = {
  args: {
    text: '더보기',
    path: '/',
  },
};

export const 응용상태 = {
  args: {
    text: '긴버튼도만들수있습니다.',
    path: '/',
  },
};
