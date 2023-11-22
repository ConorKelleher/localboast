import { DEFAULT_OPTIONS as DEFAULT_TRUNCATE_OPTIONS } from "../../hooks/useTruncate/useTruncate"
import useTruncate, { TruncateFrom } from "../../hooks/useTruncate"
import React from "react"

/**
 * Controls behavior of truncation
 * - from - Where should the truncation take place ("start" | "middle" | "end")
 * - startOffset - How many leading characters should be allowed before chosen truncation point
 * - endOffset - How many trailing characters should be allowed after chosen truncation point
 * - disableWarnings - If true, console warnings for non-string children prop will be disabled
 */
export interface TruncateProps {
  /**
   * Raw string that is to be truncated. If you want to use a custom component, use the "tag" prop. Don't pass it as a child
   */
  children: string
  /**
   * Custom component to use for text rendering. Must accept a ref prop
   */
  tag?: React.ElementType | string
  /**
   * Optional ellipsis character override when performing truncation
   */
  ellipsis?: string
  /**
   * How many pixels should it over-truncate by. Used to avoid wrapping of slow updates
   */
  threshold?: number
  /**
   * From where in the string should the truncation begin (start, middle, end)
   */
  from?: TruncateFrom
  /**
   * How many additional characters should there be to the left of the initial ellipsis insertion point
   */
  startOffset?: number
  /**
   * How many additional characters should there be to the right of the initial ellipsis insertion point
   */
  endOffset?: number
  /**
   * Disables the default optimization that happens when using default options. Anything other than right-based, no offset truncation is more intensive than native css-based truncation, so we try to use the built-in solution where possible.
   * If that native truncation is causing problems for you, disable it here to allow the truncation to always use the more costly observer-based JS solution for truncation
   */
  disableNativeTruncate?: boolean
  /**
   * By default, the element's component is programmatically assigned to guarantee renders are in sync with DOM changes. If this feels bad, disable it (note - this will likely cause issues with unwanted wrapping)
   */
  disableMutation?: boolean
  /**
   * Turn off console warnings about passing wrong children type
   */
  disableWarnings?: boolean
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
  ...DEFAULT_TRUNCATE_OPTIONS,
  children: "",
  tag: "span",
}

export default Truncate
