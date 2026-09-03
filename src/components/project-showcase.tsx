import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import styles from "@/styles/project-showcase.module.css";
import { Project } from "@/data/projects";

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);

  return (
    <div className={styles.showcaseContainer}>
      {projects.map((project, index) => {
        const isOpen = index === openProjectIndex;
        const panelId = `project-${project.n}`;

        return (
          <article key={project.n} className={`${styles.projectRow} ${isOpen ? styles.open : ""}`}>
            <button
              type="button"
              className={styles.projectTrigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenProjectIndex(isOpen ? null : index)}
            >
              <span className={styles.number}>{project.n}</span>
              <span className={styles.titleGroup}>
                <strong>{project.title}</strong>
                <span>{project.metric}</span>
              </span>
              <span className={styles.toggle} aria-hidden="true">
                {isOpen ? (
                  <Minus size={17} strokeWidth={1.8} />
                ) : (
                  <Plus size={17} strokeWidth={1.8} />
                )}
              </span>
            </button>

            <div id={panelId} className={styles.projectDetails} hidden={!isOpen}>
              <p>{project.long}</p>
              <div className={styles.meta}>
                <span>{project.tags}</span>
              </div>
              <a href={project.link} target="_blank" rel="noreferrer" className={styles.link}>
                Abrir projeto
                <ArrowUpRight size={17} strokeWidth={1.7} />
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
