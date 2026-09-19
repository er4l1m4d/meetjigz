import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import styles from './HeroSection.module.css'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 60
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function HeroSection({ hero }) {
  const [revealed, setRevealed] = useState(false)

  if (!hero) return null

  const contactCta = hero.ctas?.find((cta) => cta.id === 'contact') ?? hero.ctas?.[0]
  const firstName = hero.firstName || ''
  const lastName = hero.lastName || ''

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={`${styles.nameBlock} ${revealed ? styles.nameBlockRevealed : ''}`}>
          <h1 className={styles.headline}>
            <span className={styles.firstName}>{firstName || 'Oluwadamilare'}</span>
            <span className={styles.lastName}>{lastName || 'Ogo-Oluwade'}</span>
          </h1>
          <p className={styles.role}>{hero.role}</p>
        </div>

        {hero.portrait?.src && (
          <div className={`${styles.portrait} ${revealed ? styles.portraitRevealed : ''}`}>
            <img
              className={styles.portraitImg}
              src={hero.portrait.src}
              alt={hero.portrait.alt || `${firstName} ${lastName}`}
              width="520"
              height="520"
            />
          </div>
        )}

        <button
          type="button"
          className={`${styles.revealBtn} ${revealed ? styles.revealBtnHidden : ''}`}
          onClick={() => setRevealed(true)}
          aria-label="Reveal name"
          aria-hidden={revealed ? 'true' : undefined}
          tabIndex={revealed ? -1 : 0}
        >
          <span className={styles.revealLabel}>{hero.revealText || 'Who is he?'}</span>
          <CaretDown size={18} weight="bold" />
        </button>

        {contactCta && (
          <button
            type="button"
            className={`${styles.cta} ${revealed ? styles.ctaVisible : ''}`}
            onClick={() => scrollTo(contactCta.target)}
            aria-hidden={revealed ? undefined : 'true'}
            tabIndex={revealed ? 0 : -1}
          >
            {contactCta.label}
          </button>
        )}
      </div>
    </section>
  )
}

export default HeroSection
