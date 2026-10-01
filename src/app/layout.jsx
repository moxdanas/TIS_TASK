import { Bricolage_Grotesque } from "next/font/google";
import CustomCursor from "@/components/effects/CustomCursor/CustomCursor";
import ScrollProgress from "@/components/effects/ScrollProgress/ScrollProgress";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import TopBar from "@/components/layout/TopBar/TopBar";
import { site } from "@/data/site";
import Providers from "./providers";
import "./globals.css";

// next/font self-hosts the font at build time: no request to Google from the
// visitor's browser and no layout shift while it loads. One variable family
// covers everything; the width and optical-size axes give headlines and body
// text their different voices.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | CBSE Boarding & Day School in Dehradun`,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1ef" },
    { media: "(prefers-color-scheme: dark)", color: "#140909" },
  ],
};

export default function RootLayout({ children }) {
  return (
    // next-themes sets the theme class on <html> before React hydrates;
    // suppressHydrationWarning tells React that difference is expected.
    <html lang="en" suppressHydrationWarning className={bricolage.variable}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-on-accent"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <CustomCursor />
          <TopBar />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
