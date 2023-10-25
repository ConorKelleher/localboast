import type { Meta, StoryObj } from '@storybook/react';
import useUpdatingRef from '.';
import { Text } from '@mantine/core';

const UseUpdatingRefDemo = () => {
  const updatingRef = useUpdatingRef<HTMLElement| null>(null)
  return <Text size="xl" ref={(ref) => updatingRef.current = ref}>Test</Text>
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