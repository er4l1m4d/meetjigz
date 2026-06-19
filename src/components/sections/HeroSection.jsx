import styles from './HeroSection.module.css'

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.glow} ambient-glow`} />

      <h1 className={styles.headline}>Jigz</h1>
      <p className={styles.subtitle}>Creative Developer &amp; Designer</p>

      <div className={`${styles.glassBio} glass-panel`}>
        <p className={styles.bioText}>
          Creative spirit based in the digital realm, crafting experiences that blend aesthetics
          with functionality. Specializing in dark-mode interfaces, interactive web experiences,
          and premium digital identities.
        </p>
      </div>
    </section>
  )
}

export default HeroSection
