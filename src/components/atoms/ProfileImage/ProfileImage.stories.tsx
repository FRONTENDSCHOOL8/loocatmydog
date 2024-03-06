import ProfileImage from './ProfileImage';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ProfileImage,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    src: '/images/grayCircle.svg',
    blockSize: 40,
    inlineSize: 40,
  },
};
