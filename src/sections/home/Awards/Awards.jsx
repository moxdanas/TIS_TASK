import Image from "next/image";
import Reveal, { RevealItem } from "@/components/ui/Reveal/Reveal";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { awards } from "@/data/home";

export default function Awards() {
  return (
    <section aria-labelledby="awards-title" className="bg-paper-sunken py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading id="awards-title" label="Awards" title={awards.title} />

        <Reveal as="ul" stagger={0.12} className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          {awards.list.map((award) => (
            <RevealItem as="li" key={award.name} className="flex flex-col gap-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
                <Image
                  src={award.image}
                  alt={`${award.name} award presented to Tulas International School`}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-condensed text-3xl font-semibold tracking-tight">{award.name}</h3>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
