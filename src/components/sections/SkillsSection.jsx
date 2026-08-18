import Reveal from '../animations/Reveal'
import { fadeUp } from '../animations/variants'
import styles from './SkillsSection.module.css'

const PROFICIENCY_LABEL = {
  'daily-driver': 'daily',
  comfortable: 'comfortable',
  familiar: 'familiar',
}

function SkillsSection({ skills }) {
  if (!skills?.categories?.length) return null

  return (
    <section id="stack" className={styles.section}>
      <Reveal variant={fadeUp}>
        <span className={styles.heading}>stack</span>
      </Reveal>

      <div className={styles.categories}>
        {skills.categories.map((cat, i) => (
          <Reveal key={cat.id} variant={fadeUp} transition={{ delay: 0.05 * i }}>
            <div className={styles.category}>
              <span className={styles.categoryLabel}>{cat.label}</span>
              <div className={styles.grid}>
                {cat.items.map((skill) => (
                  <div key={skill.name} className={styles.skillTag}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={`${styles.proficiency} ${styles[skill.proficiency]}`}>
                      {PROFICIENCY_LABEL[skill.proficiency] || skill.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
