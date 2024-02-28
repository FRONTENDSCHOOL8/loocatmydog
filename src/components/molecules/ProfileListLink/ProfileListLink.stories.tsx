import { BrowserRouter } from 'react-router-dom';
import ProfileListLink from './ProfileListLink';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ProfileListLink,
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
    accordion: false,
    accordionContent: '아무거나',
  },
};
