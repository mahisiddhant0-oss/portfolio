"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { CanvasTexture, Color, SRGBColorSpace } from "three";
import { useEffect, useMemo, useRef } from "react";

const lines = [
  "$ initializing portfolio environment...",
  "> loading identity / mahi_siddhant_sharma",
  "> connecting projects [03] ................ done",
  "> mapping systems / api · cache · logistics",
  "> checking status ...................... online",
  "> opening interface .................... ready",
];

function drawScreen(canvas, progress, cursor) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width, h = canvas.height;
  ctx.fillStyle = "#07110b";
  ctx.fillRect(0, 0, w, h);
  const glow = ctx.createRadialGradient(w * .48, h * .44, 20, w * .48, h * .44, w * .65);
  glow.addColorStop(0, "rgba(21,85,47,.22)"); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(89,183,119,.2)"; ctx.lineWidth = 2;
  ctx.strokeRect(30, 25, w - 60, h - 50);
  ctx.fillStyle = "#72a985"; ctx.font = "25px monospace";
  ctx.fillText("●  ●  ●", 62, 78);
  ctx.fillStyle = "#43694f"; ctx.font = "21px monospace";
  ctx.fillText("MAHI / TERMINAL                                   v1.0", 64, 128);
  ctx.fillStyle = "#18502d"; ctx.fillRect(64, 155, w - 128, 1);
  if (progress < .65) {
    ctx.fillStyle = "#50b776"; ctx.font = "25px monospace";
    ["const developer = {", "  name: 'Mahi Siddhant Sharma',", "  focus: ['backend', 'full-stack'],", "  mindset: 'build with intention'", "};", "", "> awaiting input_"].forEach((line, i) => ctx.fillText(line, 64, 212 + i * 48));
    return;
  }
  const reveal = Math.min(1, Math.max(0, (progress - .65) / .25));
  const fullText = lines.join("\n");
  const visible = fullText.slice(0, Math.floor(fullText.length * reveal));
  ctx.font = "25px monospace"; ctx.fillStyle = "#7ae69a";
  visible.split("\n").forEach((line, i) => ctx.fillText(line, 64, 213 + i * 50));
  if (progress >= .9) {
    ctx.fillStyle = "#22c55e"; ctx.font = "bold 44px monospace";
    ctx.fillText("SYSTEM ONLINE", 64, 540);
  } else if (cursor) {
    const row = visible.split("\n");
    ctx.fillRect(64 + ctx.measureText(row.at(-1)).width + 5, 192 + (row.length - 1) * 50, 13, 27);
  }
  ctx.fillStyle = "rgba(19,34,24,.12)";
  for (let y = 0; y < h; y += 5) ctx.fillRect(0, y, w, 2);
}

function Laptop({ progressRef, invalidateRef, mobile }) {
  const group = useRef();
  const { camera, invalidate } = useThree();
  const cameraRef = useRef(camera);
  const canvas = useMemo(() => { const element = document.createElement("canvas"); element.width = 1024; element.height = 640; drawScreen(element, 0, true); return element; }, []);
  const texture = useMemo(() => { const t = new CanvasTexture(canvas); t.colorSpace = SRGBColorSpace; t.anisotropy = 4; return t; }, [canvas]);
  const textureRef = useRef(texture);
  const drawn = useRef(-1);
  const blink = useRef(true);
  useEffect(() => {
    invalidateRef.current = invalidate;
    const timer = window.setInterval(() => { if (progressRef.current >= .65 && progressRef.current < .9) { blink.current = !blink.current; invalidate(); } }, 550);
    return () => { window.clearInterval(timer); invalidateRef.current = null; texture.dispose(); };
  }, [invalidate, invalidateRef, progressRef, texture]);
  useFrame(() => {
    const p = progressRef.current;
    const move = Math.min(1, Math.max(0, (p - .2) / .2));
    const zoom = Math.min(1, Math.max(0, (p - .4) / .25));
    const smooth = v => v * v * (3 - 2 * v);
    group.current.position.set((mobile ? 0 : 1.55) * (1 - smooth(move)), (mobile ? -1.12 : -.15) + (mobile ? .8 : 0) * smooth(move), 0);
    group.current.rotation.set(.06 * (1 - smooth(move)), -.48 * (1 - smooth(move)) - .02, 0);
    group.current.scale.setScalar((mobile ? .6 : .88) + (mobile ? .12 : .48) * smooth(zoom));
    cameraRef.current.position.z = (mobile ? 8.7 : 8) - (mobile ? .8 : 2.3) * smooth(zoom);
    cameraRef.current.lookAt(0, mobile && p < .4 ? -.5 : -.1, 0);
    const key = Math.round(p * 400) + (blink.current ? 1000 : 0);
    if (key !== drawn.current) { drawScreen(canvas, p, blink.current); textureRef.current.needsUpdate = true; drawn.current = key; }
  });

  return <group ref={group}>
    {/* The screen, frame, hinge, deck, keys, and trackpad are all local geometry. */}
    <RoundedBox args={[4.06, 2.74, .14]} radius={.07} smoothness={4} position={[0, .18, -.98]}><meshStandardMaterial color="#252b29" metalness={.88} roughness={.28} /></RoundedBox>
    <mesh position={[0, .18, -.897]}><planeGeometry args={[3.78, 2.44]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
    <mesh position={[0, .18, -.886]}><planeGeometry args={[3.78, 2.44]} /><meshBasicMaterial color="#c8ffd6" transparent opacity={.035} /></mesh>
    <mesh position={[0, 1.485, -.893]}><circleGeometry args={[.018, 16]} /><meshStandardMaterial color="#0a0c0b" /></mesh>
    <RoundedBox args={[4.06, .13, 2.76]} radius={.055} smoothness={4} position={[0, -1.22, .25]}><meshStandardMaterial color="#343936" metalness={.85} roughness={.3} /></RoundedBox>
    <mesh position={[0, -1.145, -.93]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[3.84, .15]} /><meshStandardMaterial color="#101513" metalness={.7} /></mesh>
    {Array.from({ length: 5 }, (_, row) => Array.from({ length: 13 }, (_, col) => <mesh key={`${row}-${col}`} position={[-1.7 + col * .283, -1.145, -.6 + row * .27]}><boxGeometry args={[.23, .012, .19]} /><meshStandardMaterial color={row === 4 && col > 3 && col < 9 ? "#202824" : "#151b18"} roughness={.55} metalness={.25} /></mesh>))}
    <mesh position={[0, -1.138, 1.25]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.2, .52]} /><meshStandardMaterial color="#303632" metalness={.8} roughness={.38} /></mesh>
    <RoundedBox args={[4.15, .045, .25]} radius={.02} smoothness={3} position={[0, -1.28, 1.62]}><meshStandardMaterial color="#868f88" metalness={.9} roughness={.25} /></RoundedBox>
  </group>;
}

export default function LaptopScene({ progressRef, invalidateRef, mobile, onReady, onLost }) {
  return <Canvas frameloop="demand" dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} camera={{ position: [0, .4, 8], fov: 42 }} onCreated={({ gl }) => { gl.domElement.addEventListener("webglcontextlost", onLost, { once: true }); onReady(); }} aria-hidden="true">
    <color attach="background" args={[new Color("#090909")]} />
    <ambientLight intensity={1.8} />
    <directionalLight position={[3, 5, 7]} intensity={2.4} color="#e2fae8" />
    <pointLight position={[-3, 1, 4]} intensity={12} color="#0a652a" distance={9} />
    <Laptop progressRef={progressRef} invalidateRef={invalidateRef} mobile={mobile} />
  </Canvas>;
}
