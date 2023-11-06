import useTruncate, {
  type UseTruncateOptions,
  TruncateFrom,
} from "hooks/useTruncate"
import React from "react"

/**
 * Controls behavior of truncation
 * - from - Where should the truncation take place ("start" | "middle" | "end")
 * - startOffset - How many leading characters should be allowed before chosen truncation point
 * - endOffset - How many trailing characters should be allowed after chosen truncation point
 * - disableWarnings - If true, console warnings for non-string children prop will be disabled
 */
export interface TruncateProps
  extends React.PropsWithChildren,
    UseTruncateOptions {
  tag?: React.ElementType
}

const Truncate = (props: TruncateProps) => {
  const { children: originalString, ...otherProps } = props
  const isValidChildType = typeof originalString === "string"
  const [truncatedText, ref] = useTruncate(
    isValidChildType ? originalString : "",
    otherProps,
  )

  if (!isValidChildType) {
    if (!props.disableWarnings) {
      console.warn(
        'Truncate must have a single string child. Exiting early and rendering children.\n\n(Hide this warning by passing "disableWarnings: true" as a prop',
      )
    }
    return originalString
  }

  const Tag = props.tag || "span"
  return <Tag ref={ref}>{truncatedText}</Tag>
}

Truncate.defaultProps = {
  from: TruncateFrom.End,
  startOffset: 0,
  endOffset: 0,
  tag: "span",
}

export default Truncate
