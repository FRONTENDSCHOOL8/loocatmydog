import { BrowserRouter } from 'react-router-dom';
import ButtonPlus from './ButtonPlus';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ButtonPlus,
  decorators: [
    (Story: any) => {
      <BrowserRouter>
        <Story />
      </BrowserRouter>;
    },
  ],
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {};
