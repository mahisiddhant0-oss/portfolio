import { compile } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const scanner = new Scanner({ sources: [{ base: resolve(root, "src"), pattern: "**/*.{js,jsx}", negated: false }] });
const result = await compile('@import "tailwindcss";', { base: root, onDependency: () => {} });
const css = result.build(scanner.scan());
await writeFile(resolve(root, "src/app/tailwind.generated.css"), css);
console.log("Generated Tailwind utilities from src/.");
