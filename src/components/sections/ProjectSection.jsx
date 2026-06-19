import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../animations/Reveal.jsx'
import { staggerContainer, scaleIn } from '../animations/variants.js'
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

      <Reveal>
        <h2 className={styles.sectionHeadline}>
          selected works
          <span className={styles.divider} />
        </h2>
      </Reveal>

      <motion.div
        className={styles.grid}
        ref={gridRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className={`${styles.card} glass-panel project-card ${index === 2 ? styles.span2 : ''}`}
            variants={scaleIn}
            whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default ProjectSection
