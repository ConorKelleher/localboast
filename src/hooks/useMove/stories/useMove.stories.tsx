import type { Meta, StoryContext, StoryObj } from "@storybook/react"
import { UseMoveDemo, renderDemoArgs } from "./UseMoveDemo"

const meta = {
  title: "Hooks/useMove",
  component: UseMoveDemo,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        transform: (_: string, context: StoryContext) => {
          return renderDemoArgs(context.allArgs)
        },
      },
      description: {
        component: "todo",
      },
    },
    deepControls: { enabled: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UseMoveDemo>

export default meta
type Story = StoryObj<typeof UseMoveDemo>

export const InlineMove: Story = {
  args: {},
}
