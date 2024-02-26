import Tag from './Tag';

/**@type{import('@storybook/react').Meta} */
export default {
  component: Tag,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    children: '태그',
    inlineSize: 24,
  },
};
