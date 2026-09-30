"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";

// Counts from 0 up to `value` the first time it scrolls into view.
// `suffix` covers stats that aren't plain numbers: 16 + "+", 24 + "×7", 6 + ":1".
export default function StatCounter({ value, suffix = "", className = "" }) {
  const numberRef = useRef(null);
  const isInView = useInView(numberRef, { once: true, margin: "0px 0px -10% 0px" });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      numberRef.current.textContent = String(value);
      return;
    }

    // Writing straight to the DOM node avoids re-rendering React on every frame.
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        numberRef.current.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value]);

  return (
    <span className={`tabular-nums ${className}`}>
      {/* Screen readers get the final value once, not every intermediate number. */}
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span aria-hidden="true">
        <span ref={numberRef}>0</span>
        {suffix}
      </span>
    </span>
  );
}
