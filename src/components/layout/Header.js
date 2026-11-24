"use client";

import { useState } from "react";

const links = [["About", "#about"], ["Expertise", "#skills"], ["Projects", "#projects"], ["Resume", "#resume"]];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Mahi Siddhant Sharma, back to top"><span className="brand-mark">M<span>.</span></span><span className="brand-name">MAHI SHARMA<span className="brand-caption">SOFTWARE DEVELOPER</span></span></a>
        <div className={`nav-links ${open ? "nav-open" : ""}`} id="primary-links">
          {links.map(([label, href]) => <a key={href} onClick={() => setOpen(false)} href={href}>{label}</a>)}
          <a className="nav-contact" onClick={() => setOpen(false)} href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
        </div>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-links" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true"> {open ? "×" : "+"}</span></button>
      </nav>
    </header>
  );
}
