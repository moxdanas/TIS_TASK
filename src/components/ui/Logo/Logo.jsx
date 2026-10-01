import Image from "next/image";
import { site } from "@/data/site";

// The official TIS logos: a stacked crest with dark lettering for light
// backgrounds, and a horizontal crest with white lettering for dark ones.
const STACKED_LOGO = "https://tis.edu.in/_next/static/media/schoolLogo.95f6e121.png";
const LIGHT_TEXT_LOGO = "https://tis.edu.in/_next/static/media/footer-logo.230b79ff.png";

function LightTextLogo({ className = "" }) {
  return (
    <Image
      src={LIGHT_TEXT_LOGO}
      alt={site.name}
      width={203}
      height={79}
      priority
      className={`h-12 w-auto ${className}`}
    />
  );
}

// tone="ink": navbar (switches with the theme). tone="band": always-dark areas.
export default function Logo({ tone = "ink" }) {
  return (
    <a href="#main-content" className="flex items-center">
      {tone === "band" ? (
        <LightTextLogo />
      ) : (
        <>
          {/* Only one is displayed per theme; display:none also hides the other
              from screen readers, so the name is announced once. */}
          <Image
            src={STACKED_LOGO}
            alt={site.name}
            width={1080}
            height={1080}
            priority
            className="size-16 dark:hidden"
          />
          <LightTextLogo className="hidden dark:block" />
        </>
      )}
    </a>
  );
}
