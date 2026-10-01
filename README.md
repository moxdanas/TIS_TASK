# Tulas International School — Homepage Redesign

An animated, conversion-focused redesign of the [Tulas International School](https://tis.edu.in/)
homepage, built as a frontend take-home task. TIS copy and contact details are kept; layout,
typography and motion are rebuilt around a deep oxblood red, a warm off-white and TIS
yellow.

**Live demo:** _add Vercel link_

## Features

- **Custom cursor:** a ring that follows the pointer on a spring and fills over links and
  buttons. It isn't mounted on touch devices and is hidden from screen readers.
- **Scroll-triggered reveals:** one shared `Reveal` wrapper, with staggered children for
  lists (sports, stats, rankings, awards).
- **Theme switcher:** an animated sun/moon toggle with light, dark or system theme via
  `next-themes`.
- **Scroll progress bar:** a `scaleX` bar driven by `useScroll`.
- **Pinned horizontal scroll:** on desktop, "Let's do it with Tulas" pins and scrolls its
  activities sideways. On touch devices it becomes a swipeable row.
- **Hide-on-scroll navbar:** it slides away when scrolling down and returns on scroll up.
  On mobile it opens a full-screen menu that closes with Escape.
- **Enquiry form:** client-side validation with accessible error messages and focus on the
  first invalid field.
- **Accessible by default:** semantic landmarks, a skip link, visible focus, AA colour
  contrast in both themes, and full reduced-motion support.

## Tech stack

| Concern   | Choice                                                   |
| --------- | -------------------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19                       |
| Styling   | Tailwind CSS v4 (CSS-first `@theme` tokens)              |
| Animation | Framer Motion                                            |
| Theming   | next-themes                                              |
| Font      | Bricolage Grotesque (variable width) via `next/font`     |
| Hosting   | Vercel                                                   |

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Folder structure

```
src/
├── app/            layout, providers, global styles, page outline
├── components/
│   ├── layout/     TopBar, Navbar, Footer
│   ├── effects/    CustomCursor, ScrollProgress, ThemeToggle
│   └── ui/         Button, Logo, Marquee, Reveal, SectionHeading, StatCounter
├── sections/home/  one folder per homepage section, in page order
├── data/           site facts, navigation and all section copy as plain JS
├── hooks/          useMediaQuery, useMounted, usePrefersReducedMotion
└── lib/            motion.js (shared variants), validateEnquiry.js
```

`src/app/page.jsx` reads as the page outline. Every section gets its text from
`src/data/home.js`, so copy changes never touch a component.

## Key decisions

- **Server components by default.** Only components that need state, effects or motion are
  marked `"use client"`. `Reveal` lets static sections animate without becoming client
  components.
- **Motion values over state.** The cursor, progress bar, navbar, marquee and counters read
  scroll and pointer positions through motion values, so continuous motion causes no React
  re-renders.
- **Only `transform` and `opacity` are animated.** Even the button hover is a fill scaled on X.
- **Theme tokens, not hex codes.** Components use semantic colours (`bg-paper`, `text-ink`,
  `bg-band`, `bg-accent`), defined once in `globals.css` and swapped under `.dark`.
- **Reduced motion.** `MotionConfig reducedMotion="user"` turns off transform animations
  site-wide. Components that change their structure (the pinned scroll, the marquee) use a
  hydration-safe `usePrefersReducedMotion` hook, so server and client HTML always match.

## Known limitations

- **Images are loaded from tis.edu.in.** Photos, logos and partner marks come straight from
  the live TIS site (allowed in `next.config.mjs`, listed in `src/data/home.js`). Their
  filenames include a content hash, so if TIS redeploys their site those URLs change and the
  images must be re-linked. Downloading them into `public/` would remove that dependency.
- **The enquiry form is front-end only.** It validates and confirms, but doesn't send data
  anywhere, and the confirmation says so. Connecting it to an API route or form service is
  the next step.
- **Parent review texts** weren't published on the homepage, so reviewers are shown by
  name and photo only.
