import Reveal from "@/components/animations/Reveal";
import { skillGroups } from "@/data/projects";

export default function Skills() {
  return <section id="skills" className="section skills-section"><div className="section-wrap">
    <Reveal className="section-heading-row"><div><div className="eyebrow"><span className="eyebrow-line" /> 02 / EXPERTISE</div><h2 className="display-heading">The tools behind <em>the work.</em></h2></div><p>Technologies and fundamentals I use to turn ideas into dependable software.</p></Reveal>
    <div className="skills-list">{skillGroups.map((group, i) => <Reveal className="skill-row" key={group.name} delay={i * 0.035}><span className="skill-index">0{i + 1}</span><h3>{group.name}</h3><div className="skill-tags relative">{group.items.map(item => <span key={item}>{item}</span>)}</div></Reveal>)}</div>
  </div></section>;
}
