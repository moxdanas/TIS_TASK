"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { personalities } from "@/data/home";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

export default function Personalities() {
  // On large screens a single portrait panel shows whoever is hovered or focused
  // in the list; smaller screens show a thumbnail on every row instead.
  const [activeSlug, setActiveSlug] = useState(personalities.achievers[0].slug);
  const activePerson = personalities.achievers.find((person) => person.slug === activeSlug);

  return (
    <section aria-labelledby="personalities-title" className="py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          id="personalities-title"
          title="Influential personalities on campus"
          description="Olympians, world champions, artists and changemakers who have visited the Tulas campus."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <ul className="border-t border-line lg:col-span-7">
            {personalities.achievers.map((person) => (
              <li
                key={person.slug}
                onPointerEnter={() => setActiveSlug(person.slug)}
                data-cursor="hover"
                className="group flex items-center gap-5 border-b border-line py-5"
              >
                <span className="relative size-14 shrink-0 overflow-hidden rounded-full lg:hidden">
                  <Image src={person.image} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="flex flex-col gap-1">
                  <span
                    className={`font-condensed text-3xl font-semibold tracking-tight transition-transform duration-500 ease-out-expo sm:text-4xl lg:group-hover:translate-x-3 ${
                      person.slug === activeSlug ? "lg:translate-x-3" : ""
                    }`}
                  >
                    {person.name}
                  </span>
                  <span className="text-ink-muted">{person.role}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[3/2] overflow-hidden rounded-[2rem] bg-forest">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activePerson.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
                >
                  <Image
                    src={activePerson.image}
                    alt={`Portrait of ${activePerson.name}`}
                    fill
                    sizes="36vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-12">
          <h3 className="font-condensed text-3xl font-semibold tracking-tight lg:col-span-4">
            Leaders of India who have visited TIS
          </h3>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 text-lg text-ink-muted sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {personalities.leaders.map((leader) => (
              <li key={leader}>{leader}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
