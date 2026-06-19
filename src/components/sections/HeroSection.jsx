import Reveal from '../animations/Reveal.jsx'
import { fadeUp, slideFromLeft } from '../animations/variants.js'
import TextDecode from '../animations/TextDecode.jsx'
import styles from './HeroSection.module.css'

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.glow} ambient-glow`} />

      <Reveal variants={fadeUp}>
        <TextDecode
          text="Jigz"
          duration={800}
          delay={200}
          className={styles.headline}
        />
      </Reveal>

      <Reveal variants={slideFromLeft}>
        <p className={styles.subtitle}>designer &bull; developer</p>
      </Reveal>
    </section>
  )
}

export default HeroSection
