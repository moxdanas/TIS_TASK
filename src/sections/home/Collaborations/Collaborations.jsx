import Image from "next/image";
import Marquee from "@/components/ui/Marquee/Marquee";
import { collaborations } from "@/data/home";

export default function Collaborations() {
  return (
    <section aria-labelledby="collaborations-title" className="border-t border-line py-20">
      <div className="container-page">
        <h2 id="collaborations-title" className="text-sm font-medium text-accent-ink">
          {collaborations.title}
        </h2>
      </div>
      <Marquee pixelsPerSecond={50} className="mt-8">
        {collaborations.partners.map((partner) => (
          // Logos are made for white backgrounds, so each gets a white tile in
          // both themes rather than being recoloured.
          <div
            key={partner.name}
            className="mr-4 grid size-28 shrink-0 place-items-center rounded-3xl bg-white p-3 sm:size-36"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={144}
              height={144}
              className="size-full object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
