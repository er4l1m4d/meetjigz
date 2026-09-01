import { fadeUp } from '../animations/variants'
import Reveal from '../animations/Reveal'
import styles from './AboutSection.module.css'

function AboutSection({ about }) {
  if (!about) return null

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant={fadeUp}>
          <div className={styles.headingBlock}>
            <p>How I work</p>
            <h2>From Idea To Launch</h2>
          </div>
        </Reveal>
        <div className={styles.story}>
          <Reveal variant={fadeUp} transition={{ delay: 0.1 }}>
            <p className={styles.statement}>I move between product thinking, interface design and code without losing the thread.</p>
          </Reveal>
          <div className={styles.details}>
            <Reveal variant={fadeUp} transition={{ delay: 0.15 }}>
              <p className={styles.bio}>{about.bio}</p>
            </Reveal>
            {about.interests && (
              <Reveal variant={fadeUp} transition={{ delay: 0.18 }}>
                <p className={styles.interests}>{about.interests}</p>
              </Reveal>
            )}
          </div>
        </div>

        {about.availableFor?.length > 0 && (
        <Reveal variant={fadeUp} transition={{ delay: 0.2 }}>
          <div className={styles.availability}>
            <span className={styles.availLabel}>Open to</span>
            <div className={styles.availBadges}>
              {about.availableFor.map((item) => (
                <span key={item} className={styles.availBadge}>{item}</span>
              ))}
            </div>
          </div>
        </Reveal>
        )}
      </div>
    </section>
  )
}

export default AboutSection
