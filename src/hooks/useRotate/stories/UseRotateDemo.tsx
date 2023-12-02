import useRotate from ".."

export const UseRotateDemo = () => {
  const [setHandle, offset] = useRotate()
  return (
    <p style={{ textAlign: "center" }}>
      This is a{" "}
      <strong
        ref={(ref) => ref && setHandle(ref)}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          userSelect: "none",
          cursor: "rotate",
          display: "inline-block",
        }}
      >
        SERIOUS
      </strong>{" "}
      sentence.
      <br />
      <br />
      Don't try to make it less so by grabbing my emboldened word or anything.
    </p>
  )
}

export const renderDemoArgs = () => {
  return `todo`
}
