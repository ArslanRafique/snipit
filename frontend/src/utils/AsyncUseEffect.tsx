import { useEffect } from "react";

// By default hooks doesn't allow async
function AsyncUseEffect(
  effect: () => Promise<void | (() => void)>,
  dependencies?: any[]
) {
  return useEffect(() => {
    const cleanupPromise = effect();

    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };

   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies );
}

export { AsyncUseEffect };
