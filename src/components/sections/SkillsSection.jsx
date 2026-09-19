import { createElement } from 'react'
import { motion } from 'framer-motion'
import { Cube } from '@phosphor-icons/react'
import Reveal from '../animations/Reveal'
import { fadeUp } from '../animations/variants'
import { resolveLevel } from '../../lib/skillIcons.js'
import { useSkillIconCatalog } from '../../hooks/useSkillIconCatalog.js'
import styles from './SkillsSection.module.css'

const prefersReduced =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SEGMENTS = Array.from({ length: 10 }, (_, i) => i)

const barContainer = (delay) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
})

const segmentVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

function ProficiencyBar({ level }) {
  const filled = level == null ? 0 : level

  if (prefersReduced) {
    return (
      <span className={styles.bar} aria-hidden="true">
        {SEGMENTS.map((i) => (
          <span key={i} className={i < filled ? styles.segOn : styles.seg} />
        ))}
      </span>
    )
  }

  return (
    <motion.span
      className={styles.bar}
      aria-hidden="true"
      variants={barContainer(0.15)}
    >
      {SEGMENTS.map((i) =>
        i < filled ? (
          <motion.span key={i} className={styles.segOn} variants={segmentVariant} />
        ) : (
          <span key={i} className={styles.seg} />
        ),
      )}
    </motion.span>
  )
}

function SkillTile({ skill, catalog }) {
  const Icon = catalog ? catalog.resolveSkillIcon(skill) : null
  const level = resolveLevel(skill)

  return (
    <div className={styles.skillTile}>
      <div className={styles.tileTop}>
        <span className={styles.tileIcon}>
          {Icon ? createElement(Icon, { size: 17 }) : createElement(Cube, { size: 17, weight: 'duotone' })}
        </span>
        <span className={styles.tileName}>{skill.name}</span>
        <span className={styles.tileLevel}>{level == null ? '—' : `${level}/10`}</span>
      </div>
      <ProficiencyBar level={level} />
    </div>
  )
}

function SkillsSection({ skills }) {
  const catalog = useSkillIconCatalog()
  if (!skills?.categories?.length) return null

  return (
    <section id="stack" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant={fadeUp}>
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
