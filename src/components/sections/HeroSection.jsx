import styles from './HeroSection.module.css'

function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero} id="hero">
      <p className={styles.label}>Full-Stack Developer</p>
      <h1 className={styles.headline}>I build experiences that feel effortless.</h1>
      <p className={styles.tagline}>
        Clean interfaces, thoughtful interactions, and products that people actually enjoy using.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.btnPrimary} onClick={() => scrollTo('works')}>
          View Projects
        </button>
        <button type="button" className={styles.btnSecondary} onClick={() => scrollTo('contact')}>
          Get in Touch
        </button>
      </div>
    </section>
  )
}

export default HeroSection
