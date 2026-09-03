import { CSSProperties, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import styles from "@/styles/project-showcase.module.css";
import { Project } from "@/data/projects";

interface ProjectShowcaseProps {
  projects: Project[];
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 62, y: 34 });
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
      <div className={styles.stage}>
        <div className={styles.projectList}>
          {projects.map((project, index) => {
            const isOpen = index === openProjectIndex;
            const panelId = `project-gallery-${project.n}`;

            return (
              <article
                key={project.n}
                className={`${styles.projectRow} ${isOpen ? styles.projectRowOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.rowTrigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenProjectIndex(isOpen ? null : index)}
                >
                  <span className={styles.rowLine} />
                  <span className={styles.rowNumber}>{project.n}</span>
                  <span className={styles.rowBody}>
                    <strong>{project.title}</strong>
                    <span>{project.metric}</span>
                  </span>
                  <span className={styles.rowToggle} aria-hidden="true">
                    {isOpen ? (
                      <Minus size={18} strokeWidth={1.8} />
                    ) : (
                      <Plus size={18} strokeWidth={1.8} />
                    )}
                  </span>
                </button>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.projectLink}
                  aria-label={`Abrir projeto ${project.title}`}
                >
                  <span>Ver projeto</span>
                  <ArrowUpRight size={20} strokeWidth={1.7} />
                </a>

                <div className={styles.mobileDetails}>
                  <p>{project.desc}</p>
                  <span>{project.tags}</span>
                </div>

                <span className={styles.rowSlug}>{slugify(project.title)}</span>

                {isOpen ? (
                  <div id={panelId} className={styles.galleryPanel}>
                    <div className={styles.deviceFrame}>
                      <div className={styles.deviceBar}>
                        <span>VT</span>
                        <span>case/{project.n}</span>
                        <span>{project.status}</span>
                      </div>
                      <div className={styles.deviceScreen}>
                        <Image
                          src={project.images[0]}
                          alt={`${project.title} - tela principal`}
                          width={980}
                          height={620}
                          className={styles.previewImage}
                          priority={index < 2}
                        />
                        <div className={styles.deviceOverlay}>
                          <span>{project.n}</span>
                          <strong>{project.title}</strong>
                        </div>
                      </div>
                    </div>

                    <div className={styles.galleryAside}>
                      <p>{project.desc}</p>
                      <span>{project.tags}</span>
                      <div className={styles.miniShots}>
                        {project.images.slice(1).map((src, imageIndex) => (
                          <Image
                            key={src}
                            src={src}
                            alt={`${project.title} - tela ${imageIndex + 2}`}
                            width={320}
                            height={210}
                            className={styles.miniShot}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
