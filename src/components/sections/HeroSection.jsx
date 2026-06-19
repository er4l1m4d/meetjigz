import styles from './HeroSection.module.css'

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.glow} ambient-glow`} />

      <h1 className={styles.headline}>Jigz</h1>
      <p className={styles.subtitle}>developer &bull; designer</p>
    </section>
  )
}

export default HeroSection
