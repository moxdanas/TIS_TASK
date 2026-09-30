"use client";

import { useCallback, useSyncExternalStore } from "react";

// useSyncExternalStore (rather than useState + useEffect) subscribes directly to
// the browser's media query, so there is no extra render and no stale value.
// On the server there is no window, so we report `false` until hydration.
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
