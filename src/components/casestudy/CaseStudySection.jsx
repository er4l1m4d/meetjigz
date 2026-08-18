import Reveal from '../animations/Reveal'
import { fadeUp } from '../animations/variants'
import styles from './CaseStudySection.module.css'

const SECTION_LABELS = {
  context: '01 — context',
  problem: '02 — problem',
  role: '03 — role',
  thinking: '04 — thinking',
  build: '05 — build',
  challenges: '06 — challenges',
  result: '07 — result',
}

function CaseStudySection({ sectionKey, content }) {
  if (!content) return null

  return (
    <Reveal variant={fadeUp}>
      <div className={styles.section}>
        <span className={styles.label}>{SECTION_LABELS[sectionKey] || sectionKey}</span>
        <div className={styles.content}>
          {content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export default CaseStudySection
