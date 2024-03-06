import UserProfile from './UserProfile';

/**@type{import('@storybook/react').Meta} */
export default {
  component: UserProfile,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    src: '/images/profileNone.svg',
    name: '홍길동',
  },
};
