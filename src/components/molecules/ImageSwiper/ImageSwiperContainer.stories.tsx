import ImageSwiperContainer from './ImageSwiperContainer';

/**@type{import('@storybook/react').Meta} */
export default {
  component: ImageSwiperContainer,
  decorators: [
    (Story: any) => (
      <div style={{ inlineSize: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

/**@type{import('@storybook/react').StoryObj} */
export const 기본표시 = {
  args: {},
};
