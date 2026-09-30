"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" fill="currentColor" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The saved theme only exists in the browser; until mount we render an empty
  // button of the same size so the server HTML matches and nothing jumps.
  const isMounted = useMounted();
  const isDark = isMounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={isMounted ? `Switch to ${nextTheme} theme` : "Toggle theme"}
      className="relative grid size-11 place-items-center overflow-hidden rounded-full border border-line text-ink hover:border-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isMounted && (
          <motion.span
            key={resolvedTheme}
            initial={{ y: 18, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -18, rotate: 90, opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE_OUT_EXPO }}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
