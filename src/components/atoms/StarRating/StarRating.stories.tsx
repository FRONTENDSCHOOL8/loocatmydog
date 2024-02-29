import StarRating from './StarRating';

/**@type{import('@storybook/react').Meta} */
export default {
  component: StarRating,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    fill: true,
  },
};
