import React from "react"

type UseVideoLoaderArguments = { src: string; load?: boolean }

const useVideoLoader = ({ src, load = true }: UseVideoLoaderArguments) => {
  const [loading, setLoading] = React.useState(load)
  const loadingRef = React.useRef(loading)
  const [metaData, setMetaData] = React.useState<{
    height: number
    width: number
  }>()
  const metaDataRef = React.useRef(metaData)
  const [failedToLoad, setFailedToLoad] = React.useState(false)
  const failedToLoadRef = React.useRef(failedToLoad)
  const prevEffectedArgsRef = React.useRef({ src, load })

  const invalidateState =
    prevEffectedArgsRef.current.src !== src ||
    prevEffectedArgsRef.current.load !== load

  React.useEffect(() => {
    loadingRef.current = loading
    metaDataRef.current = metaData
    failedToLoadRef.current = failedToLoad
  }, [loading, metaData, failedToLoad])

  // Layout effect to commit load state immediately on first render we have it
  React.useLayoutEffect(() => {
    prevEffectedArgsRef.current = { src, load }
    const newLoading = load
    const newFailedToLoad = false
    const newMetaData = undefined
    if (newLoading !== loadingRef.current) {
      setLoading(newLoading)
    }
    if (newFailedToLoad !== failedToLoadRef.current) {
      setFailedToLoad(newFailedToLoad)
    }
    if (newMetaData !== metaDataRef.current) {
      setMetaData(newMetaData)
    }
  }, [src, load])

  React.useEffect(() => {
    if (!load) {
      return
    }
    const video = document.createElement("video")
    const videoSrc = document.createElement("source")
    let cancelled = false

    video.onloadedmetadata = () => {
      if (!cancelled) {
        setFailedToLoad(false)
        setLoading(false)
        setMetaData({ height: video.videoHeight, width: video.videoWidth })
      }
    }
    video.onerror = () => {
      if (!cancelled) {
        setFailedToLoad(true)
        setLoading(false)
      }
    }
    video.appendChild(videoSrc)
    videoSrc.type = "video/mp4"
    videoSrc.src = src

    return () => {
      cancelled = true
    }
  }, [load, src])

  return React.useMemo(
    () => ({
      loading: invalidateState ? load : loading,
      failedToLoad: invalidateState ? false : failedToLoad,
      metaData: invalidateState ? undefined : metaData,
    }),
    [loading, failedToLoad, metaData, invalidateState, load],
  )
}
export default useVideoLoader
