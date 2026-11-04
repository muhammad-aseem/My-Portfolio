import { useEffect, useRef, useState } from "react";
import type { Project } from "../data";
import { Icon } from "./Icon";
import { ProjectArt } from "./ProjectArt";
export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const el = ref.current;
    el?.showModal();
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close();
      }}
    >
      <div className="dialog-body">
        <div className="dialog-top">
          <span className="eyebrow">SELECTED WORK / {project.number}</span>
          <button
            className="icon-button"
            aria-label="Close project details"
            autoFocus
            onClick={() => ref.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <p className="eyebrow">{project.label}</p>
        <h2 id="dialog-title">{project.name}</h2>
        <div className="dialog-visual">
          {project.live ? (
            <img
              src={
                slide === 0
                  ? "/click-catalyst.webp"
                  : "/click-catalyst-sections.webp"
              }
              alt={
                slide === 0
                  ? "Current live Click Catalyst homepage"
                  : "Current live Click Catalyst content sections"
              }
            />
          ) : (
            <ProjectArt kind={project.id} />
          )}
        </div>
        {project.live && (
          <div className="gallery-controls">
            <span aria-live="polite">
              {slide + 1} / 2 — Current live website
            </span>
            <div>
              <button
                className="icon-button"
                aria-label="Previous project image"
                onClick={() => setSlide((s) => (s + 1) % 2)}
              >
                <Icon name="left" />
              </button>
              <button
                className="icon-button"
                aria-label="Next project image"
                onClick={() => setSlide((s) => (s + 1) % 2)}
              >
                <Icon name="right" />
              </button>
            </div>
          </div>
        )}
        <p className="dialog-description">{project.detail}</p>
        <div className="dialog-columns">
          <div>
            <h3>What’s inside</h3>
            <ul>
              {project.outcomes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Technologies</h3>
            <div className="tags">
              {project.tech.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </div>
        {project.example && (
          <div className="terminal">
            <div className="terminal-top">
              <span>EXAMPLE TERMINAL SESSION</span>
              <span>Python</span>
            </div>
            <code>$ {project.example.command}</code>
            <pre>{project.example.lines.join("\n")}</pre>
          </div>
        )}
        <div className="dialog-links">
          {project.live && (
            <a
              className="button"
              href={project.live}
              target="_blank"
              rel="noreferrer"
            >
              Visit website <Icon />
            </a>
          )}
          <a
            className={project.live ? "text-link" : "button"}
            href={project.repo}
            target="_blank"
            rel="noreferrer"
          >
            {project.private ? "GitHub · Private repository" : "View on GitHub"}{" "}
            <Icon name="github" />
          </a>
        </div>
        {!project.live && (
          <p className="fine-print">
            A Python command-line project. Run locally using the source on
            GitHub.
          </p>
        )}
      </div>
    </dialog>
  );
}
