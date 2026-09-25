import { createElement } from 'react'
import { motion } from 'framer-motion'
import { Cube } from '@phosphor-icons/react'
import Reveal from '../animations/Reveal'
import { fadeUp } from '../animations/variants'
import { useSkillIconCatalog } from '../../hooks/useSkillIconCatalog.js'
import styles from './SkillsSection.module.css'

function SkillTile({ skill, catalog }) {
  const Icon = catalog ? catalog.resolveSkillIcon(skill) : null

  return (
    <div className={styles.skillTile}>
      <div className={styles.tileTop}>
        <span className={styles.tileIcon}>
          {Icon ? createElement(Icon, { size: 17 }) : createElement(Cube, { size: 17, weight: 'duotone' })}
        </span>
        <span className={styles.tileName}>{skill.name}</span>
      </div>
    </div>
  )
}

function SkillsSection({ skills }) {
  const catalog = useSkillIconCatalog()
  if (!skills?.categories?.length) return null

  const eyebrow = skills.eyebrow || '// Stack'

  return (
    <section id="stack" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant={fadeUp}>
          <p className={styles.eyebrow}>{eyebrow}</p>
        </Reveal>

        <Reveal variant={fadeUp} transition={{ delay: 0.06 }}>
          <div className={styles.heading}>
            <h2>{skills.heading || 'Design meets development.'}</h2>
            <span>{skills.subtext || 'A focused toolkit for turning ambiguous product ideas into clear, usable experiences.'}</span>
          </div>
        </Reveal>

        <div className={styles.rows}>
          {skills.categories.map((cat, i) => (
            <Reveal key={cat.id} variant={fadeUp} transition={{ delay: 0.04 * i }}>
              <div className={styles.row}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.content}>
                  <div className={styles.rowHead}>
                    <h3 className={styles.cat}>{cat.label}</h3>
                    <span className={styles.count}>{cat.items.length} skills</span>
                  </div>
                  <motion.div
                    className={styles.skills}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                  >
                    {cat.items.map((skill) => (
                      <SkillTile key={skill.name} skill={skill} catalog={catalog} />
                    ))}
                  </motion.div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
