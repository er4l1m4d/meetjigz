import { fadeUp } from '../animations/variants'
import Reveal from '../animations/Reveal'
import styles from './AboutSection.module.css'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 60
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function AboutSection({ about }) {
  if (!about) return null

  const eyebrow = about.eyebrow || '// Intro'
  const statement = about.statement || "I'm a versatile designer who partners with founders to turn ideas into real products. I focus on clear interfaces, sharp decisions, and fast execution."
  const ctaText = about.ctaText || 'See my Work'

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant={fadeUp}>
          <p className={styles.eyebrow}>{eyebrow}</p>
        </Reveal>

        <Reveal variant={fadeUp} transition={{ delay: 0.06 }}>
          <h2 className={styles.statement}>
            {statement}
          </h2>
        </Reveal>

        {about.bio && (
          <Reveal variant={fadeUp} transition={{ delay: 0.12 }}>
            <p className={styles.body}>{about.bio}</p>
          </Reveal>
        )}

        <Reveal variant={fadeUp} transition={{ delay: 0.18 }}>
          <button
            type="button"
            className={styles.cta}
            onClick={() => scrollTo('works')}
          >
            {ctaText}
          </button>
        </Reveal>
      </div>
    </section>
  )
}

export default AboutSection
