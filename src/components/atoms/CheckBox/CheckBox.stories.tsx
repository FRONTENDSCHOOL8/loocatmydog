import CheckBox from './CheckBox';

/**@type{import('@storybook/react').Meta} */
export default {
  component: CheckBox,
};

/**@type{import('@storybook/react').StoryObj} */
export const UnChecked = {
  args: {
    isChecked: false,
  },
};
