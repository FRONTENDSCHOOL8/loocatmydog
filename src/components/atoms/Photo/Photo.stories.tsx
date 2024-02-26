import Photo from './Photo.tsx';

/**@type{import('@storybook/react').Meta} */
export default {
  component: Photo,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    type: 'default',
  },
};

export const 사진표시 = {
  args: {
    type: 'photo',
  },
};

export const 총_개수 = {
  args: {
    type: 'total',
  },
};
