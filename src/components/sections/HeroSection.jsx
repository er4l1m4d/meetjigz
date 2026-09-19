import styles from './HeroSection.module.css'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 60
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function HeroSection({ hero }) {
  if (!hero) return null

  const contactCta = hero.ctas?.find((cta) => cta.id === 'contact') ?? hero.ctas?.[0]
  const firstName = hero.firstName || ''
  const lastName = hero.lastName || ''

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={`${styles.nameBlock} ${styles.nameBlockRevealed}`}>
          <h1 className={styles.headline}>
            <span className={styles.firstName}>{firstName || 'Oluwadamilare'}</span>
            <span className={styles.lastName}>{lastName || 'Ogo-Oluwade'}</span>
          </h1>
          <p className={styles.role}>{hero.role}</p>
        </div>

        {hero.portrait?.src && (
          <div className={`${styles.portrait} ${styles.portraitRevealed}`}>
            <img
              className={styles.portraitImg}
              src={hero.portrait.src}
              alt={hero.portrait.alt || `${firstName} ${lastName}`}
              width="520"
              height="520"
            />
          </div>
        )}

        {contactCta && (
          <button
            type="button"
            className={`${styles.cta} ${styles.ctaVisible}`}
            onClick={() => scrollTo(contactCta.target)}
          >
            {contactCta.label}
          </button>
        )}
      </div>
    </section>
  )
}

export default HeroSection