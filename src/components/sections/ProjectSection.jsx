import { useEffect, useRef } from 'react'
import styles from './ProjectSection.module.css'

function ProjectSection({ projects = [] }) {
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card')
    if (!cards) return

    const handlers = []
    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }
      card.addEventListener('mousemove', handleMouseMove)
      handlers.push({ card, handleMouseMove })
    })

    return () => {
      handlers.forEach(({ card, handleMouseMove }) => {
        card.removeEventListener('mousemove', handleMouseMove)
      })
    }
  }, [projects])

  return (
    <section className={styles.section} id="works">
      <div className="ambient-glow" style={{ top: '50%', right: '-100px' }} />

      <h2 className={styles.sectionHeadline}>
        Selected Works
        <span className={styles.divider} />
      </h2>

      <div className={styles.grid} ref={gridRef}>
        {projects.map((project, index) => (
          <article
            key={project.id}
            className={`${styles.card} glass-panel project-card ${index === 2 ? styles.span2 : ''}`}
          >
            <div className={styles.cardGlow} />
            <div className={styles.cardBg}>
              <div className={styles.cardImage} />
              <div className={styles.cardOverlay} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={`${project.id}-${tag}`} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectSection
