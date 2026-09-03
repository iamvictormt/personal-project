import { CSSProperties, useState } from "react";
import ProjectTabs from "@/components/project-tabs";
import ProjectCarousel from "@/components/project-carousel";
import ProjectSpecsPanel from "@/components/project-specs-panel";
import styles from "@/styles/project-showcase.module.css";
import { Project } from "@/data/projects";

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 72, y: 28 });
  const activeProject = projects[activeProjectIndex];
  const activeSlug = activeProject.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const spotlightStyle = {
    "--spotlight-x": `${spotlight.x}%`,
    "--spotlight-y": `${spotlight.y}%`,
  } as CSSProperties;

  return (
    <div
      className={styles.showcaseContainer}
      style={spotlightStyle}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSpotlight({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }}
    >
      <div className={styles.systemHeader}>
        <div>
          <span className={styles.eyebrow}>CASE FILES // INTERACTIVE</span>
          <p className={styles.systemTitle}>
            Selecione um projeto para inspecionar telas, stack e decisão técnica.
          </p>
        </div>
        <div className={styles.statusCluster}>
          <span className={styles.statusDot} />
          <span>{String(activeProjectIndex + 1).padStart(2, "0")} ONLINE</span>
        </div>
      </div>

      <div className={styles.workspace}>
        <ProjectTabs
          projects={projects}
          activeIndex={activeProjectIndex}
          onSelect={setActiveProjectIndex}
        />
        <div className={styles.browserFrame}>
          <div className={styles.browserBar}>
            <div className={styles.windowControls} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span>LIVE PREVIEW</span>
            <strong>
              case/{activeProject.n}-{activeSlug}
            </strong>
          </div>
          <ProjectCarousel images={activeProject.images} projectTitle={activeProject.title} />
        </div>
        <ProjectSpecsPanel project={activeProject} />
      </div>
    </div>
  );
}
