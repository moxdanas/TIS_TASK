import Reveal, { RevealItem } from "@/components/ui/Reveal/Reveal";
import { sports } from "@/data/home";

// The sports list is set as a wall of large words rather than icon cards: the
// sheer number of them is the message, so the type itself carries it.
export default function Sports() {
  return (
    <section id="sports" aria-labelledby="sports-title" className="py-28 sm:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {/* Sticky on desktop so the claim stays beside the list as it scrolls past. */}
          <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28">
            <h2
              id="sports-title"
              className="font-condensed text-5xl leading-[0.92] font-bold tracking-tight text-balance sm:text-6xl"
            >
              {sports.title}
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-ink-muted">{sports.description}</p>
          </Reveal>
        </div>

        <Reveal
          as="ul"
          stagger={0.04}
          className="flex flex-wrap items-baseline gap-x-5 gap-y-1 lg:col-span-7"
        >
          {sports.list.map((sport, index) => (
            <RevealItem
              as="li"
              key={sport}
              // Alternating ink and muted tones separate the words without extra marks.
              className={`font-condensed text-5xl leading-tight font-semibold tracking-tight sm:text-6xl xl:text-7xl ${
                index % 2 === 0 ? "text-ink" : "text-ink-muted"
              }`}
            >
              {sport}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
