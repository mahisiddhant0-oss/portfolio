"use client";

import { motion, useReducedMotion } from "motion/react";

const designs = {
  relayboard: {
    title: "RelayBoard API request architecture",
    description: "Client sends a request to the REST API. Authentication verifies its JWT, authorization checks permission, business logic runs, then Prisma reads or writes PostgreSQL.",
    nodes: [
      { id: "client", label: "Client", sub: "request", x: 20, y: 105, w: 112 },
      { id: "api", label: "REST API", sub: "Express", x: 165, y: 105, w: 120 },
      { id: "auth", label: "Auth", sub: "JWT verify", x: 318, y: 105, w: 120 },
      { id: "role", label: "Access", sub: "role check", x: 471, y: 105, w: 120 },
      { id: "logic", label: "Logic", sub: "task rules", x: 624, y: 105, w: 120 },
      { id: "prisma", label: "Prisma", sub: "data access", x: 775, y: 30, w: 115 },
      { id: "db", label: "PostgreSQL", sub: "persistence", x: 775, y: 180, w: 115 },
    ],
    edges: [[132, 140, 165, 140], [285, 140, 318, 140], [438, 140, 471, 140], [591, 140, 624, 140], [744, 140, 760, 140, 760, 65, 775, 65], [832, 100, 832, 180]],
    legend: "REQUEST → AUTHENTICATE → AUTHORIZE → EXECUTE → PERSIST",
  },
  movenet: {
    title: "Move Net current modular-monolith request flow",
    description: "The React client calls the Express API. Authentication and Zod validation protect each request, a module service applies business rules, and the repository or Prisma persists records in PostgreSQL. PostGIS is installed for future spatial features. Redis runs locally and its connectivity is verified, but caching and rate limiting are not yet in the application request path.",
    nodes: [
      { id: "client", label: "React client", sub: "Vite + TypeScript", x: 18, y: 86, w: 125 },
      { id: "api", label: "Express API", sub: "HTTP delivery", x: 173, y: 86, w: 125 },
      { id: "auth", label: "Auth + Zod", sub: "role + schema", x: 328, y: 86, w: 125 },
      { id: "service", label: "Module service", sub: "business rules", x: 483, y: 86, w: 125 },
      { id: "repo", label: "Repository", sub: "Prisma / SQL", x: 638, y: 86, w: 115 },
      { id: "db", label: "PostgreSQL", sub: "PostGIS ready", x: 783, y: 86, w: 110 },
      { id: "redis", label: "Redis", sub: "local connectivity", x: 638, y: 205, w: 150 },
    ],
    edges: [[143, 121, 173, 121], [298, 121, 328, 121], [453, 121, 483, 121], [608, 121, 638, 121], [753, 121, 783, 121], [235, 156, 235, 240, 638, 240]],
    dashedEdges: [5],
    legend: "CURRENT: CLIENT → API → VALIDATION → SERVICE → DATA  /  DASHED: REDIS HEALTH CHECK",
  },
  redistack: {
    title: "Redistack cache read flow",
    description: "Application asks the cache layer for data. The layer checks Redis. A cache hit returns the value immediately; a miss reads the database, returns the value, and updates Redis with a TTL.",
    nodes: [
      { id: "app", label: "Application", sub: "read request", x: 18, y: 103, w: 140 },
      { id: "cache", label: "Cache layer", sub: "key + policy", x: 202, y: 103, w: 140 },
      { id: "redis", label: "Redis", sub: "lookup", x: 386, y: 103, w: 140 },
      { id: "hit", label: "Cache hit", sub: "return value", x: 577, y: 28, w: 145 },
      { id: "miss", label: "Cache miss", sub: "read source", x: 577, y: 178, w: 145 },
      { id: "db", label: "Database", sub: "source of truth", x: 765, y: 178, w: 125 },
    ],
    edges: [[158, 138, 202, 138], [342, 138, 386, 138], [526, 138, 552, 138, 552, 63, 577, 63], [526, 138, 552, 138, 552, 213, 577, 213], [722, 213, 765, 213], [828, 178, 828, 270, 272, 270, 272, 173]],
    legend: "MISS → DATABASE → CACHE LAYER → REDIS UPDATE (TTL)  /  HIT → RETURN",
  },
};

export default function ArchitectureDiagram({ type }) {
  const diagram = designs[type];
  const reduced = useReducedMotion();
  return <figure className="diagram-figure">
    <div className="diagram-topline"><span className="diagram-dot" /> SYSTEM ARCHITECTURE <span className="diagram-topline-right">{type.toUpperCase()} / 001</span></div>
    <svg viewBox="0 0 910 300" role="img" aria-labelledby={`${type}-diagram-title ${type}-diagram-desc`} className="architecture-svg" preserveAspectRatio="xMidYMid meet">
      <title id={`${type}-diagram-title`}>{diagram.title}</title><desc id={`${type}-diagram-desc`}>{diagram.description}</desc>
      <defs><marker id={`${type}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="none" stroke="#22c55e" strokeWidth="1.5" /></marker><pattern id={`${type}-grid`} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#ffffff" strokeOpacity=".035" strokeWidth="1" /></pattern></defs>
      <rect width="910" height="300" fill={`url(#${type}-grid)`} />
      {diagram.edges.map((points, i) => <motion.polyline key={i} points={Array.from({length: points.length / 2}, (_, j) => `${points[j * 2]},${points[j * 2 + 1]}`).join(" ")} fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray={diagram.dashedEdges?.includes(i) ? "6 6" : undefined} opacity=".8" markerEnd={`url(#${type}-arrow)`} initial={reduced ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: .8 }} viewport={{ once: true }} transition={{ duration: .75, delay: i * .08 }} />)}
      {diagram.nodes.map((node, i) => <motion.g key={node.id} initial={reduced ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: .1 + i * .07 }}><rect x={node.x} y={node.y} width={node.w} height="70" rx="3" fill="#161b18" stroke="#315140" strokeWidth="1" /><rect x={node.x} y={node.y} width="3" height="70" fill="#22c55e" opacity=".78" /><text x={node.x + 14} y={node.y + 29} fill="#f0f3f0" fontSize="14" fontWeight="600" fontFamily="Arial, sans-serif">{node.label}</text><text x={node.x + 14} y={node.y + 49} fill="#8b9c90" fontSize="10" fontFamily="monospace">{node.sub}</text></motion.g>)}
    </svg>
    <figcaption className="diagram-caption"><span>{diagram.legend}</span><span>FIG. {type === "relayboard" ? "01" : type === "movenet" ? "02" : "03"}</span></figcaption>
  </figure>;
}
