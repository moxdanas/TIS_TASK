import Reveal, { RevealItem } from "@/components/ui/Reveal/Reveal";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { rankings } from "@/data/home";

// Rankings read like a results board: the rank is the loudest thing on each row.
export default function Rankings() {
  return (
    <section id="rankings" aria-labelledby="rankings-title" className="py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          id="rankings-title"
          label="Rankings"
          title="Ranked among India's best boarding schools"
        />

        <Reveal as="ol" stagger={0.1} className="mt-16 border-t border-line">
          {rankings.map((ranking) => (
            <RevealItem
              as="li"
              key={`${ranking.rank}-${ranking.region}`}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b border-line py-8 sm:grid-cols-12 sm:gap-x-8"
            >
              <p className="font-condensed text-7xl leading-none font-bold tracking-tight text-accent-ink sm:col-span-3 sm:text-8xl lg:text-9xl">
                <span className="sr-only">Rank </span>#{ranking.rank}
              </p>
              <p className="font-condensed text-3xl leading-none font-semibold tracking-tight sm:col-span-5 sm:text-5xl">
                in {ranking.region}
              </p>
              <p className="col-span-2 text-ink-muted sm:col-span-4 sm:text-right">
                {ranking.category}
                <span className="block text-sm">{ranking.source}</span>
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
