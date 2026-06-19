import { EnvelopeSimple, ShareFat, DotsThree } from '@phosphor-icons/react'
import styles from './HeroSection.module.css'

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.glow} ambient-glow`} />

      <div className={`${styles.card} glass-panel`}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>JG</div>
          <div className={styles.avatarBorder} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>Jigz</h1>
          <p className={styles.handle}>@jigz.dev</p>

          <div className={styles.actions}>
            <button type="button" className={styles.actionBtn} aria-label="Email">
              <EnvelopeSimple size={18} weight="regular" />
            </button>
            <button type="button" className={styles.actionBtn} aria-label="Share">
              <ShareFat size={18} weight="regular" />
            </button>
            <button type="button" className={styles.actionBtn} aria-label="More">
              <DotsThree size={18} weight="regular" />
            </button>
          </div>
        </div>

        <div className={styles.badge}>
          <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          LVL 8
        </div>
      </div>
    </section>
  )
}

export default HeroSection
