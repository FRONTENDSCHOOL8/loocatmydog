import CheckBox from './CheckBox';

/**@type{import('@storybook/react').Meta} */
export default {
  component: CheckBox,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    isChecked: false,
    children: 'test',
    reservation: true,
  },
};
