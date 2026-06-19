import { motion } from 'framer-motion'
import {
  Code,
  FileTs,
  Database,
  FigmaLogo,
  CirclesThree,
  Layout,
  Monitor,
  GitBranch,
  Triangle,
  ArrowsOutSimple,
  Notepad,
} from '@phosphor-icons/react'
import Reveal from '../animations/Reveal.jsx'
import { staggerContainer, staggerItem, slideFromLeft, slideFromRight } from '../animations/variants.js'
import styles from './AboutSection.module.css'

const SKILL_ICONS = {
  'React': Code,
  'TypeScript': FileTs,
  'Node.js': Database,
  'Figma': FigmaLogo,
  'Motion Design': CirclesThree,
  'System Design': Layout,
}

const TOOL_ICONS = {
  'VS Code': Monitor,
  'Figma': FigmaLogo,
  'Git': GitBranch,
  'Vercel': Triangle,
  'Linear': ArrowsOutSimple,
  'Notion': Notepad,
}

function AboutSection({ about }) {
  return (
    <section className={styles.section} id="about">
      <Reveal>
        <h2 className={styles.sectionHeadline}>
          about me
          <span className={styles.divider} />
        </h2>
      </Reveal>

      <div className={styles.grid}>
        <Reveal variants={slideFromLeft}>
          <p className={styles.bio}>{about.bio}</p>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <Reveal variants={slideFromRight}>
            <div className={styles.group}>
              <h3 className={styles.groupTitle}>Skills</h3>
              <motion.ul
                className={styles.list}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={staggerContainer}
              >
                {about.skills.map((skill) => {
                  const Icon = SKILL_ICONS[skill]
                  return (
                    <motion.li key={skill} className={styles.chip} variants={staggerItem}>
                      {Icon && <Icon size={16} weight="light" />}
                      {skill}
                    </motion.li>
                  )
                })}
              </motion.ul>
            </div>
          </Reveal>

          <Reveal variants={slideFromRight}>
            <div className={styles.group}>
              <h3 className={styles.groupTitle}>Tools</h3>
              <motion.ul
                className={styles.list}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={staggerContainer}
              >
                {about.tools.map((tool) => {
                  const Icon = TOOL_ICONS[tool]
                  return (
                    <motion.li key={tool} className={styles.chip} variants={staggerItem}>
                      {Icon && <Icon size={16} weight="light" />}
                      {tool}
                    </motion.li>
                  )
                })}
              </motion.ul>
            </div>
          </Reveal>

          {about.hobbies && (
            <Reveal variants={slideFromRight}>
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>Interests</h3>
                <p className={styles.bio}>{about.hobbies}</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
