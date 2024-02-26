import DropDown from './DropDown.tsx';

/**@type{import('@storybook/react').Meta} */
export default {
  component: DropDown,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본상태 = {
  args: {
    current: '거리순',
    items: ['거리순', '가격순', '인기순'],
    setCurrent: (value: any) => {
      console.log(value);
    },
  },
};

export const 추가상태 = {
  args: {
    current: '햄버거',
    items: ['피자', '치킨', '곱창볶음나라', '떡볶이'],
    setCurrent: (value: any) => {
      console.log(value);
    },
  },
};
