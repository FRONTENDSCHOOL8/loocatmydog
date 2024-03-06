import { BrowserRouter } from 'react-router-dom';
import Reservations from './Reservations';

/**@type{import('@storybook/react').Meta} */

export default {
  component: Reservations,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <div style={{ inlineSize: '320px' }}>
          <Reservations />
        </div>
      </BrowserRouter>
    ),
  ],
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {};
