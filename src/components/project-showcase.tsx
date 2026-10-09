import { useMemo, useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import styles from "@/styles/project-showcase.module.css";
import { Project } from "@/data/projects";

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const categories = useMemo(
    () => ["Todos", ...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const visibleProjects = projects.filter(
    (project) => activeCategory === "Todos" || project.category === activeCategory,
  );

  return (
    <>
      <div className={styles.filters} aria-label="Filtrar projetos por categoria">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`${styles.filter} ${activeCategory === category ? styles.filterActive : ""}`}
            aria-pressed={activeCategory === category}
            onClick={() => {
              setActiveCategory(category);
              setOpenProjectId(null);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.showcaseContainer}>
        {visibleProjects.map((project) => {
          const isOpen = project.n === openProjectId;
          const panelId = `project-${project.n}`;

          return (
            <article
              key={project.n}
              className={`${styles.projectRow} ${isOpen ? styles.open : ""}`}
            >
              <button
                type="button"
                className={styles.projectTrigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenProjectId(isOpen ? null : project.n)}
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
                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>Atuação</span>
                    <span>{project.role}</span>
                  </div>
                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>Entrega</span>
                    <span>{project.deliverable}</span>
                  </div>
                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>Tecnologias</span>
                    <span>{project.tags}</span>
                  </div>
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
    </>
  );
}
