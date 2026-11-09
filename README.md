# Teaching & Research page update

This is a drop-in update for `baileyfcross/baileyfcross-ui` (Next.js).

## What changes

- Keeps the existing course portal and course cards.
- Adds a Teaching tools & knowledge systems section featuring Zettelkasten and Lecture SLM.
- Adds a Simulation game projects section featuring Pro Football Dynasty and Pro Basketball Dynasty, each linked directly to its SyracuseGameStudio path.
- Keeps the existing academic research entries.
- Reuses the existing `content-card`, `content-grid`, `card-link`, and `Tags` styling. No CSS or seasonal theme changes are needed.
- Updates teaching-page SEO metadata and JSON-LD item listings for the four new projects.

## Install

From the root of `baileyfcross-ui`:

1. Copy the `src` directory from this ZIP into the repository, allowing these three files to be replaced:
   - `src/data/teaching.ts`
   - `src/app/teaching/page.tsx`
   - `src/lib/seo.ts`
2. Run `npm ci` if dependencies are not installed.
3. Run `npm run typecheck`, `npm test`, and `npm run build`.
4. Preview at `/teaching/` with `npm run dev` and merge through your existing production workflow when satisfied.

These files were generated from the current `main` branch content. If you have local changes in the same three files, review the diff before overwriting.

## Link configuration

Game destinations are currently:

- `https://syracusegamestudio.org/ProFootballDynasty/`
- `https://syracusegamestudio.org/ProBasketballDynasty/`

Both paths were verified in the source repository for SyracuseGameStudio. Live website availability could not be independently checked. The project links live in `src/data/teaching.ts` if you ever rename the routes.

No remote GitHub repository or Google Drive files were modified.
