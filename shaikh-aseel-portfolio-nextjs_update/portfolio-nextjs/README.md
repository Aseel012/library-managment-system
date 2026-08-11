# Shaikh Aseel — Portfolio (Next.js + TypeScript)

Rebuilt from the original static HTML/CSS/JS site into a Next.js 14 (App
Router) + TypeScript + Tailwind CSS project, keeping the dotted-grid /
editorial-serif identity of the original design.

## What changed from the old site

- **Sticky navbar** on every page (single `Header` component, not copy-pasted
  per page — this is also why every page now renders at the exact same
  scale; the old site had a stray inline `<style>` block on one page that
  threw sizing off).
- **Video banner** is now a fixed-aspect, `object-fit: cover` container with
  a poster image fallback, so it never crops oddly or shows a broken frame.
- **Dark mode** uses a refined near-black palette (`#0b0c10` / `#131419`)
  instead of flat black, with a soft cross-fade + circular reveal transition
  on toggle (falls back gracefully in browsers without the View Transitions
  API).
- **Favourites** page has a segmented pill filter (All / Design / Dev)
  instead of a dropdown, with real favicon logos + names for every entry.
- **Movies & Characters** keeps real actor/movie/character photography with
  names, all rendered at one consistent tile size.
- **Projects** page/cards redesigned to match the reference screenshot:
  numbered badge, title, live/building status, external link, description,
  feature bullets, tag pills.
- **Experience** page rebuilt as a proper timeline (no dropdown anywhere).
- **View counter** in the footer on every page, backed by a free public
  counter API with a local fallback so it never looks broken offline.
- Cleaned up mojibake (broken emoji/em-dash encoding from the old files)
  site-wide.

## Getting set up locally

You need [Node.js 18.18+](https://nodejs.org) installed.

```bash
# 1. Unzip the project, then from inside the folder:
npm install

# 2. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure — what to edit

```
src/
  app/
    layout.tsx          # root layout: header, footer, theme init
    page.tsx             # home page
    projects/page.tsx
    experience/page.tsx
    favourites/page.tsx
    movies/page.tsx
    ides/page.tsx
    globals.css          # design tokens, dotted grid, dark mode palette
  components/             # Header, Footer, CommandPalette, ProjectCard, etc.
  lib/
    data.ts               # ALL editable content lives here: projects,
                           # experience, favourites, movies, skills, socials
public/
  images/                 # avatar.jpg, banner.jpg, banner_vid.mp4, etc.
```

To update your projects, work history, favourites, or socials, edit
`src/lib/data.ts` — nothing else needs to change.

To swap the banner video/avatar/photos, just replace the files in
`public/images/` with the same filenames.

## Building for production

```bash
npm run build
npm run start
```

## Deploying

The fastest path is **Vercel** (made by the creators of Next.js, and it's
free for personal projects):

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, leave
   all settings on default, click **Deploy**.
3. You'll get a live URL (and can attach a custom domain from the project
   settings afterwards).

Alternatively, `npm run build && npm run start` runs it anywhere that can
run Node.js.
