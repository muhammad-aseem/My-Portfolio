# Muhammad Aseem — Portfolio

Personal portfolio for **Muhammad Aseem**, an aspiring Python backend and AI developer. The site presents selected projects, technical interests, experience, and contact information in a responsive, accessible interface.

**Live website:** [muhammad-aseem.github.io/My-Portfolio](https://muhammad-aseem.github.io/My-Portfolio/)

## Technology

| Area | Technologies |
| --- | --- |
| UI | React 19, React DOM, TypeScript |
| Build and development | Vite 7, `@vitejs/plugin-react`, Node.js, npm |
| Motion and scroll effects | GSAP, ScrollTrigger, CSS animations, `requestAnimationFrame` |
| 3D scene | Three.js, React Three Fiber, WebGL 2 |
| Styling and typography | CSS, responsive layouts, Manrope Variable (self-hosted with Fontsource) |
| Quality and formatting | TypeScript compiler, Prettier |
| Hosting and deployment | GitHub Pages, GitHub Actions |

### Frontend

The portfolio is a client-rendered React application written in TypeScript. Vite serves the development app and bundles the static production files. The interface includes responsive navigation, project filters, accessible project dialogs and galleries, expandable information panels, contact links, and a cursor-following spotlight effect.

GSAP and ScrollTrigger animate section reveals. CSS handles the visual system, responsive layouts, focus states, and reduced-motion behavior. The Manrope variable font and site assets are stored locally so the site does not depend on third-party font or image hosts.

### Backend

**There is no backend in this project.** The site is a static frontend and does not run a server, database, or custom API. GitHub Pages hosts the built files. Contact and social actions are direct links; the email-copy control uses the browser clipboard when available and falls back to an email link.

## Procedural 3D robot

The robot is an original, code-built model in `src/components/Robot.tsx`; it is not an imported or downloaded model. Its geometry is assembled from Three.js meshes, including rounded boxes, capsules, cylinders, and spheres. Hierarchical groups form the head, torso, joints, arms, and legs. Standard materials, directional and hemisphere lighting, shadows, and a ground plane give the scene its finish.

React Three Fiber mounts the scene in a Three.js canvas. Its frame loop animates the robot’s entrance and subtle idle motion, while the head smoothly follows pointer movement. The component is dynamically imported only when WebGL 2 is available. Reduced-motion preferences, unsupported WebGL, or renderer errors use the static illustration in `src/components/RobotFallback.tsx` instead.

## Run locally

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Vite prints the local development address. Create and preview a production build with:

```sh
npm run build
npm run preview
```

Run the strict TypeScript check independently with:

```sh
npm run typecheck
```

The deployable static site is written to `dist/`.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Page composition, navigation, scroll effects, and robot loading |
| `src/data.ts` | Profile, projects, skills, learning topics, certification, and asset paths |
| `src/components/Robot.tsx` | Procedural Three.js robot and animated scene |
| `src/components/RobotFallback.tsx` | Static robot illustration for reduced motion or unavailable WebGL |
| `src/components/ProjectDialog.tsx` | Project details, galleries, and terminal examples |
| `src/components/ProjectArt.tsx` | Project illustrations and screenshot presentation |
| `src/components/Spotlight.tsx` | Pointer-following spotlight effect |
| `src/styles.css` | Colors, layout, responsive styling, and interaction states |
| `public/` | Self-hosted font, images, CV and certificate files, and site metadata |
| `.github/workflows/deploy.yml` | Production build and GitHub Pages deployment |

## Accessibility and performance

- Semantic page landmarks, a skip link, descriptive labels and alternative text, and visible keyboard focus.
- Native dialogs and disclosure controls for keyboard-friendly project and navigation interactions.
- Reduced-motion support for reveals, scrolling, spotlight, and the robot.
- The 3D code loads only after a WebGL 2 capability check; rendering pauses when the robot is inactive or the browser tab is hidden.
- Self-hosted fonts and assets; images and the 3D scene are loaded only where needed.

## Content

Update `src/data.ts` to edit profile details, projects, skills, learning topics, certification information, and related links. Page structure and interactions live in `src/App.tsx`; individual components and styles are under `src/components/` and `src/styles.css`.

Project descriptions distinguish professional experience from learning projects. The Python examples are terminal programs, not live web applications. The Click Catalyst repository is private; its portfolio entry describes frontend contributions only. Replace the CV by updating its files in `public/` and the corresponding paths in `src/data.ts`.

## Deployment

The live site is published at [https://muhammad-aseem.github.io/My-Portfolio/](https://muhammad-aseem.github.io/My-Portfolio/). The `.github/workflows/deploy.yml` workflow runs on pushes to `main` and on manual dispatch. It installs dependencies, runs the production build, and deploys `dist/` to GitHub Pages. The repository’s Pages source should be set to **GitHub Actions**.

Vercel and Netlify configuration files are also included for deployments using the same Vite build.
