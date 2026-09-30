# Video-editor portfolio — what changed

## Sections (in order)
1. **Hero** — same layout/animation as before. Copy now reads "Hello! I'm ABDUL WASAY" / "Reels & VIDEO EDITOR".
   Nav: About · Client Projects · Tools · Contact. "Resume" is now "Watch Reels" and scrolls to the reels.
2. **About** (`story-section.tsx`) — video-editor intro + 3 principles, all from `src/data/portfolio.ts`.
3. **Tools I Use** (`skills-marquee.tsx`, `skills-bento.tsx`) — CapCut, VN, InShot, Alight Motion, Premiere Pro,
   After Effects, DaVinci Resolve, Filmora, Photoshop, Lightroom, Canva + platforms. Edit the list in `portfolio.skills`.
4. **Client Projects** (`client-projects-section.tsx`) — ONE reel at a time in a 9:16 phone-style player.
   Play button plays the video inline (no new tab). Prev/next arrows, keyboard ← →, "Up next" thumbnails, mute + progress bar.
   Videos live in `public/reels/*.mp4` with poster frames `public/reels/*.jpg`. Add/edit reels in `portfolio.reels`.
5. **Services** (`services-flashcards.tsx`) — Promo Reels · Short-Form Editing · Motion Text & Branding (from `portfolio.services`).
6. **Contact / Footer** — "Let's create your reel", Get in touch (email) + WhatsApp button, Instagram/TikTok/YouTube/LinkedIn tiles.

## Removed
Education, Experience (Siemens), Stats, Testimonials, Timeline, PhysicsSkills, ProjectCard, all dev project images, CV PDF.

## TODO for you (in `src/data/portfolio.ts`)
- `header.whatsapp` — your number as digits only (e.g. `923001234567`). Leave empty to hide the WhatsApp button.
- `header.links` — real TikTok / YouTube URLs (placeholders are `@wasayeditz`), or delete ones you don't use.
- Check reel titles/descriptions (names were read from the footage: Murshid Fast Food, Alkhair Food Planet,
  Abdullah Electronics, Zamzam Departmental Store).

## Run
```
npm install
npm run dev
```
Type-check (`tsc --noEmit`) and ESLint pass. `next build` needs internet for the Onest Google Font.
