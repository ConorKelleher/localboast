import { useUpdatingRef } from "hooks"
import { useCallback, useEffect, useRef, useState } from "react"

type Coordinates = { x: number; y: number }

const useMove = () => {
  const handleRef = useRef<HTMLElement | null>(null)
  const startCoordinatesRef = useRef<Coordinates | null>(null)
  const [offset, setOffset] = useState<Coordinates>({ x: 0, y: 0 })
  const movingRef = useUpdatingRef(false)

  const onMouseDown = useCallback(
    ({ x, y }: Coordinates) => {
      movingRef.current = true
      startCoordinatesRef.current = { x, y }
    },
    [movingRef],
  )
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
    document.removeEventListener("mousemove", onMouseMove)
  }, [onMouseDown, onMouseMove])

  const setHandle = useCallback(
    (ref: HTMLElement) => {
      if (handleRef.current) {
        cleanUp()
      }
      handleRef.current = ref
      ref.addEventListener("mousedown", onMouseDown)
    },
    [cleanUp, onMouseDown],
  )

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return cleanUp
  }, [cleanUp, onMouseMove])

  return [setHandle, offset] as const
}

export default useMove
