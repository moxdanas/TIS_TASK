import Image from "next/image";
import Reveal, { RevealItem } from "@/components/ui/Reveal/Reveal";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import StatCounter from "@/components/ui/StatCounter/StatCounter";
import { whyTis } from "@/data/home";

export default function WhyTIS() {
  return (
    <section
      id="why-tis"
      aria-labelledby="why-tis-title"
      className="bg-paper-sunken py-28 sm:py-36"
    >
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="why-tis-title"
            label="About TIS"
            title={whyTis.title}
            description={whyTis.description}
            className="lg:col-span-7"
          />
          <Reveal className="relative aspect-square lg:col-span-5">
            <Image
              src={whyTis.image.src}
              alt={whyTis.image.alt}
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-contain"
            />
          </Reveal>
        </div>

        {/* Stats as a <dl>: each number is a value described by its label.
            The 1px gap over a line-coloured background draws the hairline grid. */}
        <Reveal
          as="dl"
          stagger={0.1}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-line bg-line lg:grid-cols-4"
        >
          {whyTis.stats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="flex flex-col-reverse gap-3 bg-paper-sunken p-6 sm:p-8"
            >
              <dt className="text-ink-muted">{stat.label}</dt>
              <dd className="font-condensed text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </dd>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
