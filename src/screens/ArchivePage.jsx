import { usePortfolioData } from '../hooks/usePortfolioData.js'
import Entry from '../components/Entry.jsx'
import Footer from '../components/Footer.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './DesktopScreen.module.css'

function ArchiveEntryContent({ entry }) {
  if (entry.kind === 'build') {
    return (
      <>
        <p className={styles.description}>{entry.description}</p>
        <div className={styles.tagGroup}>
          <div className={styles.tags}>
            {entry.tags?.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </>
    )
  }

  if (entry.kind === 'design') {
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
            {entry.tools?.map((tool) => (
              <span key={tool} className={styles.tag}>{tool}</span>
            ))}
          </div>
        </div>
      </>
    )
  }

  return null
}

function ArchivePage() {
  const { archiveEntries } = usePortfolioData()

  return (
    <>
      <TopBar />
      <main className={styles.page}>
        <header className={styles.archiveHeader}>
          <h1 className={styles.archiveTitle}>archive</h1>
          <p className={styles.archiveSubtitle}>older and side projects — still here, still working.</p>
        </header>

        {archiveEntries.map((entry, index) => (
          <Entry
            key={entry.id}
            index={index + 1}
            title={entry.title}
            status={entry.status}
            kind={entry.kind}
            caseStudyLink={entry.caseStudy ? entry.id : null}
          >
            <ArchiveEntryContent entry={entry} />
          </Entry>
        ))}

        <div className={styles.archiveFooter}>
          <a href="/" className={styles.backLink}>← back to main</a>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ArchivePage
