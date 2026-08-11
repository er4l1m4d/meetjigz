import styles from './HeroSection.module.css'

function HeroSection({ eyebrow, headline, highlight, support }) {
  return (
    <section className={styles.hero}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

      <h1 className={styles.headline}>
        {highlight ? (
          <>
            {headline.split(highlight)[0]}
            <span className={styles.pop}>{highlight}</span>
            {headline.split(highlight).slice(1).join(highlight)}
          </>
        ) : (
          headline
        )}
      </h1>

      {support && (
        <p className={styles.support}>{support}</p>
      )}
    </section>
  )
}

export default HeroSection
