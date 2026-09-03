import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "@/styles/project-carousel.module.css";

interface ProjectCarouselProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectCarousel({ images, projectTitle }: ProjectCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [images]);

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.mainImage}>
        <Image
          src={images[active]}
          alt={`${projectTitle} - tela ${active + 1}`}
          width={1024}
          height={640}
          className={styles.image}
          priority={active === 0}
        />
        <div className={styles.scanline} aria-hidden="true" />
        <div className={styles.counter}>
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={prev}
            aria-label="Imagem anterior"
            className={styles.navButton}
          >
            <ChevronLeft size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próxima imagem"
            className={styles.navButton}
          >
            <ChevronRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
      <div className={styles.thumbnails}>
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`${styles.thumbButton} ${i === active ? styles.active : ""}`}
            aria-label={`Ver imagem ${i + 1} de ${projectTitle}`}
          >
            <Image src={src} alt="" width={200} height={125} className={styles.thumbImage} />
            <span>{String(i + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
