import { motion } from 'framer-motion'
import { fadeUp, fadeIn } from '../animations/variants'
import styles from './HeroSection.module.css'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'auto' })
  }
}

function HeroSection({ hero }) {
  if (!hero) return null

  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.name}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        {hero.name}
      </motion.h1>

      <motion.p
        className={styles.role}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        {hero.role}
      </motion.p>

      <motion.p
        className={styles.tagline}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        {hero.tagline}
      </motion.p>

      <motion.div
        className={styles.ctas}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        {hero.ctas?.map((cta) => (
          <button
            key={cta.id}
            className={cta.id === 'work' ? styles.ctaPrimary : styles.ctaSecondary}
            onClick={() => scrollTo(cta.target)}
          >
            {cta.label}
          </button>
        ))}
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
    </section>
  )
}

export default HeroSection
