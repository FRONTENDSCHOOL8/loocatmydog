import { StoryObj } from '@storybook/react';
import Calendar from './Calendar';
import SearchInput from '@/components/molecules/SearchInput/SearchInput';

/**@type{import('@storybook/react').Meta} */
export default {
  component: Calendar,
};

type Story = StoryObj<typeof Calendar>;

export const 기본표시: Story = {
  args: {
    dateRange: [new Date('2024-03-02'), new Date('2024-03-02')],
    minMaxDateRange: [new Date('2024-03-02'), new Date('2024-03-21')],
    isModal: false,
    setDateRange: (date) => console.log(date),
  },
};
