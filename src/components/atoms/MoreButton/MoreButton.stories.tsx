import MoreButton from './MoreButton';

/**@type{import('@storybook/react').Meta} */
export default {
  component: MoreButton,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본상태 = {
  args: {
    text: '더보기',
    onClick: () => {
      console.log('더보기');
    },
  },
};

export const 응용상태 = {
  args: {
    text: '긴버튼도만들수있습니다.',
    onClick: () => {
      console.log('1');
    },
  },
};
