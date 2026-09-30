"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { lifeAtTulas } from "@/data/home";

function ActivityCard({ activity }) {
  return (
    // The TIS images are cut-outs on transparent backgrounds, so they sit on a
    // soft panel (object-contain) instead of being cropped to fill the card.
    <li className="relative flex aspect-[3/4] w-[72vw] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] bg-paper-sunken sm:w-[44vw] lg:w-[26vw] xl:w-[22vw]">
      <p className="px-6 pt-5 font-condensed text-5xl font-bold tracking-tight sm:text-6xl">
        {activity.name}
      </p>
      <div className="relative flex-1">
        <Image
          src={activity.image}
          alt={activity.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 26vw, (min-width: 640px) 44vw, 72vw"
          className="object-contain object-bottom p-4"
        />
      </div>
    </li>
  );
}

function Intro() {
  return (
    <div className="flex max-w-md shrink-0 flex-col justify-end gap-5 lg:w-[34vw] lg:max-w-none lg:pr-10">
      <h2
        id="life-at-tulas-title"
        className="font-condensed text-6xl leading-[0.9] font-bold tracking-tight sm:text-7xl lg:text-8xl"
      >
        {lifeAtTulas.title}
      </h2>
      <p className="text-lg leading-relaxed text-pretty text-ink-muted">
        {lifeAtTulas.description}
      </p>
    </div>
  );
}

// Desktop: the section pins in place and vertical scrolling moves the row of
// activities sideways. The distance is measured, not guessed, so it still fits
// when the window is resized.
function PinnedTrack() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const measure = () => setScrollDistance(track.scrollWidth - window.innerWidth);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const trackX = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    // The section is as tall as the sideways distance, so one pixel scrolled
    // down equals one pixel moved across.
    <div ref={sectionRef} style={{ height: `calc(100svh + ${scrollDistance}px)` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.ul
          ref={trackRef}
          style={{ x: trackX }}
          className="flex items-stretch gap-6 pr-[clamp(1rem,4vw,3rem)] pl-[max(clamp(1rem,4vw,3rem),calc((100vw-90rem)/2+3rem))]"
        >
          <li className="flex">
            <Intro />
          </li>
          {lifeAtTulas.activities.map((activity) => (
            <ActivityCard key={activity.name} activity={activity} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

// Touch screens and reduced motion: a plain swipeable row with snap points.
function SwipeRow() {
  return (
    <div className="py-24">
      <div className="container-page">
        <Intro />
      </div>
      <ul className="mt-12 flex snap-x snap-mandatory scroll-px-[clamp(1rem,4vw,3rem)] gap-4 overflow-x-auto px-[clamp(1rem,4vw,3rem)] pb-4">
        {lifeAtTulas.activities.map((activity) => (
          <ActivityCard key={activity.name} activity={activity} />
        ))}
      </ul>
    </div>
  );
}

export default function LifeAtTulas() {
  const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover)");
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="life-at-tulas" aria-labelledby="life-at-tulas-title">
      {isDesktop && !prefersReducedMotion ? <PinnedTrack /> : <SwipeRow />}
    </section>
  );
}
