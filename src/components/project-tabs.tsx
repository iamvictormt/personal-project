import { Project } from "@/data/projects";

interface ProjectTabsProps {
  projects: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ProjectTabs({ projects, activeIndex, onSelect }: ProjectTabsProps) {
  return (
    <div className="grid max-h-[650px] gap-2 self-start overflow-y-auto border-border/60 border-b pb-4 pr-1 lg:border-r lg:border-b-0 lg:pb-0 lg:pr-4">
      {projects.map((proj, idx) => (
        <button
          key={proj.n}
          type="button"
          onClick={() => onSelect(idx)}
          className={`group grid min-w-[220px] grid-cols-[auto_1fr] gap-3 border p-3 text-left transition-all duration-300 ${
            idx === activeIndex
              ? "border-foreground bg-foreground text-background shadow-[8px_8px_0_var(--color-secondary)]"
              : "border-border/70 bg-card/50 text-foreground hover:border-foreground hover:bg-card"
          }`}
        >
          <span
            className={`font-mono text-xs ${
              idx === activeIndex ? "text-background/60" : "text-muted-foreground"
            }`}
          >
            {proj.n}
          </span>
          <span className="space-y-2">
            <span className="block font-display text-base font-black leading-none">
              {proj.title}
            </span>
            <span
              className={`line-clamp-2 block text-xs leading-relaxed ${
                idx === activeIndex ? "text-background/70" : "text-muted-foreground"
              }`}
            >
              {proj.desc}
            </span>
            <span
              className={`block font-mono text-[9px] tracking-[0.18em] uppercase ${
                idx === activeIndex ? "text-background/50" : "text-muted-foreground/70"
              }`}
            >
              {proj.status} // {proj.metric}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
