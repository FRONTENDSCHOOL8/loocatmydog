import BooleanBox from './BooleanBox';

/**@type{import('@storybook/react').Meta} */
export default {
  component: BooleanBox,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    title: '예약현황 알림',
    children: '플레이스 예약날짜 알림',
  },
};
