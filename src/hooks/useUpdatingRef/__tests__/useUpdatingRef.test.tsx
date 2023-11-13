import { screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import "test_utils/polyfils"
import mantineRender from "test_utils/mantineRender"
import { UseUpdatingRefDemo } from "../stories/demo"

describe("useUpdatingRef Tests", () => {
  let rerender

  beforeEach(() => {
    ;({ rerender } = mantineRender(
      <UseUpdatingRefDemo value="Test Initial Value" />,
    ))
  })

  test("values initialise correctly", () => {
    expect(screen.getByTestId("propsValueOutput")).toHaveTextContent(
      "Test Initial Value",
    )
    expect(screen.getByTestId("refValueOutput")).toHaveTextContent(
      "Test Initial Value",
    )
    expect(screen.getByTestId("refsCount")).toHaveTextContent("1")
  })

  test("Ref value updates asynchronously after arg change", () => {
    rerender!(<UseUpdatingRefDemo value="New Updated Value" />)

    expect(screen.getByTestId("propsValueOutput")).toHaveTextContent(
      "New Updated Value",
    )
    expect(screen.getByTestId("refValueOutput")).toHaveTextContent(
      "Test Initial Value",
    )
    expect(screen.getByTestId("refsCount")).toHaveTextContent("1")

    rerender!(<UseUpdatingRefDemo value="New Updated Value" />)

    expect(screen.getByTestId("propsValueOutput")).toHaveTextContent(
      "New Updated Value",
    )
    expect(screen.getByTestId("refValueOutput")).toHaveTextContent(
      "New Updated Value",
    )
    expect(screen.getByTestId("refsCount")).toHaveTextContent("1")
  })
})
