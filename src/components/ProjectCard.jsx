import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerItem } from './animations/variants.js'
import { hasRealCaseStudy } from '../lib/caseStudy.js'
import Lightbox from './Lightbox.jsx'
import CiphraChip from './graphics/CiphraChip.jsx'
import VergeGate from './graphics/VergeGate.jsx'
import ProjectVisual from './ProjectVisual.jsx'
import styles from './ProjectCard.module.css'

const GRAPHICS = {
  'ciphra-chip': CiphraChip,
  'verge-gate': VergeGate,
}

function ProjectCard({ entry, index }) {
  const [lightbox, setLightbox] = useState(null)
  const Graphic = entry.graphic ? GRAPHICS[entry.graphic] : null
  const hasCaseStudy = hasRealCaseStudy(entry)

  return (
    <motion.article className={styles.card} variants={staggerItem}>
      <div className={styles.header}>
        <span className={styles.numeral}>
          {String(index).padStart(2, '0')}
        </span>
        <h3 className={styles.title}>{entry.title}</h3>
        {entry.status && (
          <span className={`${styles.badge} ${styles[entry.status]}`}>
            <span className={styles.dot} />
            {entry.status.replace('-', ' ')}
          </span>
        )}
        {entry.kind === 'design' && (
          <span className={`${styles.badge} ${styles.design}`}>design</span>
        )}
      </div>

      <div className={styles.thumbnail}>
        {entry.thumbnail?.src && !entry.thumbnail.src.includes('placeholder') ? (
          <img src={entry.thumbnail.src} alt={entry.thumbnail.alt} loading="lazy" />
        ) : (
          <ProjectVisual entry={entry} />
        )}
      </div>

      <div className={styles.body}>
        {entry.kind === 'build' && (
          <>
            <p className={styles.description}>{entry.description}</p>
            {Graphic && <Graphic />}
            {entry.tags?.length > 0 && (
              <div className={styles.tags}>
                {entry.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </>
        )}

        {entry.kind === 'design' && (
          <>
            <p className={styles.description}>{entry.brief}</p>
            {entry.images?.length > 0 && (
              <div className={styles.imageGrid}>
                {entry.images.map((img, i) => (
                  <button
                    key={i}
                    className={styles.imageButton}
                    onClick={() => setLightbox(img)}
                    aria-label={`View: ${img.alt}`}
                  >
                    <img src={img.src} alt={img.alt} className={styles.image} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            {entry.tools?.length > 0 && (
              <div className={styles.tags}>
                {entry.tools.map((tool) => (
                  <span key={tool} className={styles.tag}>{tool}</span>
                ))}
              </div>
            )}
          </>
        )}

        <div className={styles.ctas}>
          {hasCaseStudy ? (
            <Link to={`/project/${entry.id}`} className={styles.caseStudyLink}>
              read case study →
            </Link>
          ) : (
            entry.href && entry.href !== '#' && (
              <a href={entry.href} className={styles.projectLink} target="_blank" rel="noreferrer noopener">
                view project →
              </a>
            )
          )}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </motion.article>
  )
}

export default ProjectCard
