import Reveal from '../animations/Reveal'
import { fadeUp } from '../animations/variants'
import styles from './CaseStudySection.module.css'

const ORDER = ['context', 'problem', 'role', 'thinking', 'build', 'challenges', 'result']

function CaseStudySection({ sectionKey, content, index }) {
  if (!content) return null

  const label = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)
  const num = String((index ?? ORDER.indexOf(sectionKey)) + 1).padStart(2, '0')

  return (
    <Reveal variant={fadeUp}>
      <div className={styles.section}>
        <div className={styles.labelCol}>
          <span className={styles.num}>{num}</span>
          <span className={styles.label}>{label}</span>
        </div>
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
