import { ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";
import styles from "@/styles/project-specs.module.css";

interface ProjectSpecsPanelProps {
  project: Project;
}

export default function ProjectSpecsPanel({ project }: ProjectSpecsPanelProps) {
  const badgeList = project.tags.split(" · ");
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span>SELECTED CASE</span>
        <strong>
          {project.n} // {project.status}
        </strong>
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.metric}>{project.metric}</p>
      <p className={styles.long}>{project.long}</p>
      <div className={styles.badges}>
        {badgeList.map((b) => (
          <span key={b} className={styles.badge}>
            {b}
          </span>
        ))}
      </div>
      <a href={project.link} target="_blank" rel="noreferrer" className={styles.link}>
        Ver projeto completo
        <ExternalLink size={14} strokeWidth={1.8} />
      </a>
    </div>
  );
}
