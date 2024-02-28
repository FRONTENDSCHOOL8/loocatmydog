import DateList from './DateList';

/**@type{import('@storybook/react').Meta} */
export default {
  component: DateList,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    year: 2022,
    month: 2,
    day: 22,
    dDay: '5-day',
  },
};
