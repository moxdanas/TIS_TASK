"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import ThemeToggle from "@/components/effects/ThemeToggle/ThemeToggle";
import Button from "@/components/ui/Button/Button";
import Logo from "@/components/ui/Logo/Logo";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { DURATION, EASE_OUT_EXPO, fadeUp, staggerContainer } from "@/lib/motion";

// How far down the page before the bar starts hiding on scroll-down.
const HIDE_AFTER_PX = 160;

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Reading scroll through a motion value keeps this out of React's render loop;
  // state is only set when the answer actually changes, so re-renders are rare.
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsHidden(current > previous && current > HIDE_AFTER_PX);
    setIsScrolled(current > 8);
  });

  // While the mobile menu is open: stop the page behind it from scrolling and
  // let Escape close it.
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  // The menu is a sibling of the header, not a child: the header slides with a
  // transform, and a transformed parent would trap a position:fixed overlay.
  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 border-b ${
          isScrolled || isMenuOpen
            ? "border-line bg-paper/90 backdrop-blur-md"
            : "border-transparent bg-paper"
        }`}
        initial={false}
        animate={{ y: isHidden && !isMenuOpen ? "-100%" : "0%" }}
        transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
      >
        <div className="container-page flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative py-2 text-sm font-medium after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-out-expo hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Wrapped so "hidden" isn't overridden by the button's own inline-flex. */}
            <div className="hidden sm:block">
              <Button href={site.applyUrl}>Apply now</Button>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center rounded-full border border-line lg:hidden"
            >
              {/* Two bars that rotate into a cross — transforms only. */}
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-5 bg-ink transition-transform duration-300 ease-out-expo ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-5 bg-ink transition-transform duration-300 ease-out-expo ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-28 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
          >
            <motion.ul
              className="container-page flex flex-col gap-2 py-10"
              variants={staggerContainer(0.06, 0.05)}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={fadeUp}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-2 font-condensed text-5xl font-bold tracking-tight"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:hidden">
                <Button href={site.applyUrl} size="lg">
                  Apply now
                </Button>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
