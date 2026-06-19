import styles from './HeroSection.module.css'

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.glow} ambient-glow`} />

      <h1 className={styles.headline}>jigz</h1>
      <p className={styles.subtitle}>designer • developer</p>
    </section>
  )
}

export default HeroSection
