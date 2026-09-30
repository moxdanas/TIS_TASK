import Button from "@/components/ui/Button/Button";
import Logo from "@/components/ui/Logo/Logo";
import { footerLinks, socialLinks } from "@/data/navigation";
import { site, toTelHref } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-forest text-on-forest">
      <div className="container-page pt-24 pb-10">
        {/* The school's own slogan closes the page, with the one action that matters. */}
        <div className="flex flex-col gap-10 border-b border-on-forest/15 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-condensed text-6xl leading-[0.9] font-bold tracking-tight text-balance sm:text-8xl lg:text-9xl">
            Let&apos;s do it with Tulas
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button href={site.applyUrl} size="lg">
              Apply now
            </Button>
            <Button href="#enquire" variant="inverse" size="lg">
              Enquire now
            </Button>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Logo tone="forest" />
            <address className="max-w-sm leading-relaxed text-on-forest-muted not-italic">
              {site.name}, {site.address}
            </address>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-3">
            <h2 className="text-sm text-on-forest-muted">Get in touch</h2>
            <a href={toTelHref(site.admissionHelpline)} className="text-lg hover:text-accent">
              {site.admissionHelpline}
            </a>
            {site.landlines.map((landline) => (
              <a key={landline} href={toTelHref(landline)} className="hover:text-accent">
                {landline}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
          </div>

          <nav aria-label="Social media" className="flex flex-col gap-3 lg:col-span-4">
            <h2 className="text-sm text-on-forest-muted">Follow TIS</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav aria-label="Policies and resources" className="border-t border-on-forest/15 py-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-on-forest-muted">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-on-forest"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="pt-4 text-sm text-on-forest-muted">
          © {new Date().getFullYear()} {site.name}. Homepage redesign concept.
        </p>
      </div>
    </footer>
  );
}
