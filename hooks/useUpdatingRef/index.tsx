import { useEffect, useRef } from "react"

/**
 * Hook to return a self-updating ref object. The ref is immutable but every render,
 * the current value will update to the latest value passed as an argument
 * @param value - any arbitrary data we want to persist into the immutable ref 
 * @returns React.MutableRefObject with current value of type T (unknown if not provided)
 */
const useUpdatingRef = <T extends unknown>(value: T) => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  })

  return ref
}

export default useUpdatingRef
