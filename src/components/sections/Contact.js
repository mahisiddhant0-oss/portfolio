"use client";

import { useState } from "react";
import Reveal from "@/components/animations/Reveal";

const email = "mahsiddhant0@gmail.com";
const profiles = [
  { name: "GitHub", handle: "@mahisiddhant0-oss", href: "https://github.com/mahisiddhant0-oss", icon: "github" },
  { name: "LinkedIn", handle: "/in/mahikness", href: "https://www.linkedin.com/in/mahikness/", icon: "linkedin" },
  { name: "Instagram", handle: "@mahikness", href: "https://www.instagram.com/mahikness/", icon: "instagram" },
];

function SocialIcon({ name }) {
  if (name === "github") return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.53v-2.12c-3.1.67-3.75-1.31-3.75-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.97 2.3 3.22 1.64.1-.73.4-1.23.72-1.51-2.47-.28-5.07-1.24-5.07-5.49 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14A10.6 10.6 0 0 1 12 6.2c.94 0 1.88.13 2.76.37 2.11-1.43 3.04-1.14 3.04-1.14.61 1.53.23 2.66.12 2.94.72.78 1.14 1.77 1.14 2.98 0 4.26-2.6 5.2-5.08 5.48.41.35.77 1.03.77 2.08V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
  if (name === "linkedin") return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.46 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.79-1.53 2.98 0 3.58 1.96 3.58 4.5v5.28Z" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.7" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <footer id="contact" className="section contact-section">
      <div className="section-wrap">
        <Reveal>
          <div className="eyebrow"><span className="eyebrow-line" /> 05 / CONTACT</div>
          <h2 className="contact-heading">Let’s build something <em>meaningful.</em></h2>
          <p className="contact-sub">Have a project, an idea, or a conversation in mind? I’d like to hear about it.</p>
          <div className="email-row">
            <a href={`mailto:${email}`}>{email} <span aria-hidden="true">↗</span></a>
            <button type="button" onClick={copyEmail} aria-label={copied ? "Email address copied" : "Copy email address"}>{copied ? "Copied ✓" : "Copy email"}</button>
            <span className="sr-only" role="status" aria-live="polite">{copied ? "Email address copied to clipboard" : ""}</span>
          </div>
        </Reveal>

        <Reveal className="contact-socials" delay={0.1}>
          <p className="contact-social-label">FIND ME ONLINE <span aria-hidden="true">/ 03</span></p>
          <div className="social-link-grid">
            {profiles.map((profile) => (
              <a key={profile.name} className="social-link" href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name}: ${profile.handle} (opens in a new tab)`}>
                <span className="social-icon"><SocialIcon name={profile.icon} /></span>
                <span className="social-link-copy"><strong>{profile.name}</strong><small>{profile.handle}</small></span>
                <span className="social-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </Reveal>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MAHI SIDDHANT SHARMA</span>
          <a href="#top" className="back-to-top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}
