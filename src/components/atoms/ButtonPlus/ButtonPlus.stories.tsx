import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import ButtonPlus from './ButtonPlus';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ButtonPlus,
  decorators: [
    (Story: any) => {
      <MemoryRouter>
        <Story />
      </MemoryRouter>;
    },
  ],
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  path: '/',
};
