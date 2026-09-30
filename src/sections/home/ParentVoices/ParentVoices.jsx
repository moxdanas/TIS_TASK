import Image from "next/image";
import Marquee from "@/components/ui/Marquee/Marquee";
import Reveal from "@/components/ui/Reveal/Reveal";
import { parentVoices } from "@/data/home";

export default function ParentVoices() {
  const { featured, reviewers } = parentVoices;

  return (
    <section id="parent-voices" aria-labelledby="parent-voices-title" className="py-28 sm:py-36">
      <div className="container-page">
        <h2 id="parent-voices-title" className="text-sm font-medium text-accent-ink">
          From the parents
        </h2>
        <Reveal as="figure" className="mt-10 max-w-5xl">
          <blockquote className="font-condensed text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <p>“{featured.quote}”</p>
          </blockquote>
          <figcaption className="mt-8 text-ink-muted">{featured.attribution}</figcaption>
        </Reveal>
      </div>

      <div className="mt-20">
        <p className="container-page text-ink-muted">Parents who have reviewed TIS on Google</p>
        <Marquee copies={2} className="mt-6">
          {reviewers.map((reviewer) => (
            <div
              key={reviewer.name}
              className="mr-4 flex shrink-0 items-center gap-3 rounded-full border border-line py-2 pr-6 pl-2"
            >
              {/* Decorative: the name next to it already says who this is. */}
              <Image
                src={reviewer.photo}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <p className="flex flex-col">
                <span className="font-medium">{reviewer.name}</span>
                <span className="text-sm text-ink-muted">{reviewer.relation}</span>
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
