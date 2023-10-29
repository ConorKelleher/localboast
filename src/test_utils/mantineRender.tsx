import { MantineProvider, createTheme } from "@mantine/core"
import { render } from "@testing-library/react"

const theme = createTheme({
  /** Put your mantine theme override here */
})

type renderParams = Parameters<typeof render>

const mantineRender = (ui: renderParams[0], options?: renderParams[1]) => {
  const { rerender, ...otherRenderData } = render(
    <MantineProvider theme={theme}>{ui}</MantineProvider>,
    options,
  )

  return {
    ...otherRenderData,
    rerender: (ui: renderParams[0]) =>
      rerender(<MantineProvider theme={theme}>{ui}</MantineProvider>),
  }
}
export default mantineRender
