import type { Meta, StoryContext, StoryObj } from "@storybook/react"
import { UseTruncateDemo, renderDemoArgs } from "./demo"
import { TruncateFrom } from ".."

const meta = {
  title: "Hooks/useAutoTruncate",
  component: UseTruncateDemo,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        transform: (_: string, context: StoryContext) => {
          return renderDemoArgs(context.allArgs)
        },
      },
    },
    deepControls: { enabled: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UseTruncateDemo>

export default meta
type Story = StoryObj<typeof UseTruncateDemo>

const fullString =
  "This is my full, unadulterated string. This is sadly too long for the container"

export const TruncateEnd: Story = {
  args: {
    originalString: fullString,
    options: { from: TruncateFrom.End },
  },
}
export const TruncateMiddle: Story = {
  args: {
    originalString: fullString,
    options: { from: TruncateFrom.Middle },
  },
}
export const TruncateStart: Story = {
  args: {
    originalString: fullString,
    options: { from: TruncateFrom.Start },
  },
}
