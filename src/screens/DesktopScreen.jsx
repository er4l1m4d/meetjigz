import { usePortfolioData } from '../hooks/usePortfolioData.js'
import { DEFAULT_HERO } from '../data/defaults.js'
import Entry from '../components/Entry.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import Footer from '../components/Footer.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './DesktopScreen.module.css'

function AboutContent({ entry }) {
  return (
    <>
      <p className={styles.bio}>{entry.bio}</p>

      <div className={styles.tagGroup}>
        <span className={styles.tagLabel}>Skills</span>
        <div className={styles.tags}>
          {entry.skills.map((skill) => (
            <span key={skill} className={styles.tag}>{skill}</span>
          ))}
        </div>
      </div>

      <div className={styles.tagGroup}>
        <span className={styles.tagLabel}>Tools</span>
        <div className={styles.tags}>
          {entry.tools.map((tool) => (
            <span key={tool} className={styles.tag}>{tool}</span>
          ))}
        </div>
      </div>

      {entry.hobbies && (
        <p className={styles.hobbies}>{entry.hobbies}</p>
      )}
    </>
  )
}

function BuildContent({ entry }) {
  return (
    <>
      <p className={styles.description}>{entry.description}</p>

      <div className={styles.tagGroup}>
        <div className={styles.tags}>
          {entry.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      {entry.href && entry.href !== '#' && (
        <a href={entry.href} className={styles.projectLink} target="_blank" rel="noreferrer noopener">
          View project →
        </a>
      )}
    </>
  )
}

function DesignContent({ entry }) {
  return (
    <>
      <p className={styles.description}>{entry.brief}</p>

      {entry.images && entry.images.length > 0 && (
        <div className={styles.imageGrid}>
          {entry.images.map((img, i) => (
            <div key={i} className={styles.imageWrapper}>
              <img src={img.src} alt={img.alt} className={styles.image} loading="lazy" />
            </div>
          ))}
        </div>
      )}

      <div className={styles.tagGroup}>
        <div className={styles.tags}>
          {entry.tools.map((tool) => (
            <span key={tool} className={styles.tag}>{tool}</span>
          ))}
        </div>
      </div>
    </>
  )
}

function DesktopScreen() {
  const { featuredEntries, contact } = usePortfolioData()

  return (
    <>
      <TopBar />
      <main className={styles.page}>
        <HeroSection
          eyebrow={DEFAULT_HERO.eyebrow}
          headline={DEFAULT_HERO.headline}
          highlight={DEFAULT_HERO.highlight}
          support={DEFAULT_HERO.support}
        />

        {featuredEntries.map((entry, index) => {
          if (entry.kind === 'about') {
            return (
              <Entry key={entry.id} index={index} title={entry.title} kind="about">
                <AboutContent entry={entry} />
              </Entry>
            )
          }

          if (entry.kind === 'build') {
            return (
              <Entry key={entry.id} index={index} title={entry.title} status={entry.status} kind="build">
                <BuildContent entry={entry} />
              </Entry>
            )
          }

          if (entry.kind === 'design') {
            return (
              <Entry key={entry.id} index={index} title={entry.title} kind="design">
                <DesignContent entry={entry} />
              </Entry>
            )
          }

          return null
        })}

        <ContactSection contact={contact} />
      </main>
      <Footer contact={contact} />
    </>
  )
}

export default DesktopScreen
