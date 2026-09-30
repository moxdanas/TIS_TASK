"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

// Anything a visitor can click or type into makes the ring grow.
// `data-cursor="hover"` lets a non-interactive element opt in (e.g. an image card).
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]';

// Touch screens have no hovering pointer, so the ring is never mounted there.
export default function CustomCursor() {
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  return hasFinePointer ? <CursorRing /> : null;
}

function CursorRing() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values update the transform directly, outside React, so following the
  // mouse costs zero re-renders. React state only changes on hover in/out.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 500, damping: 40, mass: 0.4 };
  const ringX = useSpring(pointerX, springConfig);
  const ringY = useSpring(pointerY, springConfig);

  useEffect(() => {
    function handlePointerMove(event) {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setIsVisible(true);
    }

    function handlePointerOver(event) {
      setIsHovering(Boolean(event.target.closest(INTERACTIVE_SELECTOR)));
    }

    function handlePointerLeave() {
      setIsVisible(false);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [pointerX, pointerY]);

  const transition = { duration: DURATION.fast, ease: EASE_OUT_EXPO };

  // Outer layer follows the pointer, the ring scales, and the fill fades in on
  // hover — three layers so every change is a transform or opacity.
  // mix-blend-difference inverts whatever is underneath, so one white ring
  // stays visible on light and dark sections alike.
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] -mt-5 -ml-5 size-10 mix-blend-difference"
      style={{
        // Reduced motion: follow the pointer exactly, with no trailing spring.
        x: prefersReducedMotion ? pointerX : ringX,
        y: prefersReducedMotion ? pointerY : ringY,
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={transition}
    >
      <motion.div
        className="relative size-full rounded-full border border-white"
        initial={false}
        animate={{ scale: isHovering ? 1.6 : 1 }}
        transition={transition}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-white"
          initial={false}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={transition}
        />
      </motion.div>
    </motion.div>
  );
}
