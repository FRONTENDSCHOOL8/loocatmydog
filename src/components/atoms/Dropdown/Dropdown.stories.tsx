import type { Meta, StoryObj } from '@storybook/react';
import Dropdown, { DropdownProps } from './Dropdown.tsx';

const meta: Meta<DropdownProps> = {
  title: 'Dropdown',
  component: Dropdown,
};

export default meta;

type Story = StoryObj<DropdownProps>;

export const inActive: Story = {
  args: {
    type: 'inactive',
  },
};

export const Active: Story = {
  args: {
    type: 'active',
  },
};

export const More: Story = {
  args: {
    type: 'more',
  },
};
