"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// A thin bar across the top that fills as the page is read.
// It scales on the X axis (transform) instead of changing width, so the browser
// never has to recalculate layout while scrolling.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
      style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
    />
  );
}
