"use client";

import { useSyncExternalStore } from "react";

const subscribeToNothing = () => () => {};

// Returns false during server render and the hydration pass, true afterwards.
// Needed for UI that depends on client-only state (like the saved theme), so
// the server HTML and the first client render match.
export function useMounted() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}
