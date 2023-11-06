import { Text, TextProps } from "@mantine/core"
import { useCallback, useLayoutEffect, useRef } from "react"
import * as React from "react"

const getMiddleTruncatedText = (
  originalText: string | unknown[],
  charsToRemove?: number,
) => {
  let truncatedText
  if (charsToRemove && originalText) {
    if (charsToRemove >= originalText.length) {
      // eslint-disable-next-line no-console
      console.warn(
        "MiddleTruncateText being called with 0 available width. Parent element must not derive width from this component as it shrinks to accommodate the parent",
      )
      return ""
    }
    const initialMidpoint = Math.floor(originalText.length / 2)
    let endOfFirstHalf = initialMidpoint
    let startOfSecondHalf = initialMidpoint
    // We're taking half of the target to remove from each side (rounded down)
    const charsFromEachSide = Math.floor(charsToRemove / 2)
    // If off number of characters to remove, take it from the second half
    if (charsToRemove % 2 === 1) {
      startOfSecondHalf -= 1
    }
    endOfFirstHalf -= charsFromEachSide
    startOfSecondHalf -= charsFromEachSide
    const firstHalf = endOfFirstHalf
      ? originalText.slice(0, endOfFirstHalf)
      : ""
    const secondHalf = startOfSecondHalf
      ? originalText.slice(-startOfSecondHalf)
      : ""
    truncatedText = `${firstHalf}…${secondHalf}`
  } else {
    // Need to always return a string. Currently just joining a provided children array but that might not always satisfy
    truncatedText = Array.isArray(originalText)
      ? originalText.join()
      : originalText
  }
  return truncatedText
}

// eslint-disable-next-line
// @ts-ignore
const MiddleTruncateText = ({ children, ...rest }: TextProps) => {
  const visibleTextRef = useRef<HTMLDivElement>(null)
  const invisibleTextRef = useRef<HTMLDivElement>(null)
  const [charsToRemove, setCharsToRemove] = React.useState<number>(0)
  const charsToRemoveRef = useRef(charsToRemove)
  const childrenArentString = typeof children !== "string"

  useLayoutEffect(() => {
    charsToRemoveRef.current = charsToRemove
  }, [charsToRemove])

  const evaluateCharsToRemove = useCallback((text: string, textEl: Element) => {
    if (!invisibleTextRef.current) {
      return
    }
    // client width is the viewport width, how much is visible to the user
    const availableSpace = textEl?.clientWidth ?? 0

    // Starting with the assumption that we need no truncation, see if we overflow
    // If we're overflowing, remove a character and try again. Go until we run out of characters or stop overflowing
    let newCharsToRemove = 0

    // Currently just going from 0-N in a linear search
    // Could do fanciness with binary search or something to reduce iterations needed
    // Revisit this if it seems too slow
    while (
      invisibleTextRef.current?.clientWidth > availableSpace &&
      newCharsToRemove <= text.length
    ) {
      const testTruncatedText = getMiddleTruncatedText(text, newCharsToRemove)
      invisibleTextRef.current.textContent = testTruncatedText
      newCharsToRemove += 1
    }
    invisibleTextRef.current.textContent = text

    if (newCharsToRemove !== charsToRemoveRef.current) {
      setCharsToRemove(newCharsToRemove)
    }
  }, [])

  useLayoutEffect(() => {
    if (!visibleTextRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (entries.length === 0 || childrenArentString) return
        const textEl = entries[0].target
        evaluateCharsToRemove(children, textEl)
      })
    })

    resizeObserver.observe(visibleTextRef.current)

    return () => resizeObserver.disconnect()
  }, [childrenArentString, children, evaluateCharsToRemove])

  // Only used if rendering text. If childrenArentString is true, won't use this value
  const originalText = childrenArentString ? "" : children
  const text = React.useMemo(
    () => getMiddleTruncatedText(originalText, charsToRemove),
    [originalText, charsToRemove],
  )

  if (childrenArentString) {
    return <Text {...rest}>{children}</Text>
  } else {
    return (
      <div style={{ position: "relative", width: "100%" }}>
        <Text
          lineClamp={1}
          {...rest}
          ref={visibleTextRef}
          style={{ ...rest.style, overflow: "hidden" }}
        >
          {text}
        </Text>
        {/* Render a second, invisible version of the text to measure its hypothetical size */}
        <Text
          lineClamp={1}
          {...rest}
          style={{
            ...rest.style,
            visibility: "hidden",
            position: "absolute",
            inset: 0,
            width: "fit-content",
            whiteSpace: "nowrap",
          }}
          ref={invisibleTextRef}
        >
          {children}
        </Text>
      </div>
    )
  }
}

export default MiddleTruncateText
