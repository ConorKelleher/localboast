import { CSSProperties, useMemo } from "react"

const useQuickySticky = () => {
  const styles = useMemo(() => {
    return {
      position: "sticky" as CSSProperties["position"],
      top: 0,
    }
  }, [])

  return styles
}

export default useQuickySticky
