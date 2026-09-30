// Every animation on the site is built from these presets, so timing and easing
// feel consistent and any tweak happens in one place.

// Fast start, long soft landing: reads as "confident" rather than bouncy.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
};

// Reveal once, slightly before the element is fully on screen, so content is
// already settling as the reader reaches it instead of popping in late.
export const REVEAL_VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

// Used inside an overflow-hidden wrapper: each headline line slides up from
// behind a mask, the typical "editorial" text reveal.
export const lineReveal = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

// Parent variant that only orchestrates timing; children carry their own
// variants (e.g. fadeUp) and inherit the "hidden" -> "visible" switch.
export function staggerContainer(staggerChildren = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}
