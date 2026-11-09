# Bailey Cross / Seasonal Workspace

A personal portfolio presented as a cozy desktop: page windows, original pixel icons, notebook pages, a Start menu, and seasonal landscape artwork. Built with the existing Next.js App Router, React, TypeScript, and Tailwind CSS. Existing About, Teaching, Projects, Hobbies, research, work history, and external links are retained.

## Install using GitHub drag and drop

1. Extract this ZIP on your computer. Open the extracted folder containing `package.json`, `src`, `public`, and `scripts`.
2. Open your existing `baileyfcross/baileyfcross-ui` repository and select the branch you want to update. The existing Azure workflow deploys the `production` branch.
3. At the repository root, choose **Add file > Upload files**.
4. Drag all the extracted files and folders into the upload area. Drag the contents, not the enclosing ZIP or folder. Keep the folder structure intact.
5. Commit the upload directly to your selected branch or use GitHub's option to create a branch and pull request for review.
6. For the public website to update, the changes must reach `production` and its Azure deployment must succeed.

This package contains the source directly at the ZIP root. It excludes `node_modules`, build output, patches, the separate course application's source, and GitHub workflow files. Your existing Azure deployment workflow stays in place. Existing repository files with matching paths are replaced by the uploaded versions; unrelated files remain.

The course portal has already been updated separately at https://courses.baileyfcross.info/. This package updates the personal website and its links to that portal.

## Run locally

Use Node.js 22 LTS (minimum 20.9) and npm.

```sh
npm ci
npm run dev
```

Visit the address printed by Next.js. `scripts/dev.mjs` accepts normal Next.js arguments and maps the preview tool's `--host` to Next's `--hostname`.

```sh
npm test              # seasonal calendar and browser-runtime behavior
npm run typecheck
npm run build         # static export in out/
npm start             # serve the exported site locally (build first)
```

The predev/prebuild hooks generate the pre-paint season calculator. If you change the calendar logic while the development server is already running, rerun `npm run predev` and reload.

## Automatic seasons

| Season | Theme              | Starts at midnight Eastern on the date of |
| ------ | ------------------ | ----------------------------------------- |
| Spring | Rose & Sage        | March equinox                             |
| Summer | Moss & Honey       | June solstice                             |
| Fall   | Terracotta & Peach | September equinox                         |
| Winter | Midnight & Ice     | December solstice                         |

`src/lib/seasons.ts` uses Astronomy Engine to calculate each year's astronomical boundaries locally. It converts the event's instant to an **America/New_York calendar date** and applies the theme from the beginning of that day, as requested. January continues the preceding winter. The visitor's location and operating-system appearance do not change the season.

The pre-paint runtime is embedded in the document head and runs in the visitor's browser, so a static export built in July still switches in September, December, and subsequent years. It schedules the next Eastern midnight, including 23- and 25-hour DST days, and refreshes after tab visibility, focus, and page restoration. No weather service, annual lookup table, scheduled job, backend, or seasonal redeployment is required. The visitor's device clock must be correct. Without JavaScript, the readable summer fallback and ordinary page links remain available.

The taskbar's season indicator explains the four themes. It does not save a manual override.

## Code organization

- `src/components/desktop/`: workspace shell, movable home windows, window controls, Start menu, clock, SVG pixel icons, and seasonal status.
- `src/data/`: existing project, work experience, teaching, research, and hobby content. Edit these arrays to update content.
- `src/data/site.ts`: portfolio links and course portal URLs.
- `src/app/`: route content. All original routes remain available; `/courses/` provides portal and instructor links.
- `src/styles/season-tokens.css`: all four palettes, mirrored in the separately hosted course portal.
- `public/desktop/seasons-atlas.webp`: four seasonal landscapes in a single 629 KB image. See its asset README for layout and provenance.
- `src/lib/season-runtime.ts` and `scripts/build-season-runtime.mjs`: single pre-paint runtime. `src/lib/season-boot.ts` and `public/desktop/season-runtime.js` are generated; edit the source, not those outputs.
- `tests/`: boundary dates, timezone differences, leap years, DST timing, automatic updates, and restored tabs.

Home windows can be dragged within a bounded area using a mouse. Double-click their title bar to reset position. Minimize puts the main page in the taskbar; its taskbar button restores it. Maximize expands the main window. Other pages can be closed back to Home. On small screens, windows stack and dragging is disabled. Keyboard navigation, focus indicators, a skip link, reduced motion, and print styles are included.

## Course subdomain

`courses.baileyfcross.info` is a **separate, existing login-protected course application**, not a route served by this static portfolio. The portfolio links to it from the shortcuts, navigation, taskbar, home teaching window, Teaching page, and `/courses/` landing page. Instructor access remains at `/dashboard` on that portal.

The portal received the same calculated calendar runtime, palette tokens, landscape atlas, window frame, and seasonal taskbar in its own source repository. Its catalog API, database, access policy, instructor authentication, semester archive, course editing, copying, and resource links are retained. It is intentionally not replaced with a static copy in this repository.

The alternate portal URL is `https://bailey-cross-courses.flowerybrownie.chatgpt.site/`. It is available on the Teaching and Courses pages as an alternate address. The course domain and HTTPS certificate were confirmed active during this update. The primary course URL can be configured at build time with `NEXT_PUBLIC_COURSES_URL`; otherwise it defaults to `https://courses.baileyfcross.info/`.

A link or DNS record alone cannot provision HTTPS or route one hosted application to another. The custom-domain binding belongs to the course hosting service. Keep its DNS target and verification records there; do not point the course hostname at the portfolio's Azure deployment.

When changing seasonal behavior later, mirror these portfolio files into the portal's equivalents:

| Portfolio                           | Course portal                |
| ----------------------------------- | ---------------------------- |
| `src/lib/seasons.ts`                | `seasonal/seasons.ts`        |
| `src/lib/season-runtime.ts`         | `seasonal/season-runtime.ts` |
| `src/styles/season-tokens.css`      | `app/season-tokens.css`      |
| `public/desktop/seasons-atlas.webp` | same path                    |

Run each application's prebuild/build hook to regenerate its embedded calculator. Routine season changes require no work in either application.

## Azure deployment

The existing Azure workflow deploys **production**. `npm run build` exports `out/`, including `staticwebapp.config.json`. Keep `output: 'export'` and `trailingSlash: true` in `next.config.ts`. The static-host configuration redirects old slashless routes to their exported directories and serves the exported 404 page for missing files. There is no catch-all homepage rewrite that would hide broken asset paths.

Upload this package at the repository root using the steps above. Review the changes and commit them to `production`, or merge a reviewed feature branch into `production`. The existing deployment secret and Azure application are unchanged. A merge into `main` by itself does not publish the Azure production site.

The course application is deployed separately with its existing hosting workflow and private access preserved.
