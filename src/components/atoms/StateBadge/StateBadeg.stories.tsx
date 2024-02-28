import StateBadge from './StateBadge';

/**@type{import('@storybook/react').Meta} */
export default {
  component: StateBadge,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    isActive: true,
    mode: 'normal',
  },
};
