import Image from "next/image";
import Reveal from "@/components/ui/Reveal/Reveal";
import { studentStories } from "@/data/home";

// Two student voices on a dark pine band. The second quote sits lower than the
// first on large screens, so the pair reads like a conversation, not a grid.
export default function StudentStories() {
  return (
    <section
      aria-labelledby="student-stories-title"
      className="bg-forest py-28 text-on-forest sm:py-36"
    >
      <div className="container-page">
        <h2 id="student-stories-title" className="text-sm font-medium text-accent">
          In their words
        </h2>
        <div className="mt-12 grid gap-20 lg:grid-cols-2 lg:gap-16">
          {studentStories.map((story, index) => (
            <Reveal
              key={story.quote}
              delay={index * 0.15}
              className={index === 1 ? "lg:mt-40" : ""}
            >
              <figure className="flex flex-col gap-8">
                <blockquote className="font-condensed text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl">
                  <p>
                    <span aria-hidden="true" className="text-accent">
                      “
                    </span>
                    {story.quote}
                    <span aria-hidden="true" className="text-accent">
                      ”
                    </span>
                  </p>
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span className="relative size-24 shrink-0 sm:size-28">
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium">A Tulas student</span>
                    <span className="text-sm text-on-forest-muted">{story.context}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
