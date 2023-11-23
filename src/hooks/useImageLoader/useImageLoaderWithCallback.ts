import useImageLoader from "./useImageLoader"

type UseImageWithFallbackArguments = {
  src: string
  fallbackSrc: string
}
const useImageWithFallback = ({
  src,
  fallbackSrc,
}: UseImageWithFallbackArguments) => {
  const { loading, failedToLoad } = useImageLoader({ src })

  return loading || !failedToLoad ? src : fallbackSrc
}
export default useImageWithFallback
