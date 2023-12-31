import type { Meta, StoryContext, StoryObj } from "@storybook/react"
import { UseUpdatingRefDemo, renderDemoArgs } from "./UseUpdatingRefDemo"

const meta = {
  title: "Hooks/useUpdatingRef",
  component: UseUpdatingRefDemo,
  parameters: {
    layout: "centered",
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    docs: {
      source: {
        transform: (_: string, context: StoryContext) => {
          return renderDemoArgs(context.allArgs)
        },
      },
      canvas: {
        sourceState: "shown",
      },
      description: {
        component: `Hook to persist any arbitrary value in a useRef and automatically update the <strong>current</strong> when the value changes. Useful for referencing changeable values inside effects without bloating the deps array.

<strong>Note:</strong> You probably don't need this. I feel bad any time I use it, but it's annoyingly useful.`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UseUpdatingRefDemo>

export default meta
type Story = StoryObj<typeof UseUpdatingRefDemo>

export const Primary: Story = {
  args: {
    value: "Initial Value",
  },
}
