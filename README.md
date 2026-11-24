# Mahi Siddhant Sharma — Portfolio

A Next.js App Router portfolio built in JavaScript with Tailwind CSS, React Three Fiber, Drei, GSAP ScrollTrigger, Motion for React, and reusable SVG architecture diagrams.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Open `http://localhost:3000`. No environment variables or backend are required. The PDF at `public/resume.pdf` is served at `/resume.pdf`.

## Structure

- `src/app`: page composition, metadata, and responsive styles
- `src/components/layout`: navigation
- `src/components/sections`: page content and contact actions
- `src/components/three`: procedural laptop, canvas terminal, lighting
- `src/components/diagrams`: accessible SVG project architecture diagrams
- `src/components/animations`: viewport entrance motion
- `src/data/projects.js`: project copy, links, statuses, and skills

## Scroll sequence

The hero uses one GSAP ScrollTrigger that pins the hero for a 300% viewport scroll distance. Its normalized progress drives a procedurally modeled laptop: lateral move and rotation, scale and camera approach, then progressive terminal text and the final message. The scene uses a demand render loop and a capped pixel ratio. Native scrolling remains enabled, and reversing scroll reverses the timeline. “Skip intro” scrolls past the pinned sequence. The static CSS laptop stays visible while the 3D bundle loads and when WebGL is unavailable. Reduced-motion mode skips pinning and 3D animation.

Tailwind utilities are compiled locally from `src/` by `scripts/build-tailwind.mjs` before `dev` and `build`. This avoids a CSS loader process that cannot bind a port in restricted environments; the generated stylesheet is committed for reproducible builds.

The laptop is entirely constructed in Three.js; there is no external model or license dependency. Diagrams describe actual request and data paths, with planned capabilities labeled as such.

## Updating content

Edit `src/data/projects.js` to update project status, stack, descriptions, and repository URLs. All three project repository links are configured. Move Net is marked as an active build; RelayBoard API and Redistack are marked complete for their documented project scopes. Replace `public/resume.pdf` with a newer resume when needed. Update `src/app/layout.js` and `public/og-image.svg` for branding and sharing details.

## Vercel

Import this directory as a Next.js project on Vercel. The default framework preset, `npm run build`, and standard output work without extra configuration. Set `NEXT_PUBLIC_SITE_URL` to your production domain if you have one. Otherwise, Vercel’s deployment URL is used for social image metadata. Deployment has not been performed.
