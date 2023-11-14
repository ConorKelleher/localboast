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
}

const DEFAULT_FROM = TruncateFrom.Start
const DEFAULT_START_OFFSET = 0
const DEFAULT_END_OFFSET = 0
const DEFAULT_DISABLE_WARNINGS = false
const DEFAULT_ELLIPSIS = "…"

// Thanks https://stackoverflow.com/a/9541579
const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}: HTMLElement) => {
  return scrollHeight > clientHeight || scrollWidth > clientWidth
}

const getInitialInsertionIndex = (
  originalString: string,
  fromSetting: TruncateFrom,
  startOffset: number,
  endOffset: number,
) =>
  fromSetting === TruncateFrom.Middle
    ? Math.floor((originalString.length - startOffset + endOffset) / 2)
    : fromSetting === TruncateFrom.Start
    ? startOffset
    : originalString.length - endOffset

const calculate = (
  originalString: string,
  el: HTMLElement,
  options: UseTruncateOptions,
): string => {
  const originalWhitespace = el.style.whiteSpace
  el.style.whiteSpace = "nowrap"
  const originalElTextContent = el.textContent
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
  }
  updateString()

  while (
    isOverflown(el) &&
    ellipsisStartIndex >= 0 &&
    ellipsisEndIndex <= originalString.length
  ) {
    switch (options.from) {
      case TruncateFrom.Start: {
        ellipsisEndIndex += 1
        break
      }
      case TruncateFrom.End: {
        ellipsisStartIndex -= 1
        break
      }
      case TruncateFrom.Middle: {
        if (firstHalf.length > lastHalf.length) {
          ellipsisStartIndex -= 1
        } else {
          ellipsisEndIndex += 1
        }
        break
      }
    }
    updateString()
    el.textContent = truncatedString
  }

  el.textContent = originalElTextContent
  // Might not need this. Seems wrong to imperatively change external element
  // But any element with this hook shouldn't wrap anyway so...
  // could maybe remove this and save some dom manipulation
  el.style.whiteSpace = originalWhitespace
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
