import type { Meta, StoryObj } from "@storybook/react"
import Truncate from ".."
import { TruncateFrom } from "../../../hooks/useTruncate"

const meta = {
  title: "Components/Truncate",
  component: Truncate,
  parameters: {
    layout: "centered",
    // deepControls: { enabled: true },
  },
  argTypes: {
    tag: {
      control: {
        type: "text",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          resize: "both",
          display: "block",
          border: "solid 1px",
          borderRadius: 5,
          overflow: "auto",
        }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Truncate>

export default meta
type Story = StoryObj<typeof Truncate>

const fullString =
  "This is my full, unadulterated string. This is sadly too long for the container. Try resizing the window or expanding the side panel to see this truncation in effect"

export const TruncateEnd: Story = {
  args: {
    children: fullString,
    from: TruncateFrom.End,
  },
}
export const TruncateMiddle: Story = {
  args: {
    children: fullString,
    from: TruncateFrom.Middle,
  },
}
export const TruncateStart: Story = {
  args: {
    children: fullString,
    from: TruncateFrom.Start,
  },
}

export const TruncateOffsetStart: Story = {
  args: {
    children: fullString,
    from: TruncateFrom.Start,
    startOffset: 4,
  },
}
export const TruncateOffsetEnd: Story = {
  args: {
    children: fullString,
    from: TruncateFrom.End,
    endOffset: 4,
  },
}
export const TruncateMiddleOffsetEnd: Story = {
  args: {
    children: fullString,
    from: TruncateFrom.Middle,
    endOffset: 15,
  },
}
export const TruncateMiddleOffsetStart: Story = {
  args: {
    children: fullString,
    from: TruncateFrom.Middle,
    startOffset: 15,
  },
}
