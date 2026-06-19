import {
  Code,
  FileTs,
  Server,
  FigmaLogo,
  CirclesThree,
  Layout,
  Monitor,
  GitBranch,
  Triangle,
  ArrowsOutSimple,
  Notepad,
} from '@phosphor-icons/react'
import styles from './AboutSection.module.css'

const SKILL_ICONS = {
  'React': Code,
  'TypeScript': FileTs,
  'Node.js': Server,
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
      <h2 className={styles.sectionHeadline}>
        about me
        <span className={styles.divider} />
      </h2>

      <div className={styles.grid}>
        <div>
          <p className={styles.bio}>{about.bio}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className={styles.group}>
            <h3 className={styles.groupTitle}>Skills</h3>
            <ul className={styles.list}>
              {about.skills.map((skill) => {
                const Icon = SKILL_ICONS[skill]
                return (
                  <li key={skill} className={styles.chip}>
                    {Icon && <Icon size={16} weight="light" />}
                    {skill}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={styles.group}>
            <h3 className={styles.groupTitle}>Tools</h3>
            <ul className={styles.list}>
              {about.tools.map((tool) => {
                const Icon = TOOL_ICONS[tool]
                return (
                  <li key={tool} className={styles.chip}>
                    {Icon && <Icon size={16} weight="light" />}
                    {tool}
                  </li>
                )
              })}
            </ul>
          </div>

          {about.hobbies && (
            <div className={styles.group}>
              <h3 className={styles.groupTitle}>Interests</h3>
              <p className={styles.bio}>{about.hobbies}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
