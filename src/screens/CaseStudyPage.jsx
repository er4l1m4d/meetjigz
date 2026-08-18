import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePortfolioData } from '../hooks/usePortfolioData.js'
import { fadeIn, scaleIn } from '../components/animations/variants.js'
import CaseStudySection from '../components/casestudy/CaseStudySection.jsx'
import EvidenceGallery from '../components/casestudy/EvidenceGallery.jsx'
import ProjectLinks from '../components/casestudy/ProjectLinks.jsx'
import CaseStudyNav from '../components/casestudy/CaseStudyNav.jsx'
import ProgressBar from '../components/casestudy/ProgressBar.jsx'
import Footer from '../components/Footer.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './CaseStudyPage.module.css'

const SECTION_KEYS = ['context', 'problem', 'role', 'thinking', 'build', 'challenges', 'result']

function CaseStudyPage() {
  const { id } = useParams()
  const { featuredEntries, archiveEntries } = usePortfolioData()

  const allEntries = [...featuredEntries, ...archiveEntries]
  const entry = allEntries.find((e) => e.id === id)
  const caseStudyEntries = allEntries.filter((e) => e.caseStudy != null)
  const currentIndex = caseStudyEntries.findIndex((e) => e.id === id)
  const prev = currentIndex > 0 ? caseStudyEntries[currentIndex - 1] : null
  const next = currentIndex < caseStudyEntries.length - 1 ? caseStudyEntries[currentIndex + 1] : null

  if (!entry || !entry.caseStudy) {
    return (
      <>
        <TopBar />
        <main className={styles.page}>
          <div className={styles.notFound}>
            <h1>Case study not found</h1>
            <p>This project doesn&apos;t have a case study yet.</p>
            <Link to="/" className={styles.backLink}>← back home</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const { caseStudy } = entry
  const sections = SECTION_KEYS.filter((key) => caseStudy.sections?.[key])
  const sectionProgress = sections.length > 0 ? sections : []

  return (
    <>
      <TopBar />
      <ProgressBar sections={sectionProgress} />

      <main className={styles.page}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleIn}
          className={styles.heroImage}
        >
          <img src={caseStudy.heroImage.src} alt={caseStudy.heroImage.alt} />
        </motion.div>

        <motion.div
          className={styles.metaBar}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <h1 className={styles.title}>{entry.title}</h1>
          <div className={styles.meta}>
            {entry.year && <span className={styles.metaItem}>{entry.year}</span>}
            {entry.client && <span className={styles.metaItem}>{entry.client}</span>}
            {entry.duration && <span className={styles.metaItem}>{entry.duration}</span>}
          </div>
        </motion.div>

        <div className={styles.sections}>
          {sections.map((key) => (
            <div key={key} id={`cs-${key}`}>
              <CaseStudySection sectionKey={key} content={caseStudy.sections[key]} />
            </div>
          ))}
        </div>

        {caseStudy.evidence?.length > 0 && (
          <div id="cs-evidence">
            <span className={styles.sectionLabel}>evidence</span>
            <EvidenceGallery evidence={caseStudy.evidence} />
          </div>
        )}

        <ProjectLinks links={caseStudy.links} />

        <CaseStudyNav prev={prev} next={next} />

        <div className={styles.backFooter}>
          <Link to="/" className={styles.backLink}>← back to all work</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default CaseStudyPage
