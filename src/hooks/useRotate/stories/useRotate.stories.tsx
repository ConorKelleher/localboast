import type { Meta, StoryObj } from "@storybook/react"
import { UseRotateDemo, renderDemoArgs } from "./UseRotateDemo"

const meta = {
  title: "Hooks/useRotate",
  component: UseRotateDemo,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        transform: () => {
          return renderDemoArgs()
        },
      },
      description: {
        component: "todo",
      },
    },
    deepControls: { enabled: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UseRotateDemo>

export default meta
type Story = StoryObj<typeof UseRotateDemo>

export const InlineRotate: Story = {
  args: {},
}
