import useMove from ".."

interface UseMoveDemoProps {}

export const UseMoveDemo = (props: UseMoveDemoProps) => {
  const [setHandle, offset] = useMove()
  return (
    <div
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      ref={(ref) => setHandle(ref!)}
    >
      Test
    </div>
  )
}

export const renderDemoArgs = (args: UseMoveDemoProps) => {
  return `todo`
}
