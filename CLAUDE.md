# TIS Homepage Redesign — Project Rules

Redesign of the Tulas International School homepage (https://tis.edu.in/) as an
animated, high-converting landing page. Keep TIS branding and copy; elevate the
design and motion. This is a take-home task: the code will be reviewed line by
line and I must be able to explain every file, so clarity beats cleverness.

## Tech stack (do not add anything else without asking)
- Next.js (App Router) + React
- Tailwind CSS for styling
- Framer Motion for all animation
- next-themes for dark/light mode
- Deployed on Vercel

## Folder structure
```
src/
├── app/
│   ├── layout.jsx          → fonts, metadata, skip link, global effects
│   ├── providers.jsx       → client-side providers: next-themes + MotionConfig
│   ├── page.jsx            → ONLY imports and stacks sections in order
│   └── globals.css         → Tailwind v4 `@import`, `@theme` tokens, `.dark` variables
├── components/
│   ├── layout/
│   │   ├── TopBar/         → admissions helpline strip above the navbar
│   │   ├── Navbar/         → logo, nav links, Apply Now, mobile menu
│   │   └── Footer/         → address, policy links, socials, copyright
│   ├── effects/
│   │   ├── CustomCursor/   → ring cursor that grows on hoverable elements
│   │   ├── ScrollProgress/ → top reading-progress bar
│   │   └── ThemeToggle/    → animated sun/moon switch
│   └── ui/                 → small reusable pieces: Button, Logo, Marquee,
│                             SectionHeading, Reveal (+ RevealItem), StatCounter
├── sections/home/          → one folder per visible section; order lives in page.jsx
│   ├── Hero/               → "Welcome to Tulas International School" + CTAs
│   ├── LifeAtTulas/        → "Let's do it with Tulas" pinned horizontal scroll
│   ├── StudentStories/     → the two student quote blocks
│   ├── Sports/             → 16+ sports as a wall of words
│   ├── WhyTIS/             → "secret to making school awesome" + stats
│   │                         (22 acre campus, 16+ sports, 24x7 medical, 6:1 ratio)
│   ├── Rankings/           → #1 Dehradun, #2 Uttarakhand, #1 North India, #4 India
│   ├── Personalities/      → influential personalities and leaders on campus
│   ├── Awards/
│   ├── VirtualTour/
│   ├── ParentVoices/       → featured parent quote + reviewer marquee
│   ├── Collaborations/     → partner logo marquee
│   └── Enquiry/            → enquiry form + contact details + map
├── data/                   → all copy and lists as plain JS objects
│                             (site.js contact facts, navigation.js links, home.js section copy)
├── hooks/                  → useMediaQuery, useMounted, usePrefersReducedMotion
├── lib/                    → motion.js (shared variants), validateEnquiry.js
└── (images)                → loaded from tis.edu.in via next/image remotePatterns;
                              URLs live in src/data/home.js
```

## Component rules
- One component per folder: `Name.jsx` (+ `index.js` re-export if useful).
- Section components render layout only; their text and lists come from `src/data/`.
- `app/page.jsx` must read like the page outline: `<Hero /> <LifeAtTulas /> ...`.
- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`,
  `<footer>`, real `<button>` and `<a>` elements, one `<h1>` on the page.
- Mark a component `"use client"` only when it needs state, effects or motion.
  Keep static content as server components.
- Use `next/image` for every image, with meaningful `alt` text.
- Tailwind only; no inline style objects except for motion values.
- Colors come from semantic tokens (`bg-paper`, `text-ink`, `text-accent-ink`...),
  never raw hex in components, so light/dark is handled once in globals.css.
- Lazy-load video/iframe embeds (poster first, iframe on click).

## Animation rules
- Define shared variants (fadeUp, stagger container, etc.) once in `lib/motion.js`
  and reuse them. Do not redefine the same animation in multiple files.
- Scroll reveals go through the single `ui/Reveal` wrapper using `whileInView`
  with `viewport={{ once: true }}`.
- Animate only `transform` and `opacity` for smooth 60fps.
- Respect reduced motion: `MotionConfig reducedMotion="user"` in providers.jsx covers
  variants site-wide; use `usePrefersReducedMotion` (hydration-safe) for springs,
  counters, loops and anything that renders a different tree.
- Follow the pointer and scroll with motion values (`useMotionValue`, `useScroll`,
  `useSpring`), never React state, so they cause no re-renders.
- Custom cursor is disabled on touch devices and hidden from screen readers.
- Clean up every event listener and animation frame in effect cleanups.

## Responsiveness
- Mobile first. Check every section at 375px, 768px, 1024px and 1440px.
- No horizontal scroll at any width.

## Code quality
- No unused variables, imports, files or dependencies. Run `npm run lint` and
  `npm run build` after changes and fix all warnings.
- Descriptive names; no abbreviations like `d`, `tmp`, `el2`.
- Comments explain *why*, not *what*. No leftover console.logs or commented-out code.

## How to work with me
- Before creating or moving files, show the plan and wait for approval.
- Build one section at a time; after each, briefly explain what you did and why,
  so I can explain it in the code review.
- Keep README.md updated: project overview, features, stack, folder structure,
  local setup (`npm install`, `npm run dev`), and the live Vercel link.

## Next.js version notes
This project uses Next.js 16 — see @AGENTS.md before relying on older APIs.
