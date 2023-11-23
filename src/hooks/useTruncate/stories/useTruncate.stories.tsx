import type { Meta, StoryContext, StoryObj } from "@storybook/react"
import { UseTruncateDemo, renderDemoArgs } from "./demo"
import { TruncateFrom } from ".."

const meta = {
  title: "Hooks/useTruncate",
  component: UseTruncateDemo,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        transform: (_: string, context: StoryContext) => {
          return renderDemoArgs(context.allArgs)
        },
      },
      description: {
        component: `
Hook to allow any string rendered in the DOM to be programmatically truncated  with customizable truncation position, offsets and ellipsis.<br>
In most cases, the component-based solution (which simply wraps a call to this hook) is probably preferred.
            
See full documentation of the options at the [Truncate](/docs/components-truncate--docs) component.`,
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

export const TruncateOffsetStart: Story = {
  args: {
    originalString: fullString,
    options: { from: TruncateFrom.Start, startOffset: 4 },
  },
}
export const TruncateOffsetEnd: Story = {
  args: {
    originalString: fullString,
    options: { from: TruncateFrom.End, endOffset: 4 },
  },
}
export const TruncateMiddleOffsetEnd: Story = {
  args: {
    originalString: fullString,
    options: { from: TruncateFrom.Middle, endOffset: 15 },
  },
}
export const TruncateMiddleOffsetStart: Story = {
  args: {
    originalString: fullString,
    options: { from: TruncateFrom.Middle, startOffset: 15 },
  },
}
