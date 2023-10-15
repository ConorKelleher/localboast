import React from "react";

type UseImageLoaderArguments = { src: string; load?: boolean };

const useImageLoader = ({ src, load = true }: UseImageLoaderArguments) => {
  const [loading, setLoading] = React.useState(load);
  const loadingRef = React.useRef(loading);
  const [loaded, setLoaded] = React.useState(false);
  const loadedRef = React.useRef(loaded);
  const [failedToLoad, setFailedToLoad] = React.useState(false);
  const failedToLoadRef = React.useRef(failedToLoad);
  const prevEffectedArgsRef = React.useRef({ src, load });

  const invalidateState =
    prevEffectedArgsRef.current.src !== src ||
    prevEffectedArgsRef.current.load !== load;

  React.useEffect(() => {
    loadingRef.current = loading;
    loadedRef.current = loaded;
    failedToLoadRef.current = failedToLoad;
  }, [loading, loaded, failedToLoad]);

  // Layout effect to commit load state immediately on first render we have it
  React.useLayoutEffect(() => {
    prevEffectedArgsRef.current = { src, load };
    // Negate current load state if props change
    if (load) {
      if (!loadingRef.current) {
        setLoading(true);
        setFailedToLoad(false);
        setLoaded(false);
      }
    } else {
      if (loadingRef.current) {
        setLoading(false);
        setFailedToLoad(false);
      }
    }
    const newLoading = load;
    const newFailedToLoad = false;
    const newLoaded = false;
    if (newLoading !== loadingRef.current) {
      setLoading(newLoading);
    }
    if (newFailedToLoad !== failedToLoadRef.current) {
      setFailedToLoad(newFailedToLoad);
    }
    if (newLoaded !== loadedRef.current) {
      setLoaded(newLoaded);
    }
  }, [src, load]);

  React.useEffect(() => {
    if (!load) {
      return;
    }
    const img = new Image();
    let cancelled = false;

    img.onload = () => {
      if (!cancelled) {
        setFailedToLoad(false);
        setLoading(false);
        setLoaded(true);
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        setFailedToLoad(true);
        setLoading(false);
      }
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [load, src]);

  return React.useMemo(
    () => ({
      loading: invalidateState ? load : loading,
      loaded: invalidateState ? false : loaded,
      failedToLoad: invalidateState ? false : failedToLoad,
    }),
    [loading, loaded, failedToLoad, invalidateState, load]
  );
};
export default useImageLoader;
