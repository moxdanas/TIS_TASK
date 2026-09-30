import Reveal from "@/components/ui/Reveal/Reveal";

const tones = {
  paper: { label: "text-accent-ink", body: "text-ink-muted" },
  forest: { label: "text-accent", body: "text-on-forest-muted" },
};

// Shared heading block: short label, condensed display title, optional intro.
// `id` goes on the <h2> so the parent <section aria-labelledby={id}> is named
// by its visible heading for screen readers. `tone="forest"` is for the dark bands.
export default function SectionHeading({
  id,
  label,
  title,
  description,
  tone = "paper",
  className = "",
}) {
  const colors = tones[tone];

  return (
    <Reveal className={`flex max-w-4xl flex-col items-start gap-5 ${className}`}>
      {label && <p className={`text-sm font-medium ${colors.label}`}>{label}</p>}
      <h2
        id={id}
        className="font-condensed text-5xl leading-[0.92] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-lg leading-relaxed text-pretty ${colors.body}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
