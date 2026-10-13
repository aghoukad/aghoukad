import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { projects } from "@/data/projects"

const sections = ["work", "about", "contact"] as const
type Section = (typeof sections)[number]
const projectCount = String(projects.length).padStart(2, "0")

function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark")
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#0b0b0d" : "#f7f7f9")
  try {
    localStorage.setItem("aghoukad-theme", dark ? "dark" : "light")
  } catch {
    // Theme switching remains available when browser storage is restricted.
  }
}

function SectionHeading({
  number,
  title,
  mobileTitle,
  note,
  mobileNote,
}: {
  number: string
  title: string
  mobileTitle?: string
  note?: string
  mobileNote?: string
}) {
  return (
    <div className="section-heading">
      <h2>
        {number} /{" "}
        {mobileTitle ? (
          <>
            <span className="desktop-only">{title}</span>
            <span className="mobile-only">{mobileTitle}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {note && <span className="desktop-only section-note">{note}</span>}
      {mobileNote && (
        <span className="mobile-only section-note">{mobileNote}</span>
      )}
    </div>
  )
}

export function Portfolio() {
  const [activeSection, setActiveSection] = useState<Section>("work")

  useEffect(() => {
    let frame = 0
    const updateSection = () => {
      frame = 0
      let current: Section = "work"
      for (const section of sections) {
        if (
          (document.getElementById(section)?.getBoundingClientRect().top ??
            Infinity) <= 160
        ) {
          current = section
        }
      }
      if (
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 8
      ) {
        current = "contact"
      }
      setActiveSection(current)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateSection)
    }
    updateSection()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08 }
    )
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((section) => {
        if (section.getBoundingClientRect().top >= window.innerHeight) {
          section.classList.add("will-reveal")
          observer.observe(section)
        }
      })
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      observer.disconnect()
    }
  }, [])

  function navigationLinks() {
    return sections.map((section) => (
      <a
        key={section}
        href={`#${section}`}
        aria-current={activeSection === section ? "location" : undefined}
        onClick={() => setActiveSection(section)}
      >
        {section[0].toUpperCase() + section.slice(1)}
      </a>
    ))
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="page-container header-content">
          <div className="brand-group">
            <a
              href="#top"
              className="brand-logo"
              aria-label="aghoukad — back to top"
            >
              <img src="/favicon.svg" width={32} height={32} alt="" />
            </a>
            <div className="mobile-only mobile-identity">
              <span>SAIF-EDDINE AGHOUKAD</span>
              <span className="current-section">{activeSection}</span>
            </div>
          </div>
          <div className="header-controls">
            <nav className="desktop-navigation" aria-label="Main navigation">
              {navigationLinks()}
            </nav>
            <div className="theme-control">
              <Button
                variant="ghost"
                size="icon"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                title="Toggle color theme"
              >
                <HugeiconsIcon
                  icon={Moon02Icon}
                  className="moon-icon"
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <HugeiconsIcon
                  icon={Sun03Icon}
                  className="sun-icon"
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="page-container main-content"
        tabIndex={-1}
      >
        <div id="top" className="top-anchor" />
        <section className="hero" aria-labelledby="intro-title">
          <p className="eyebrow hero-enter" style={{ animationDelay: "50ms" }}>
            <span className="status-dot" />
            SAIF-EDDINE AGHOUKAD
          </p>
          <h1
            id="intro-title"
            className="hero-enter"
            style={{ animationDelay: "100ms" }}
          >
            aghoukad<span>.</span>
          </h1>
          <p
            className="hero-tagline hero-enter"
            style={{ animationDelay: "150ms" }}
          >
            Full-stack developer building web and mobile products.
          </p>
          <p
            className="hero-description hero-enter"
            style={{ animationDelay: "200ms" }}
          >
            Commerce and shipping platforms, from storefronts and mobile apps to
            APIs and databases.
          </p>
        </section>

        <section
          id="work"
          className="portfolio-section reveal"
          aria-label="Selected work"
        >
          <SectionHeading
            number="01"
            title="Selected Work"
            note={`Index · ${projectCount} Entries`}
            mobileNote={`Index [${projectCount}]`}
          />
          <Accordion multiple className="project-list">
            {projects.map((project) => (
              <AccordionItem
                key={project.id}
                value={project.id}
                className="project-item"
              >
                <AccordionTrigger className="project-trigger">
                  <span className="project-heading">
                    <span className="project-number">{project.number}</span>
                    <span className="project-labels">
                      <span className="project-title">{project.title}</span>
                      <span className="project-category">
                        {project.category}
                      </span>
                    </span>
                  </span>
                  <span className="project-meta">
                    <Badge variant="secondary" className="project-badge">
                      Product
                    </Badge>
                    <HugeiconsIcon
                      icon={Add01Icon}
                      className="project-plus"
                      size={14}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="project-content">
                  <p>
                    <span className="desktop-only">{project.description}</span>
                    <span className="mobile-only">
                      {project.mobileDescription}
                    </span>
                  </p>
                  <dl className="project-facts">
                    <div className="project-scope">
                      <dt>Scope</dt>
                      <dd>{project.scope}</dd>
                    </div>
                    <div className="project-stack">
                      <dt>
                        Stack<span className="mobile-only">:</span>
                      </dt>
                      <dd>
                        {project.stack.map((technology, index) => (
                          <span key={technology} className="technology">
                            {technology}
                            {index < project.stack.length - 1 && (
                              <span className="desktop-only">, </span>
                            )}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`Visit ${project.title} (opens in a new tab)`}
                  >
                    Visit {project.title} <span aria-hidden="true">↗</span>
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section
          id="about"
          className="portfolio-section reveal"
          aria-label="About"
        >
          <SectionHeading number="02" title="About" mobileNote="Profile" />
          <div className="about-grid">
            <Card className="about-copy">
              <p className="about-intro">
                I&apos;m Saif-Eddine, a full-stack developer. I build commerce
                and shipping tools for Moroccan merchants, including ecart.ma
                and eship.ma.
              </p>
              <p>
                I work across the whole product, from storefronts and dashboards
                to APIs, databases, and carrier integrations. I use TypeScript
                and React for the web, and React Native with Expo for mobile.
              </p>
            </Card>
            <aside className="desk-section" aria-labelledby="desk-title">
              <h3 id="desk-title">What I build</h3>
              <Card className="desk-card">
                <ul>
                  <li>Commerce &amp; order tools</li>
                  <li>Shipping integrations</li>
                  <li>Web &amp; mobile apps</li>
                </ul>
              </Card>
            </aside>
          </div>
        </section>

        <section
          id="contact"
          className="portfolio-section reveal"
          aria-label="Contact"
        >
          <SectionHeading
            number="03"
            title="Reach Out"
            mobileTitle="Contact"
            mobileNote="Say hello"
          />
          <Card className="contact-card">
            <div className="contact-copy">
              <h3>Have a project in mind?</h3>
              <p>Get in touch about a web app, mobile app, or integration.</p>
            </div>
            <a href="mailto:contact@aghoukad.com" className="contact-status">
              contact@aghoukad.com
            </a>
            <div className="mobile-only contact-signoff">
              <span>aghoukad.com</span>
              <span>
                <span className="status-dot" />
                2026
              </span>
            </div>
          </Card>
          <div className="section-signoff desktop-only">
            <span>aghoukad.com — 2026</span>
            <a href="#top">
              Top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer desktop-only">
        <div className="page-container footer-content">
          <div className="footer-identity">
            <span>aghoukad.com</span>
            <span aria-hidden="true">/</span>
            <span>SAIF-EDDINE AGHOUKAD</span>
            <span aria-hidden="true">/</span>
            <span>2026</span>
          </div>
          <div className="footer-links">
            <span>UTC+01:00</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://github.com/aghoukad/aghoukad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub (opens in a new tab)"
            >
              source
            </a>
          </div>
        </div>
      </footer>
      <nav
        className="mobile-navigation mobile-only"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-content">
          <div className="mobile-nav-links">{navigationLinks()}</div>
          <div className="mobile-nav-footer">
            <span>aghoukad.com</span>
            <span>2026</span>
          </div>
        </div>
      </nav>
    </>
  )
}
