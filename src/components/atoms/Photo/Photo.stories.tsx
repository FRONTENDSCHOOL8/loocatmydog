import type { Meta, StoryObj } from '@storybook/react';
import Photo from './Photo.tsx';
import { ButtonProps } from './Photo.tsx';

const meta: Meta<ButtonProps> = {
  title: 'Photo',
  component: Photo,
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    type: 'default',
  },
};

export const Picture: Story = {
  args: {
    type: 'picture',
    imgSrc: '',
  },
};

export const Total: Story = {
  args: {
    type: 'total',
    imgSrc: '',
  },
};
