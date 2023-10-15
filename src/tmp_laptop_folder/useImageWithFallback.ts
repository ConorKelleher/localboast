import useImageLoader from "./useImageLoader";

type UseImageWithFallbackArguments = {
  src: string;
  fallbackSrc: string;
};
export const useImageWithFallback = ({
                                src,
                                fallbackSrc
                              }: UseImageWithFallbackArguments): [string, boolean] => {
  const { loading, failedToLoad } = useImageLoader({ src });

  const isWorking = loading || !failedToLoad;

  return [isWorking ? src : fallbackSrc, isWorking];
};
