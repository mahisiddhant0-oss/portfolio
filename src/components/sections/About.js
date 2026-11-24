import Reveal from "@/components/animations/Reveal";

export default function About() {
  return <section id="about" className="section about-section">
    <div className="section-wrap about-grid">
      <Reveal><div className="eyebrow"><span className="eyebrow-line" /> 01 / ABOUT ME</div><p className="side-note">A little context behind the code.</p></Reveal>
      <Reveal className="about-copy"><h2 className="display-heading">Building for the <em>real world.</em></h2><p>I’m Mahi Siddhant Sharma, a Computer Science and Engineering student at Graphic Era Hill University (2023–2027). I work across full-stack development with a particular interest in the backend: how APIs are shaped, how data moves, and how systems stay understandable as they grow.</p><p>My projects explore authentication, database design, caching, and practical product workflows. I’m also interested in where AI can help people make better decisions, especially when it is grounded in reliable application data.</p><p>I enjoy taking a real problem, mapping its constraints, and building a clear path from an idea to a working system.</p><div className="education-line"><span>EDUCATION</span><strong>B.Tech · Computer Science & Engineering</strong><span>Graphic Era Hill University · 2023–2027</span></div></Reveal>
    </div>
  </section>;
}
