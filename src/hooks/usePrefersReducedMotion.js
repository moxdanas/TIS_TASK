"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

// Same question as Framer Motion's reduced-motion hook, but hydration-safe: it
// reports `false` during the server render and the first client render, then
// updates. Framer's version answers immediately on the client, so a component
// that renders a *different tree* based on it would mismatch the server HTML.
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
