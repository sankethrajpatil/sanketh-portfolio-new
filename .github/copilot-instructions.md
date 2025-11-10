## Repository quick context

This is a small React + Vite portfolio app (single-page, 5-section parallax). Key runtime pieces live under `src/` and static assets live in `public/`.

- Entrypoint: `index.html` -> `/src/main.jsx` -> `App.jsx`
- Main UI components: `src/components/Section.jsx`, `src/components/ThemeToggle.jsx`
- Styling: `src/styles.css` and `src/components/ThemeToggle.css`
- Build tool: Vite (see `vite.config.js`) with React plugin

## High-level architecture & why

- Single-page React app that renders an array of `sections` (in `App.jsx`). Each section may be a landing view or content view. The parallax/section transition logic is implemented imperatively in `App.jsx` using GSAP timelines to avoid layout thrash and to control a single active animation timeline.
- Content sections inject HTML strings via `dangerouslySetInnerHTML` (see `sections` array in `App.jsx`). That means content is static and trusted in this repo — avoid injecting untrusted data unless sanitized.
- Theme switching is stored in `localStorage` and applied as a body class (`dark-mode` / `light-mode`) — see the initial state and effect in `App.jsx` and the `ThemeToggle` component.

## Developer workflows (concrete commands)

- Install dependencies: `npm install`
- Start dev server (Vite): `npm run dev` (Vite server configured to port 3000 in `vite.config.js`)
- Build for production: `npm run build`
- Preview production build: `npm run preview`

When running locally, expect the app to open on `http://localhost:3000` (not the Vite default 5173 — this project sets port 3000).

## Project-specific patterns and gotchas for an AI assistant

- Parallax logic is centralized in `App.jsx` (large useEffect). If you change section DOM structure, update the queries that select `.section`, `.background`, `.wrapper-outer`, `.wrapper-inner`, `.section-title`, and `.content-wrapper`.
- Scrolling behavior: the wheel/touch handlers attempt to allow native scrolling inside `.content-wrapper` and only intercept at boundaries. Preserve the `content-wrapper` semantic when adding scrollable inner content.
- Images: landing image is loaded from `imageUrl` (e.g. `/sanketh-photo.jpg` in `public/`). `Section.jsx` contains an onError handler that logs and swaps to an inline SVG fallback — use that pattern if adding other images.
- DangerouslySetInnerHTML: sections with `content` use HTML strings. If generating or modifying these strings, keep markup simple and avoid user-provided data; sanitize before insertion if data becomes dynamic.
- Single active GSAP timeline: `App.jsx` cancels any existing `activeTimeline` before starting a new one. Follow this pattern when adding animations to avoid overlapping timelines.

## Integration points & dependencies

- GSAP (`gsap`) for animations — heavy use in `App.jsx`.
- Vite + `@vitejs/plugin-react` for dev and build.
- No backend/backend API integrations in this repo — the app is static and asset-driven.

## Example tasks an AI assistant should perform confidently

- Add a new section: update the `sections` array in `App.jsx` (include `id`, `title`, `className`, and optionally `content` or `imageUrl`). Keep HTML content as a string if using `content`.
- Change theme default: edit the initialization logic in `App.jsx` where `useState` reads `localStorage`.
- Replace landing image: add `sanketh-photo.jpg` to `public/` and confirm the path `/sanketh-photo.jpg` is used.
- Adjust animation timings: modify the GSAP timeline defaults in `App.jsx` where the timeline is created.

## What to avoid / be careful about

- Don't remove or rename `.content-wrapper` or other DOM selectors without updating the animation and scroll logic in `App.jsx`.
- Avoid injecting untrusted HTML into `content` strings — the app intentionally uses `dangerouslySetInnerHTML`.
- When changing global overflow/positioning styles (e.g., `body { overflow: hidden }`), be aware this app uses fixed `.section` panels and relies on that layout.

## Where to look for examples

- Parallax + navigation: `src/App.jsx` (look for `gotoSection`, `handleWheel`, and `gotoSection(0,1)`)
- Section markup patterns and image fallback: `src/components/Section.jsx`
- Theme toggle and styling example: `src/components/ThemeToggle.jsx` and `src/components/ThemeToggle.css`

If any part is unclear or you'd like richer examples (e.g., a safe helper to convert markdown->HTML for `content`, or unit tests around the sections array), tell me which area to expand and I'll iterate.
