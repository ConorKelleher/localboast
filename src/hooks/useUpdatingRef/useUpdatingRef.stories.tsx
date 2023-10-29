import type { Meta, StoryObj } from "@storybook/react"
import { UseUpdatingRefDemo } from "./demo"

const meta = {
  title: "Hooks/useUpdatingRef",
  component: UseUpdatingRefDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseUpdatingRefDemo>

export default meta
type Story = StoryObj<typeof UseUpdatingRefDemo>

export const Primary: Story = {
  args: {
    value: "Initial Value",
  },
}
