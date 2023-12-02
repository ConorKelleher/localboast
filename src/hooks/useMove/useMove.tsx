import { useRef, useState } from "react"

// type Coordinates = [number, number]

const useMove = () => {
  const handleRef = useRef()
  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  const [moving, setMoving] = useState(false)

  return (ref: HTMLElement) => {
    const onMouseDown = () => {}
  }
}

export default useMove
