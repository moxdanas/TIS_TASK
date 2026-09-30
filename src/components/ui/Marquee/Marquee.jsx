"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Endless horizontal strip. The content is rendered `copies` times side by side;
// once the strip has moved left by exactly one copy's width it jumps back by that
// width, which is invisible because the next copy looks identical.
export default function Marquee({ copies = 2, pixelsPerSecond = 40, className = "", children }) {
  const firstCopyRef = useRef(null);
  const copyWidthRef = useRef(0);
  const isPausedRef = useRef(false);
  const offsetX = useMotionValue(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Measure once and on resize, rather than reading layout on every frame.
  useEffect(() => {
    const firstCopy = firstCopyRef.current;
    if (!firstCopy) return;
    const resizeObserver = new ResizeObserver(() => {
      copyWidthRef.current = firstCopy.offsetWidth;
    });
    resizeObserver.observe(firstCopy);
    return () => resizeObserver.disconnect();
  }, [prefersReducedMotion]);

  useAnimationFrame((_, frameDelta) => {
    if (prefersReducedMotion || isPausedRef.current || !copyWidthRef.current) return;
    let nextX = offsetX.get() - (pixelsPerSecond * frameDelta) / 1000;
    if (nextX <= -copyWidthRef.current) nextX += copyWidthRef.current;
    offsetX.set(nextX);
  });

  // Reduced motion: no movement at all, just the items wrapped onto lines.
  if (prefersReducedMotion) {
    return <div className={`container-page flex flex-wrap gap-y-4 ${className}`}>{children}</div>;
  }

  return (
    // Pausing on hover lets people read an item (WCAG 2.2.2: moving content can be paused).
    <div
      className={`overflow-hidden ${className}`}
      onPointerEnter={() => (isPausedRef.current = true)}
      onPointerLeave={() => (isPausedRef.current = false)}
    >
      <motion.div style={{ x: offsetX }} className="flex w-max">
        {Array.from({ length: copies }, (_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? firstCopyRef : undefined}
            // Screen readers hear the list once, not once per copy.
            aria-hidden={copyIndex > 0 || undefined}
            className="flex shrink-0"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
