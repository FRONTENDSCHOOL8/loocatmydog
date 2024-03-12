import PaymentCard from './PaymentCard';

/**@type{import('@storybook/react').Meta} */
export default {
  component: PaymentCard,
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {
    userPay: true,
  },
};
