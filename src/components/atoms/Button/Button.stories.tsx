import Button from './Button';

/**@type{import('@storybook/react').Meta} */
export default {
  component: Button,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    size: 10,
    invalid: false,
    rounded: false,
    mode: '',
    children: '버튼',
  },
};
