"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LaptopScene = dynamic(() => import("@/components/three/LaptopScene"), { ssr: false });

function LaptopFallback() {
  return <div className="fallback-laptop" aria-hidden="true"><div className="fallback-screen"><div className="fallback-screen-header">● &nbsp; ● &nbsp; ● <span>MAHI / TERMINAL</span></div><pre>{`const developer = {\n  name: 'Mahi Siddhant Sharma',\n  focus: ['backend', 'full-stack'],\n  mindset: 'build with intention'\n};\n\n> awaiting input_`}</pre></div><div className="fallback-base"><div className="fallback-keys" /><div className="fallback-trackpad" /></div></div>;
}

export default function Hero() {
  const section = useRef(null), intro = useRef(null), ending = useRef(null), successPanel = useRef(null), heroBottom = useRef(null);
  const trigger = useRef(null), progressRef = useRef(0), invalidateRef = useRef(null);
  const [canRender3D, setCanRender3D] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const sync = () => { setReduced(motion.matches); setMobile(mobileQuery.matches); };
    motion.addEventListener("change", sync); mobileQuery.addEventListener("change", sync);
    const frame = requestAnimationFrame(() => {
      sync();
      try { const canvas = document.createElement("canvas"); const context = canvas.getContext("webgl2") || canvas.getContext("webgl"); setCanRender3D(Boolean(context)); context?.getExtension("WEBGL_lose_context")?.loseContext(); } catch { setCanRender3D(false); }
    });
    return () => { cancelAnimationFrame(frame); motion.removeEventListener("change", sync); mobileQuery.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    if (reduced || mobile || window.matchMedia("(max-width: 700px)").matches) { progressRef.current = 0; invalidateRef.current?.(); return; }
    gsap.registerPlugin(ScrollTrigger);
    const introNode = intro.current, endingNode = ending.current, panelNode = successPanel.current, bottomNode = heroBottom.current;
    const timeline = gsap.timeline({ scrollTrigger: {
      trigger: section.current, start: "top top", end: "+=300%", pin: true, scrub: .45, anticipatePin: 1,
      onUpdate: self => { progressRef.current = self.progress; introNode.inert = self.progress >= .4; endingNode.inert = self.progress < .88; bottomNode.inert = self.progress >= .9; invalidateRef.current?.(); },
      onRefresh: self => { trigger.current = self; progressRef.current = self.progress; introNode.inert = self.progress >= .4; endingNode.inert = self.progress < .88; bottomNode.inert = self.progress >= .9; invalidateRef.current?.(); },
    } });
    timeline.to(introNode, { opacity: 0, y: -30, pointerEvents: "none", duration: .2, ease: "none" }, .2)
      .to(bottomNode, { opacity: 0, duration: .1, ease: "none" }, .87)
      .to(endingNode, { opacity: 1, duration: .12, ease: "none" }, .88)
      .fromTo(panelNode, { opacity: 0, scale: .9, y: 28 }, { opacity: 1, scale: 1, y: 0, duration: .12, ease: "power2.out" }, .88);
    trigger.current = timeline.scrollTrigger;
    return () => { timeline.scrollTrigger?.kill(); timeline.kill(); gsap.set([introNode, endingNode, panelNode, bottomNode], { clearProps: "opacity,transform,pointerEvents" }); introNode.inert = false; endingNode.inert = true; bottomNode.inert = false; trigger.current = null; };
  }, [reduced, mobile]);

  function skip() { const about = document.getElementById("about"); if (!about) return; const top = about.getBoundingClientRect().top + window.scrollY - 76; window.scrollTo({ top, behavior: reduced ? "instant" : "smooth" }); }

  return <section className="hero" id="top" ref={section} aria-label="Introduction"><div className="hero-frame">
    <div className="hero-ambient" aria-hidden="true" />
    <div className="hero-inner"><div className="hero-content" ref={intro}><p className="hero-kicker"><span className="online-light" /> AVAILABLE FOR OPPORTUNITIES <span className="kicker-divider">/</span> PORTFOLIO 2026</p><h1>MAHI<br />SIDDHANT<br /><span>SHARMA</span><b>.</b></h1><div className="hero-rule" /><p className="hero-identity">Software Developer <span>/</span> Full-Stack &amp; Backend Engineering</p><p className="hero-description">Designing thoughtful digital experiences and building the systems that make them work.</p><div className="hero-actions"><a className="button button-primary" href="#projects">Explore projects <span aria-hidden="true">↗</span></a><a className="button button-outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">View resume <span aria-hidden="true">↗</span></a></div><div className="hero-social"><a href="https://github.com/mahisiddhant0-oss" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GITHUB ↗</a><a href="https://www.linkedin.com/in/mahikness/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">LINKEDIN ↗</a><a href="https://www.instagram.com/mahikness/" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)">INSTAGRAM ↗</a></div></div>
    <div className={`laptop-stage ${sceneReady && !reduced && !mobile ? "laptop-ready" : ""}`} aria-label="Illustration of a laptop showing green program code"><LaptopFallback />{canRender3D && !reduced && !mobile && <div className="laptop-canvas"><LaptopScene progressRef={progressRef} invalidateRef={invalidateRef} mobile={mobile} onReady={() => setSceneReady(true)} onLost={() => { setSceneReady(false); setCanRender3D(false); }} /></div>}</div></div>
    <div className="hero-ending" ref={ending} inert={true}>
      <div className="success-panel" ref={successPanel}>
        <span className="success-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg></span>
        <span className="ending-label">&gt; BOOT_SEQUENCE_COMPLETE</span>
        <h2>SYSTEM <span>ONLINE</span><span className="ending-cursor">_</span></h2>
        <p>Welcome to my portfolio.</p>
        <button type="button" onClick={skip}>Enter portfolio <span aria-hidden="true">↓</span></button>
        <span className="success-hint">OR SCROLL TO CONTINUE</span>
      </div>
    </div>
    <div className="hero-bottom" ref={heroBottom}><span>SCROLL TO INITIALIZE <span aria-hidden="true">↓</span></span><span>01 / 05</span><button type="button" onClick={skip}>SKIP INTRO <span aria-hidden="true">↗</span></button></div>
  </div></section>;
}
