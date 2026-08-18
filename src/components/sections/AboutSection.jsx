import { fadeUp } from '../animations/variants'
import Reveal from '../animations/Reveal'
import styles from './AboutSection.module.css'

function AboutSection({ about }) {
  if (!about) return null

  return (
    <section id="about" className={styles.section}>
      <Reveal variant={fadeUp}>
        <span className={styles.heading}>about</span>
      </Reveal>

      <Reveal variant={fadeUp} transition={{ delay: 0.1 }}>
        <p className={styles.bio}>{about.bio}</p>
      </Reveal>

      {about.interests && (
        <Reveal variant={fadeUp} transition={{ delay: 0.15 }}>
          <p className={styles.interests}>{about.interests}</p>
        </Reveal>
      )}

      {about.availableFor?.length > 0 && (
        <Reveal variant={fadeUp} transition={{ delay: 0.2 }}>
          <div className={styles.availability}>
            <span className={styles.availLabel}>available for</span>
            <div className={styles.availBadges}>
              {about.availableFor.map((item) => (
                <span key={item} className={styles.availBadge}>{item}</span>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </section>
  )
}

export default AboutSection
