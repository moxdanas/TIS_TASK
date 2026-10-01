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

  // The ring trails the pointer (soft spring); the dot tracks it almost
  // exactly (stiffer spring), so the two layers read as "ring catching up to
  // dot" rather than moving as one rigid unit.
  const ringSpring = { stiffness: 260, damping: 32, mass: 0.5 };
  const dotSpring = { stiffness: 900, damping: 40, mass: 0.3 };
  const ringX = useSpring(pointerX, ringSpring);
  const ringY = useSpring(pointerY, ringSpring);
  const dotX = useSpring(pointerX, dotSpring);
  const dotY = useSpring(pointerY, dotSpring);

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

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {/* Ring: grows and fills with the accent colour over anything hoverable.
          Reduced motion follows the pointer exactly, with no trailing spring. */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-accent/20"
        style={{
          x: prefersReducedMotion ? pointerX : ringX,
          y: prefersReducedMotion ? pointerY : ringY,
        }}
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
        }}
        transition={transition}
      />
      {/* Dot: a tight, near-instant marker of the actual pointer position. */}
      <motion.div
        className="fixed top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{
          x: prefersReducedMotion ? pointerX : dotX,
          y: prefersReducedMotion ? pointerY : dotY,
        }}
        initial={false}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={transition}
      />
    </div>
  );
}
