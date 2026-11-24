import Reveal from "@/components/animations/Reveal";
import ArchitectureDiagram from "@/components/diagrams/ArchitectureDiagram";
import { projects } from "@/data/projects";

function ProjectCaseStudy({ project }) {
  return <article id={project.slug} className="case-study">
    <Reveal className="project-head"><div><span className="project-number">PROJECT / {project.number}</span><div className="project-title-line"><h3>{project.name}</h3><span className="project-type">{project.kind}</span></div></div><span className="status"><span className="status-indicator" /> {project.status}</span></Reveal>
    <div className="project-content"><Reveal className="project-story"><p className="project-lead">{project.lead}</p><div className="story-block"><span>THE PROBLEM</span><p>{project.problem}</p></div><div className="story-block"><span>THE APPROACH</span><p>{project.solution}</p></div><div className="story-block"><span>THE VALUE</span><p>{project.value}</p></div><div className="story-block muted-story"><span>{project.status === "Completed" ? "DELIVERED SCOPE" : "CURRENT STATE"}</span><p>{project.detail}</p></div></Reveal><Reveal className="project-technical"><ArchitectureDiagram type={project.diagram} /><div className="flow-panel"><div className="micro-label">INFORMATION FLOW</div><ol>{project.flow.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}</li>)}</ol></div><div className="stack-panel"><div className="micro-label">TECHNICAL STACK</div><div className="stack-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div></div><div className="project-foot"><p>{project.statusDetail}</p>{project.repository ? <a href={project.repository} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} repository on GitHub (opens in a new tab)`}>Explore repository <span aria-hidden="true">↗</span></a> : <span className="repo-pending" title="Repository URL can be configured in src/data/projects.js">Repository link pending ↗</span>}</div></Reveal></div>
  </article>;
}

export default function Projects() {
  return <section id="projects" className="section projects-section"><div className="section-wrap"><Reveal className="section-heading-row projects-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> 03 / SELECTED WORK</div><h2 className="display-heading">Systems in <em>practice.</em></h2></div><p>A closer look at the problem, the system, and the decisions shaping each project.</p></Reveal>{projects.map(project => <ProjectCaseStudy key={project.slug} project={project} />)}</div></section>;
}
