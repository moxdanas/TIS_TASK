"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { hero } from "@/data/home";
import { site, toTelHref } from "@/data/site";
import { DURATION, EASE_OUT_EXPO, fadeUp, lineReveal, staggerContainer } from "@/lib/motion";

export default function Hero() {
  const imageFrameRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll-linked drift: the photo moves slower than the page, which gives depth.
  const { scrollYProgress } = useScroll({
    target: imageFrameRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-10 pb-20 sm:pt-16">
      <motion.div
        className="container-page"
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} className="text-base text-ink-muted">
          CBSE boarding and day school in Dehradun
        </motion.p>

        <h1
          id="hero-title"
          className="mt-6 font-condensed text-[clamp(3rem,13.5vw,15rem)] leading-[0.88] font-bold tracking-tight"
        >
          {hero.titleLines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={lineReveal} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-lg leading-relaxed text-pretty text-ink-muted lg:col-span-6"
          >
            {hero.description}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end"
          >
            <Button href={site.applyUrl} size="lg">
              Apply now
            </Button>
            <Button href="#enquire" variant="secondary" size="lg">
              Enquire now
            </Button>
            <a
              href={toTelHref(site.admissionHelpline)}
              className="px-3 py-2 font-medium underline decoration-accent decoration-2 underline-offset-8 hover:decoration-ink"
            >
              Call {site.admissionHelpline}
            </a>
          </motion.div>
        </div>
      </motion.div>

      <div className="container-page mt-14">
        <div
          ref={imageFrameRef}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[16/9] lg:aspect-[21/9]"
        >
          <motion.div
            className="absolute -inset-y-[10%] inset-x-0"
            style={{ y: prefersReducedMotion ? 0 : imageY }}
          >
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="object-cover"
            />
          </motion.div>
          {/* A red panel that lifts away on load, uncovering the photo. */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 origin-top bg-band"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: DURATION.slow * 1.4, ease: EASE_OUT_EXPO, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
}
