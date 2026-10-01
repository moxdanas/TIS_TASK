import { site, toTelHref } from "@/data/site";

// The admissions helpline is the single most important contact for a
// prospective parent, so it sits above everything else on every screen size.
export default function TopBar() {
  return (
    <div className="bg-band text-on-band">
      <div className="container-page flex h-10 items-center justify-between gap-6 text-sm">
        <p>
          <span className="text-on-band-muted">Admission helpline </span>
          <a
            href={toTelHref(site.admissionHelpline)}
            className="font-medium underline-offset-4 hover:underline"
          >
            {site.admissionHelpline}
          </a>
        </p>
        <div className="hidden items-center gap-6 md:flex">
          <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
            {site.email}
          </a>
          <a href={toTelHref(site.landlines[0])} className="underline-offset-4 hover:underline">
            {site.landlines[0]}
          </a>
        </div>
      </div>
    </div>
  );
}
