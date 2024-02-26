import ButtonList from './ButtonCheck';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ButtonList,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    isChecked: false,
    name: '버튼',
    children: '설명이 들어가는 곳입니다',
  },
};
