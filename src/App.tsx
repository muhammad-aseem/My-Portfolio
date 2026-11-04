import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { ErrorInfo, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  assetUrl,
  profile,
  projects,
  skills,
  learning,
  certification,
} from "./data";
import type { Project } from "./data";
import { Icon } from "./components/Icon";
import { Spotlight } from "./components/Spotlight";
import { ProjectArt } from "./components/ProjectArt";
import { ProjectDialog } from "./components/ProjectDialog";
import { RobotFallback } from "./components/RobotFallback";
import { useReducedMotion } from "./hooks";
gsap.registerPlugin(ScrollTrigger);
const Robot = lazy(() => import("./components/Robot"));
class RobotBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(_e: Error, _info: ErrorInfo) {}
  render() {
    return this.state.failed ? <RobotFallback /> : this.props.children;
  }
}
function Socials({ labels = false }: { labels?: boolean }) {
  return (
    <div className={"socials " + (labels ? "socials-labeled" : "")}>
      {[
        ["github", "GitHub", profile.github],
        ["linkedin", "LinkedIn", profile.linkedin],
        ["x", "X / Twitter", profile.x],
      ].map(([icon, name, url]) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label={name}
        >
          <Icon name={icon} size={18} />
          {labels && <span>{name}</span>}
          {labels && <Icon size={15} />}
        </a>
      ))}
    </div>
  );
}
function SectionTitle({
  number,
  title,
  aside,
}: {
  number: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="section-title reveal">
      <span className="section-index">/{number}</span>
      <h2>{title}</h2>
      {aside && <span className="section-aside">{aside}</span>}
    </div>
  );
}
function AnimatedDisclosure({
  className = "",
  triggerClassName,
  panelClassName = "",
  label,
  children,
}: {
  className?: string;
  triggerClassName: string;
  panelClassName?: string;
  label: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div
      className={
        "animated-disclosure " + className + (open ? " is-open" : "")
      }
    >
      <button
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      <div
        className="disclosure-panel"
        id={id}
        aria-hidden={!open}
        inert={!open}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget) ScrollTrigger.refresh();
        }}
      >
        <div className={"disclosure-panel-inner " + panelClassName}>
          {children}
        </div>
      </div>
    </div>
  );
}
function App() {
  const root = useRef<HTMLDivElement>(null),
    hero = useRef<HTMLElement>(null),
    menu = useRef<HTMLDialogElement>(null),
    menuButton = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<Project | null>(null),
    [filter, setFilter] = useState("All work"),
    [menuOpen, setMenuOpen] = useState(false),
    [robotActive, setRobotActive] = useState(true),
    [robotLoaded, setRobotLoaded] = useState(false),
    [motionPaused, setMotionPaused] = useState(false),
    [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pendingNavigation = useRef<string | null>(null);
  const reduced = useReducedMotion();
  const finishMenu = () => {
    setMenuOpen(false);
    const id = pendingNavigation.current;
    pendingNavigation.current = null;
    if (id) {
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        target?.setAttribute("tabindex", "-1");
        target?.focus({ preventScroll: true });
        history.pushState(null, "", "#" + id);
        target?.scrollIntoView({
          behavior: reduced ? "instant" : "smooth",
          block: "start",
        });
      });
    } else {
      menuButton.current?.focus({ preventScroll: true });
    }
  };
  useEffect(() => {
    if (reduced) {
      setRobotLoaded(false);
      return;
    }
    const idle = window.setTimeout(() => {
      try {
        const probe = document.createElement("canvas");
        const gl = probe.getContext("webgl2", {
          failIfMajorPerformanceCaveat: true,
        });
        if (gl) {
          gl.getExtension("WEBGL_lose_context")?.loseContext();
          setRobotLoaded(true);
        }
      } catch {
        setRobotLoaded(false);
      }
    }, 750);
    return () => clearTimeout(idle);
  }, [reduced]);
  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRobotActive(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-title .name-line", {
        yPercent: 110,
        rotation: 2,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        clearProps: "all",
      });
      gsap.from(".hero-bottom, .hero-kicker", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        delay: 0.4,
        clearProps: "all",
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
          clearProps: "all",
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  useEffect(() => {
    if (menuOpen) {
      menu.current?.showModal();
      document.body.classList.add("modal-open");
    } else {
      menu.current?.close();
      if (!selected) document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [menuOpen, selected]);
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);
  useEffect(() => {
    let contactVisible = false;
    const updateVisibility = () =>
      setShowBackToTop(window.scrollY > 560 && !contactVisible);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    const contact = document.getElementById("contact");
    const observer = new IntersectionObserver(([entry]) => {
      contactVisible = entry.isIntersecting;
      updateVisibility();
    });
    if (contact) observer.observe(contact);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      observer.disconnect();
    };
  }, []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = "mailto:" + profile.email;
    }
  };
  return (
    <div ref={root}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a className="wordmark" href="#top" aria-label="Muhammad Aseem home">
          ma<span>•</span>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          <a href="#work">
            Work <sup>04</sup>
          </a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <a href={profile.cv.view} target="_blank" rel="noreferrer">
            View CV <Icon size={12} />
          </a>
        </nav>
        <a href="#contact" className="button header-cta">
          Let’s talk <Icon size={15} />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        ref={menu}
        id="mobile-navigation"
        className="mobile-navigation"
        onClose={finishMenu}
        aria-label="Navigation menu"
      >
        <div className="mobile-menu-top">
          <span className="wordmark">ma•</span>
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {[
            ["Work", "work"],
            ["About", "about"],
            ["Experience", "experience"],
            ["Contact", "contact"],
          ].map(([text, id], i) => (
            <a
              key={id}
              href={"#" + id}
              onClick={(e) => {
                e.preventDefault();
                pendingNavigation.current = id;
                setMenuOpen(false);
              }}
            >
              <span>0{i + 1}</span>
              {text}
              <Icon size={30} />
            </a>
          ))}
        </nav>
        <div className="mobile-cv-actions">
          <a
            href={profile.cv.view}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            View CV <Icon size={16} />
          </a>
          <a
            href={profile.cv.download}
            download={profile.cv.filename}
            className="text-link"
          >
            Download CV <Icon name="download" size={16} />
          </a>
        </div>
        <a className="mobile-email" href={"mailto:" + profile.email}>
          {profile.email}
        </a>
      </dialog>
      <main id="main">
        <section
          ref={hero}
          className="hero shell"
          id="top"
          aria-labelledby="hero-heading"
        >
          <div className="hero-kicker">
            <span>COMPUTING STUDENT & CURIOUS BUILDER</span>
            <span>PYTHON / BACKEND / AI</span>
          </div>
          <h1
            id="hero-heading"
            className="hero-title"
            aria-label="Muhammad Aseem"
          >
            <span className="name-mask">
              <span className="name-line outline">MUHAMMAD</span>
            </span>
            <span className="name-mask">
              <span className="name-line solid">
                ASEEM<span className="name-period">.</span>
              </span>
            </span>
          </h1>
          <div
            className="robot-stage"
            role="img"
            aria-label="Minimalist monochrome developer robot"
          >
            <RobotBoundary>
              {robotLoaded ? (
                <Suspense fallback={<RobotFallback />}>
                  <Robot
                    active={robotActive}
                    paused={reduced || motionPaused}
                  />
                </Suspense>
              ) : (
                <RobotFallback />
              )}
            </RobotBoundary>
          </div>
          <div className="robot-caption">
            <span className="tiny-dot" /> A LITTLE CURIOUS. JUST LIKE ME.
          </div>
          <div className="hero-bottom">
            <div className="hero-intro">
              <span className="eyebrow">HELLO, I’M ASEEM.</span>
              <h2>
                Aspiring Python Backend
                <br />& AI Developer
              </h2>
              <p>
                Learning the systems behind the screen.
                <br />
                Building my foundations, one project at a time.
              </p>
              <div className="hero-actions">
                <a href="#work" className="button">
                  View my work <Icon />
                </a>
                <a href="#contact" className="text-link">
                  Contact me <Icon size={17} />
                </a>
              </div>
              <div className="cv-actions" aria-label="Curriculum vitae">
                <a
                  href={profile.cv.view}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  View CV <Icon size={16} />
                </a>
                <span aria-hidden="true" />
                <a
                  href={profile.cv.download}
                  download={profile.cv.filename}
                  className="text-link"
                >
                  Download CV <Icon name="download" size={16} />
                </a>
              </div>
            </div>
            <div className="hero-side">
              <Socials />
              {robotLoaded && (
                <button
                  className="motion-toggle"
                  onClick={() => setMotionPaused((p) => !p)}
                  aria-pressed={motionPaused}
                >
                  {motionPaused ? "Resume robot" : "Pause robot"}{" "}
                  <span aria-hidden="true">{motionPaused ? "▷" : "Ⅱ"}</span>
                </button>
              )}
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <Icon name="down" size={17} />
          </a>
        </section>
        <section className="about section shell" id="about">
          <SectionTitle number="01" title="A bit about me" />
          <div className="about-grid">
            <p className="about-statement reveal">
              Drawn to the logic.
              <br />
              Curious about <span>what’s next.</span>
            </p>
            <div className="about-copy reveal">
              <p>
                I’m Muhammad Aseem, a Computing student at Arden University,
                studying through its Roots IVY International College teaching
                centre in Lahore while working toward a career in Python
                backend development and artificial intelligence.
              </p>
              <p>
                My frontend background taught me to turn ideas into interfaces.
                Now, I’m exploring what happens behind them: the code, data and
                decisions that make things work.
              </p>
              <a
                className="text-link"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                Follow my progress <Icon />
              </a>
            </div>
          </div>
          <div className="about-facts reveal">
            <span>
              <small>MY FOCUS</small>Python backend & AI
            </span>
            <span>
              <small>MY APPROACH</small>Learn. Build. Improve.
            </span>
            <span>
              <small>MY FOUNDATION</small>BSc (Computing)
            </span>
          </div>
        </section>
        <section className="work section shell" id="work">
          <SectionTitle
            number="02"
            title="Selected work"
            aside="SMALL BEGINNINGS. REAL PROGRESS."
          />
          <div className="work-toolbar">
            <div className="filters" aria-label="Filter projects">
              {["All work", "Commercial", "Python"].map((x) => (
                <button
                  key={x}
                  className={filter === x ? "active" : ""}
                  aria-pressed={filter === x}
                  onClick={() => setFilter(x)}
                >
                  {x}
                  {x === "All work" && <sup>04</sup>}
                </button>
              ))}
            </div>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Icon size={16} />
            </a>
          </div>
          <div className="project-grid" aria-live="polite">
            {projects
              .filter((p) => filter === "All work" || filter === p.category)
              .map((p) => (
                <article className={"project-card project-" + p.id} key={p.id}>
                  <Spotlight className="project-surface">
                    <button
                      className="project-open"
                      aria-label={"View " + p.name + " project details"}
                      onClick={() => setSelected(p)}
                    >
                      <div className="project-chips">
                        <span>
                          {p.category === "Commercial"
                            ? "COMMERCIAL WEBSITE"
                            : "PYTHON PROGRAM"}
                        </span>
                        <span>{p.number} / 04</span>
                      </div>
                      <ProjectArt kind={p.id} />
                      <span className="project-hover">
                        <span>Explore project</span>
                        <Icon />
                      </span>
                    </button>
                  </Spotlight>
                  <div className="project-info">
                    <div>
                      <h3>{p.name}</h3>
                      <p>{p.description}</p>
                    </div>
                  </div>
                  <div className="project-meta">
                    <span>{p.label}</span>
                    <span>
                      {p.tech[0]}
                      {p.id === "catalyst" ? " / SCSS / JavaScript" : ""}
                    </span>
                  </div>
                </article>
              ))}
          </div>
        </section>
        <section className="experience section dark" id="experience">
          <div className="shell">
            <SectionTitle
              number="03"
              title="Experience"
              aside="WHERE I STARTED"
            />
            <div className="experience-row reveal">
              <div className="experience-date">JAN 2023 — JAN 2024</div>
              <div className="experience-main">
                <h3>
                  <a
                    href="https://waantech.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Waan Tech <span>(Pvt) Ltd</span> <Icon size={16} />
                  </a>
                </h3>
                <p>Web Development Intern</p>
                <AnimatedDisclosure
                  className="experience-disclosure"
                  triggerClassName="experience-trigger"
                  panelClassName="experience-details"
                  label={
                    <>
                      My contribution <Icon name="plus" size={18} />
                    </>
                  }
                >
                  <p>
                    Worked on frontend pages, layouts, sliders and bug fixes,
                    including work on the company’s main website.
                  </p>
                  <div className="tags">
                    {[
                      "HTML",
                      "CSS / SCSS",
                      "JavaScript",
                      "Bootstrap",
                      "Tailwind CSS",
                    ].map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                </AnimatedDisclosure>
              </div>
              <span className="experience-symbol" aria-hidden="true">
                ↗
              </span>
            </div>
            <p className="experience-note reveal">
              A foundation in interfaces.
              <br />
              <span>A growing interest in what powers them.</span>
            </p>
          </div>
        </section>
        <section className="skills section shell" id="skills">
          <SectionTitle
            number="04"
            title="My toolkit"
            aside="EXPERIENCE, WITHOUT THE PERCENTAGES"
          />
          {skills.map((s) => (
            <Spotlight key={s.number} className="skill-row">
              <div className="skill-heading">
                <span className="section-index">{s.number}</span>
                <h3>{s.title}</h3>
                <small>{s.note}</small>
              </div>
              <div className="skill-body">
                <div className="skill-chips">
                  {s.items.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
                <p>{s.description}</p>
              </div>
            </Spotlight>
          ))}
        </section>
        <section className="learning section" id="learning">
          <div className="shell">
            <SectionTitle number="05" title="Always a work in progress" />
            <div className="learning-intro reveal">
              <p>
                The next chapter is
                <br />
                <span>taking shape.</span>
              </p>
              <small>
                CURRENTLY LEARNING
                <br />
                NOT YET MASTERED
              </small>
            </div>
            <div className="learning-rows">
              {learning.map((x) => (
                <AnimatedDisclosure
                  key={x.number}
                  className="learning-row"
                  triggerClassName="learning-trigger"
                  panelClassName="learning-answer"
                  label={
                    <>
                      <span className="section-index">{x.number}</span>
                      <span className="learning-title">{x.title}</span>
                      <span className="learning-status">IN PROGRESS</span>
                      <span className="expand-icon">
                        <Icon name="plus" size={22} />
                      </span>
                    </>
                  }
                >
                  <p>{x.text}</p>
                  <div className="tags">
                    {x.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </AnimatedDisclosure>
              ))}
            </div>
          </div>
        </section>
        <section className="education section shell" id="education">
          <SectionTitle number="06" title="Education" />
          <div className="education-row reveal">
            <div className="education-emblem" aria-hidden="true">
              A<span>↗</span>
            </div>
            <div>
              <span className="eyebrow">2023 — 2027 (EXPECTED)</span>
              <h3>Arden University</h3>
              <p>BSc (Computing)</p>
              <address className="education-centre">
                Studying at{" "}
                <a
                  href="https://www.london.ac.uk/study/where-study/teaching-centre/pakistan/roots-ivy-international-college-riic-lahore"
                  target="_blank"
                  rel="noreferrer"
                >
                  Roots IVY International College (RIIC) — Lahore, Pakistan
                </a>
                , an Arden University teaching centre.
              </address>
            </div>
            <span className="status-tag">CURRENTLY STUDYING</span>
          </div>
        </section>
        <section className="certifications section shell" id="certifications">
          <SectionTitle number="07" title="Learning, documented" />
          <Spotlight className="certificate">
            <a
              href={certification.file}
              target="_blank"
              rel="noreferrer"
              className="certificate-image"
              aria-label="View Prompt Engineering certificate PDF"
            >
              <img
                src={assetUrl("certificate.webp")}
                alt="Udemy certificate of completion awarded to Muhammad Aseem, August 28, 2026"
                width="800"
                height="600"
                loading="lazy"
              />
              <span className="certificate-view">
                View certificate <Icon />
              </span>
            </a>
            <div className="certificate-copy">
              <span className="eyebrow">CERTIFICATE OF COMPLETION / UDEMY</span>
              <h3>{certification.title}</h3>
              <p>Completed {certification.date}</p>
              <div className="certificate-links">
                <a
                  className="text-link"
                  href={certification.credential}
                  target="_blank"
                  rel="noreferrer"
                >
                  View credential <Icon size={18} />
                </a>
                <a
                  className="text-link"
                  href={certification.file}
                  target="_blank"
                  rel="noreferrer"
                >
                  View PDF <Icon size={18} />
                </a>
              </div>
            </div>
          </Spotlight>
        </section>
        <section className="contact section" id="contact">
          <div className="shell">
            <div className="contact-top">
              <span className="eyebrow">HAVE AN OPPORTUNITY OR AN IDEA?</span>
              <span className="eyebrow">LET’S START A CONVERSATION</span>
            </div>
            <a className="contact-headline" href={"mailto:" + profile.email}>
              <span>
                Let’s talk<span className="contact-period">.</span>
              </span>
              <span className="contact-arrow">
                <Icon size={86} />
              </span>
            </a>
            <div className="contact-bottom">
              <div>
                <a className="contact-email" href={"mailto:" + profile.email}>
                  {profile.email}
                </a>
                <button
                  className="copy-button icon-button"
                  aria-label="Copy email address"
                  onClick={copyEmail}
                >
                  <Icon name={copied ? "check" : "copy"} size={18} />
                </button>
                <span className="copy-status" role="status">
                  {copied ? "Copied" : ""}
                </span>
                <a className="phone" href={"tel:" + profile.phone}>
                  <span aria-hidden="true">🇵🇰</span> +92 328 496 4700
                </a>
              </div>
              <Socials labels />
            </div>
          </div>
        </section>
      </main>
      <footer className="footer shell">
        <span>© {new Date().getFullYear()} Muhammad Aseem</span>
        <span>BUILT WITH CURIOSITY.</span>
        <a href="#top">
          Back to top <Icon name="arrow" size={16} />
        </a>
      </footer>
      <button
        className="back-to-top"
        type="button"
        aria-label="Back to top"
        title="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
        }
      >
        <Icon name="up" size={20} />
      </button>
      {selected && (
        <ProjectDialog
          key={selected.id}
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
export default App;
