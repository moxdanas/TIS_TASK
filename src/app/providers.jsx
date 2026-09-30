"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";

// Context providers need the client, so they live here and layout.jsx stays a
// server component.
export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {/* "user" = follow the OS reduced-motion setting: transform animations are
          skipped site-wide while opacity fades still run. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
