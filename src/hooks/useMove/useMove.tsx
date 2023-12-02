import { useUpdatingRef } from "hooks"
import { useCallback, useEffect, useRef, useState } from "react"

type Coordinates = { x: number; y: number }

const NO_OFFSET: Coordinates = { x: 0, y: 0 }

const useMove = () => {
  const handleRef = useRef<HTMLElement | null>(null)
  const startCoordinatesRef = useRef<Coordinates | null>(null)
  const [offset, setOffset] = useState<Coordinates>(NO_OFFSET)
  const offsetRef = useUpdatingRef(offset)
  // When we've moved the element, track how much we've offset it, so next time (even if it's moved on the page), we have a record of how much initial offset is required
  const persistedOffsetRef = useRef<Coordinates>(offset)
  const movingRef = useRef(false)

  const onMouseDown = useCallback(
    ({ x, y }: Coordinates) => {
      movingRef.current = true

      startCoordinatesRef.current = {
        x: x - persistedOffsetRef.current.x,
        y: y - persistedOffsetRef.current.y,
      }
    },
    [movingRef],
  )
  const onMouseUp = useCallback(() => {
    if (movingRef.current) {
      movingRef.current = false
      persistedOffsetRef.current = offsetRef.current
    }
  }, [movingRef, offsetRef])
  const onMouseMove = useCallback(
    ({ x, y }: Coordinates) => {
      if (movingRef.current && startCoordinatesRef.current) {
        setOffset({
          x: x - startCoordinatesRef.current.x,
          y: y - startCoordinatesRef.current.y,
        })
      }
    },
    [movingRef],
  )

  const cleanUp = useCallback(() => {
    if (handleRef.current) {
      handleRef.current.removeEventListener("mousedown", onMouseDown)
      handleRef.current = null
    }
    document.removeEventListener("mouseup", onMouseUp)
    document.removeEventListener("mousemove", onMouseMove)

    setOffset(NO_OFFSET)
    persistedOffsetRef.current = NO_OFFSET
  }, [onMouseDown, onMouseMove, onMouseUp])

  const setHandle = useCallback(
    (ref: HTMLElement) => {
      if (handleRef.current) {
        if (handleRef.current === ref) {
          return
        }
        cleanUp()
      }
      handleRef.current = ref
      handleRef.current.addEventListener("mousedown", onMouseDown)
    },
    [cleanUp, onMouseDown],
  )

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mousemove", onMouseMove)
    return cleanUp
  }, [cleanUp, onMouseMove, onMouseUp])

  return [setHandle, offset] as const
}

export default useMove
