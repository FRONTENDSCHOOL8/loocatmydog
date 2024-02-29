import { BrowserRouter } from 'react-router-dom';
import BigPhoto from './BigPhoto.tsx';

/**@type{import('@storybook/react').Meta} */
export default {
  component: BigPhoto,
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
export const 기본표시 = {
  args: {
    type: 'default',
  },
};

export const 사진표시 = {
  args: {
    type: 'picture',
  },
};

export const 페이지이동사진 = {
  args: {
    type: 'link',
  },
};
