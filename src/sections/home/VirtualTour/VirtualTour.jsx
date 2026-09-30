import Image from "next/image";
import Reveal from "@/components/ui/Reveal/Reveal";
import { virtualTour } from "@/data/home";
import { scaleIn } from "@/lib/motion";

// The whole panel is one link to the existing 360° tour on tis.edu.in; the round
// button is its visual handle and grows when the panel is hovered.
export default function VirtualTour() {
  return (
    <section aria-labelledby="virtual-tour-title" className="py-6">
      <div className="container-page">
        <Reveal variants={scaleIn}>
          <a
            href={virtualTour.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[16/9] lg:aspect-[21/9]"
          >
            <Image
              src={virtualTour.image}
              // The link is already named by its heading and button text.
              alt=""
              fill
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-forest/55" />
            <h2
              id="virtual-tour-title"
              className="absolute inset-x-6 top-6 max-w-3xl font-condensed text-5xl leading-[0.9] font-bold tracking-tight text-on-forest sm:inset-x-10 sm:top-10 sm:text-7xl lg:text-8xl"
            >
              {virtualTour.title}
            </h2>
            <span className="absolute right-6 bottom-6 grid size-28 place-items-center rounded-full bg-accent text-center text-sm font-semibold text-on-accent transition-transform duration-700 ease-out-expo group-hover:scale-125 sm:right-10 sm:bottom-10 sm:size-36 sm:text-base">
              Start the tour
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
