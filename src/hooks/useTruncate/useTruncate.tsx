import { useUpdatingRef } from ".."
import { useCallback, useMemo, useRef, useState } from "react"

export enum TruncateFrom {
  Start = "start",
  Middle = "middle",
  End = "end",
}

export interface UseTruncateOptions {
  ellipsis?: string
  from?: TruncateFrom
  startOffset?: number
  endOffset?: number
  disableWarnings?: boolean
  disableMutation?: boolean
}

const DEFAULT_FROM = TruncateFrom.Start
const DEFAULT_START_OFFSET = 0
const DEFAULT_END_OFFSET = 0
const DEFAULT_DISABLE_WARNINGS = false
const DEFAULT_DISABLE_MUTATION = false
const DEFAULT_ELLIPSIS = "…"

// Inspired by (and with thanks to) https://stackoverflow.com/a/9541579
const isOverflownHoriz = ({ clientWidth, scrollWidth }: HTMLElement) => {
  return scrollWidth > clientWidth
}

const getInitialInsertionIndex = (
  originalString: string,
  fromSetting: TruncateFrom,
  startOffset: number,
  endOffset: number,
) =>
  fromSetting === TruncateFrom.Middle
    ? Math.floor(originalString.length / 2) - startOffset + endOffset
    : fromSetting === TruncateFrom.Start
    ? startOffset
    : originalString.length - endOffset

const calculate = (
  originalString: string,
  el: HTMLElement,
  options: UseTruncateOptions,
): string => {
  const newEl = el.cloneNode() as HTMLElement
  newEl.style.whiteSpace = "nowrap"
  newEl.style.opacity = "0"
  newEl.style.position = "absolute"
  newEl.style.width = `${el.clientWidth}px`
  document.body.appendChild(newEl)
  let ellipsisStartIndex = getInitialInsertionIndex(
    originalString,
    options.from!,
    options.startOffset!,
    options.endOffset!,
  )
  let ellipsisEndIndex = ellipsisStartIndex
  let firstHalf = ""
  let lastHalf = ""
  let truncatedString = ""
  const updateString = () => {
    firstHalf = originalString.slice(0, ellipsisStartIndex)
    lastHalf = originalString.slice(ellipsisEndIndex, originalString.length)
    truncatedString =
      firstHalf +
      (ellipsisEndIndex > ellipsisStartIndex ? options.ellipsis : "") +
      lastHalf
    newEl.textContent = truncatedString
  }
  updateString()

  while (
    isOverflownHoriz(newEl) &&
    ellipsisStartIndex >= 0 &&
    ellipsisEndIndex <= originalString.length
  ) {
    switch (options.from) {
      case TruncateFrom.Start: {
        if (ellipsisEndIndex >= originalString.length) {
          ellipsisStartIndex -= 1
        } else {
          ellipsisEndIndex += 1
        }
        break
      }
      case TruncateFrom.End: {
        if (ellipsisStartIndex <= 0) {
          ellipsisEndIndex += 1
        } else {
          ellipsisStartIndex -= 1
        }
        break
      }
      case TruncateFrom.Middle: {
        if (
          firstHalf.length +
            options.startOffset! -
            lastHalf.length -
            options.endOffset! >
          0
        ) {
          // First half bigger than second - remove from start unless already at 0
          if (ellipsisStartIndex <= 0) {
            ellipsisEndIndex += 1
          } else {
            ellipsisStartIndex -= 1
          }
        } else {
          // First half smaller than second - remove second unless already at end
          if (ellipsisEndIndex >= originalString.length) {
            ellipsisStartIndex -= 1
          } else {
            ellipsisEndIndex += 1
          }
        }
        break
      }
    }
    updateString()
  }

  newEl.remove()

  if (!options.disableMutation) {
    // In theory this shouldn't be needed. In practice, it basically is.
    // Without mutation, the hook returns a string which can just be passed to the tag as a child
    // But react renders are slower than dom manipulation.
    // Component updates and renders are likely to get outdated when resizing a window or element gradually
    // Component will think it's done truncating but dom has since updated.
    // Mutating an externally created ref is shady as hell but it gives best stability
    el.textContent = truncatedString
  }

  return truncatedString
}

const useAutoTruncateText = (
  originalString: string,
  options?: UseTruncateOptions,
) => {
  const textRef = useRef<HTMLElement>()
  // Casting props.children to string - risky up as far as early exit
  const [truncatedText, setTruncatedText] = useState<string>(originalString)
  const truncatedTextRef = useUpdatingRef(truncatedText)
  // Destructuring to primitives now to save memoization later
  const {
    from = DEFAULT_FROM,
    startOffset = DEFAULT_START_OFFSET,
    endOffset = DEFAULT_END_OFFSET,
    disableWarnings = DEFAULT_DISABLE_WARNINGS,
    ellipsis = DEFAULT_ELLIPSIS,
    disableMutation = DEFAULT_DISABLE_MUTATION,
  } = options || {}

  const onNeedRecalculate = useCallback(() => {
    if (!textRef.current) {
      return
    }
    const newTruncatedText = calculate(originalString, textRef.current, {
      from,
      startOffset,
      endOffset,
      disableWarnings,
      disableMutation,
      ellipsis,
    })
    if (truncatedTextRef.current !== newTruncatedText) {
      setTruncatedText(newTruncatedText)
    }
  }, [
    originalString,
    ellipsis,
    from,
    startOffset,
    endOffset,
    disableWarnings,
    disableMutation,
    truncatedTextRef,
  ])
  const onNeedRecalculateRef = useUpdatingRef(onNeedRecalculate)
  const onResize = useCallback(() => {
    onNeedRecalculateRef.current()
  }, [onNeedRecalculateRef])
  const resizeObserver = useMemo(() => new ResizeObserver(onResize), [onResize])

  const refCallback = useCallback(
    (ref: HTMLElement | null) => {
      if (ref) {
        if (textRef.current) {
          resizeObserver.disconnect()
        }
        textRef.current = ref
        resizeObserver.observe(textRef.current)
        onNeedRecalculate()
      }
    },
    [onNeedRecalculate, resizeObserver],
  )

  // Not memoized to avoid needless checks - Expected use involves destructuring (e.g. const [text, ref] = useAutoTruncateText(...))
  return [truncatedText, refCallback] as const
}

export default useAutoTruncateText
