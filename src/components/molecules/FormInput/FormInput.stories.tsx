import FormInput from './FormInput';

/**@type{import('@storybook/react').Meta} */
export default {
  component: FormInput,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    mode: 'register',
    children: '이름',
    placeholder: '실명 입력',
    hiddenLabel: false,
  },
};
