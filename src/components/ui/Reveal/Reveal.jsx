"use client";

import { motion } from "framer-motion";
import { REVEAL_VIEWPORT, fadeUp, staggerContainer } from "@/lib/motion";

// A variant's own `transition` wins over the component's `transition` prop,
// so the delay has to be merged into the "visible" state itself.
function withDelay(variants, delay) {
  if (!delay) return variants;
  return {
    ...variants,
    visible: {
      ...variants.visible,
      transition: { ...variants.visible.transition, delay },
    },
  };
}

// The single scroll-reveal wrapper for the whole site.
// - <Reveal> on its own fades its content up when it scrolls into view.
// - <Reveal stagger> becomes a timing parent; wrap each child in <RevealItem>
//   and they animate in one after another.
// It lets server-rendered sections get motion without becoming client components.
export default function Reveal({
  as = "div",
  variants = fadeUp,
  stagger,
  delay = 0,
  className,
  children,
  ...rest
}) {
  const MotionTag = motion[as];
  const resolvedVariants = stagger ? staggerContainer(stagger, delay) : withDelay(variants, delay);

  return (
    <MotionTag
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// A child of <Reveal stagger>. It has no trigger of its own: it inherits the
// parent's "hidden" -> "visible" switch, which is what makes the stagger work.
export function RevealItem({ as = "div", variants = fadeUp, className, children, ...rest }) {
  const MotionTag = motion[as];

  return (
    <MotionTag className={className} variants={variants} {...rest}>
      {children}
    </MotionTag>
  );
}
