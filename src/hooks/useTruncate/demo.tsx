import useTruncate, { TruncateFrom, UseTruncateOptions } from "."

interface UseTruncateDemoProps {
  /**
   * Raw un-truncated string. Will render in full if small enough for the container. Will be truncated otherwise
   */
  originalString: string
  /**
   * Controls behavior of truncation. See Truncate component stories for descriptions of each option
   */
  options?: UseTruncateOptions
}

export const UseTruncateDemo = ({
  originalString,
  options = {
    from: TruncateFrom.End,
    startOffset: 0,
    endOffset: 0,
    disableWarnings: false,
  },
}: UseTruncateDemoProps) => {
  const [text, ref] = useTruncate(originalString, options)
  return (
    <h3
      ref={ref}
      style={{
        resize: "both",
        height: 30,
        width: 500,
        overflow: "hidden",
        border: "solid 1px",
        borderRadius: "4px",
      }}
    >
      {text}
    </h3>
  )
}

export const renderDemoArgs = (args: UseTruncateDemoProps) => {
  return `
const SomeComponent = () => {
  const [text, ref] = useTruncate("${args.originalString}", ${JSON.stringify(
    args.options,
    null,
    2,
  )})
  return <div ref={ref}>{text}</div>
}
`
}
