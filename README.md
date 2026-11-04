# Muhammad Aseem — Portfolio

A complete React + TypeScript + Vite portfolio for an aspiring Python backend and AI developer. Includes GSAP/ScrollTrigger reveals, a cursor-following peach spotlight, project filtering and galleries, accessible native dialogs, expandable information panels, a verified certificate PDF, and a lazy-loaded Three.js/React Three Fiber robot.

## Run locally

Requires Node.js 22.12+ (Node 24 was used during development).

```sh
npm ci
npm run dev
```

The terminal prints the local address. Build and preview production output with:

```sh
npm run build
npm run preview
```

`npm run typecheck` performs the strict TypeScript check. `dist/` is the deployment-ready static output.

## Update content

- `src/data.ts`: profile details, project descriptions/links, toolkit, learning topics and certification.
- `src/App.tsx`: page sections, navigation and animation setup.
- `src/components/ProjectDialog.tsx`: accessible project galleries and terminal examples.
- `src/components/ProjectArt.tsx`: original Python-project illustrations and real Click Catalyst screenshot presentation.
- `src/components/Robot.tsx`: original Three.js robot geometry, materials, lighting and motion.
- `src/components/RobotFallback.tsx`: original static illustration for reduced motion or unavailable WebGL.
- `src/components/Spotlight.tsx`: local requestAnimationFrame cursor interpolation, with cleanup.
- `src/styles.css`: visual system and responsive rules.
- `public/`: self-hosted font, optimized images, certificate PDF, metadata assets and crawler files.

Add additional certificates only after checking their actual files and details. The supplied CV is available through View CV and Download CV controls in the hero and mobile menu, plus a desktop navigation link. View CV opens the original SVG; Download CV saves a PDF containing the same unchanged design. Update the CV paths in `src/data.ts` when replacing it.

## Interaction and accessibility

- Project cards open native modal dialogs. Escape closes; focus is trapped by the browser and returned to the invoking control.
- Project filters use pressed-state buttons; galleries have labeled previous/next controls.
- Native disclosure panels support keyboard interaction.
- Mobile navigation is a modal dialog with focus restoration.
- Reduced-motion mode removes moving text reveals, smooth scrolling and spotlight effects and uses the static robot illustration.
- The robot chunk loads only after a successful WebGL2 capability check. Rendering pauses outside the hero and while the tab is hidden; a pause control is offered for the active 3D model.
- No WebGL support: the static illustration is displayed without loading the Three.js chunk.
- Touch devices use normal tap/focus states. No content requires a hover interaction.
- Semantic landmarks, skip link, labels, focus styles, alt text and a useful noscript introduction are included.

## Content accuracy

The role is “Aspiring Python Backend & AI Developer.” The degree is BSc (Computing), Arden University, 2023–2027 expected. Internship content reflects the user’s confirmed frontend background. Currently learning subjects are labeled separately from technologies used.

Only Click Catalyst and the three specified Python projects are featured. The Python programs have terminal examples, not invented live web demos. Click Catalyst’s repository is private and labeled that way. Its screenshots show the current live site, which has evolved beyond the inspected repository; the description limits the contribution to frontend work.

The phone link uses Pakistan’s international dialing prefix, `+92`, and the contact section displays the number in a readable format. Email and social links are direct links. Copy-email success feedback is included, with an email-client fallback when clipboard permission is unavailable. No form pretends to send a message.

## Deploy to GitHub Pages

The production site is deployed from `main` by `.github/workflows/deploy.yml`. GitHub Pages should use **GitHub Actions** as its source. The Vite base path is configured for this repository’s project site:

`https://muhammad-aseem.github.io/My-Portfolio/`

Push changes to `main` to trigger a fresh build and deployment. The workflow runs `npm ci`, `npm run build`, and publishes `dist/`. The project has no server dependency or environment secrets.

Vercel and Netlify configuration files are also included; both use the same Vite production build.

All required project assets are local. Manrope is distributed with its original open font license in `public/fonts/Manrope-LICENSE.txt`. The Python project artwork and robot geometry/illustration are original code assets. Click Catalyst images are captures of the selected public project site. The certificate PDF and current CV files are user-supplied.

See `TESTING.md` for the checks actually performed and remaining verification limits.
