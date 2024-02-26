import LogoInline from './LogoInline';

/**@type{import('@storybook/react').Meta} */
export default {
  component: LogoInline,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    widthHeight: {
      blockSize: 50,
      inlineSize: 20,
    },
  },
};
