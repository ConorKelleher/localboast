import type { Meta, StoryObj } from '@storybook/react';
import useUpdatingRef from '.';

const UseUpdatingRefDemo = () => {
  const ref = useUpdatingRef(true)
  return null
}

const meta = {
  // title: "Hooks/useUpdatingRef",
  component: UseUpdatingRefDemo,
} satisfies Meta<typeof UseUpdatingRefDemo>;

export default meta;
type Story = StoryObj<typeof UseUpdatingRefDemo>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};