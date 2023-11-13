import { useUpdatingRef } from ".."
import { useCallback, useEffect, useRef, useState } from "react"

export enum TruncateFrom {
  Start = "start",
  Middle = "middle",
  End = "end",
}

export interface UseTruncateOptions {
  from?: TruncateFrom
  startOffset?: number
  endOffset?: number
  disableWarnings?: boolean
}

const calculate = (originalString: string, el: HTMLElement): string => {
  const truncString = originalString
  console.log(el)

  return truncString
}

const useAutoTruncateText = (
  originalString: string,
  options?: UseTruncateOptions,
) => {
  // todo: remove this effect - only put here to shut up tslint
  useEffect(() => {}, [options])

  const textRef = useRef<HTMLElement>()
  // Casting props.children to string - risky up as far as early exit
  const [truncatedText, setTruncatedText] = useState<string>(originalString)
  const truncatedTextRef = useUpdatingRef(truncatedText)
  const onNeedRecalculate = useCallback(() => {
    if (!textRef.current) {
      return
    }
    const newTruncatedText = calculate(originalString, textRef.current)
    if (truncatedTextRef.current !== newTruncatedText) {
      setTruncatedText(newTruncatedText)
    }
  }, [originalString, truncatedTextRef])

  const refCallback = useCallback(
    (ref: HTMLElement | null) => {
      if (ref) {
        textRef.current = ref
        onNeedRecalculate()
      }
    },
    [onNeedRecalculate],
  )

  // Not memoized to avoid needless checks - Expected use involves destructuring (e.g. const [text, ref] = useAutoTruncateText(...))
  return [truncatedText, refCallback] as const
}

export default useAutoTruncateText
