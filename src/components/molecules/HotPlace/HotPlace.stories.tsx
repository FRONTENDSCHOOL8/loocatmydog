import HotPlace from './HotPlace';

/**@type{import('@storybook/react').Meta} */
export default {
  component: HotPlace,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    src: '/images/place-ex.jpg',
    title: '플레이스 제목',
    rate: 5,
    reviewNumber: 2,
    address: '서울 구로구',
  },
};
