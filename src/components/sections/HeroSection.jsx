import { motion } from 'framer-motion'
import { fadeUp, fadeIn } from '../animations/variants'
import ProjectVisual from '../ProjectVisual.jsx'
import styles from './HeroSection.module.css'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'auto' })
  }
}

function HeroSection({ hero, projects = [] }) {
  if (!hero) return null

  return (
    <section className={styles.hero}>
      <div className={styles.ghostWord} aria-hidden="true">JIGZ</div>
      <div className={styles.heroInner}>
      <motion.div
        className={styles.copy}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <p className={styles.role}>{hero.role}</p>
        <h1 className={styles.headline}>I design &amp;<br />build digital<br />products.</h1>
        <p className={styles.tagline}>{hero.tagline}</p>

        <div className={styles.ctas}>
        {hero.ctas?.map((cta) => (
          <button
            key={cta.id}
            className={cta.id === 'work' ? styles.ctaPrimary : styles.ctaSecondary}
            onClick={() => scrollTo(cta.target)}
          >
            {cta.label}
          </button>
        ))}
        </div>
      </motion.div>

      <motion.div className={styles.montage} variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
        <div className={styles.visualMain}>{projects[0] && <ProjectVisual entry={projects[0]} compact />}</div>
        <div className={styles.visualSide}>{projects[2] && <ProjectVisual entry={projects[2]} compact />}</div>
        <div className={styles.identityBadge}><span>JIGZ</span><small>design + code</small></div>
      </motion.div>

      {hero.currentBuild && (
        <motion.div
          className={styles.currentBuild}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <span className={styles.buildLabel}>{hero.currentBuild.text}</span>
          <span className={styles.buildProject}>{hero.currentBuild.project}</span>
          <span className={styles.buildDesc}> — {hero.currentBuild.description}</span>
        </motion.div>
      )}
      </div>
      <p className={styles.signature}>{hero.name}</p>
    </section>
  )
}

export default HeroSection
