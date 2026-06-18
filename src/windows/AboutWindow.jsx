import { useMemo, useState } from 'react'
import Window from './Window.jsx'
import styles from './AboutWindow.module.css'

const ABOUT_SECTIONS = ['About Me', 'Skills', 'Tools', 'Hobbies', 'Projects']

function AboutWindow({ about, onClose, onFocus, defaultPosition, zIndex }) {
  const [activeSection, setActiveSection] = useState('About Me')

  const sectionContent = useMemo(() => {
    if (activeSection === 'Skills') {
      return (
        <div className={styles.contentStack}>
          <h3 className={styles.sectionTitle}>Skills</h3>
          <ul className={styles.list}>
            {about.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )
    }

    if (activeSection === 'Tools') {
      return (
        <div className={styles.contentStack}>
          <h3 className={styles.sectionTitle}>Tools</h3>
          <ul className={styles.list}>
            {about.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      )
    }

    if (activeSection === 'Hobbies') {
      return (
        <div className={styles.contentStack}>
          <h3 className={styles.sectionTitle}>Hobbies</h3>
          <p className={styles.paragraph}>{about.hobbies}</p>
        </div>
      )
    }

    if (activeSection === 'Projects') {
      return (
        <div className={styles.contentStack}>
          <h3 className={styles.sectionTitle}>Projects</h3>
          <p className={styles.paragraph}>
            This section mirrors my Works window and acts as another entry point to project case
            studies. Full project management lands in CMS mode later.
          </p>
        </div>
      )
    }

    return (
      <div className={styles.contentStack}>
        <h3 className={styles.sectionTitle}>About Me</h3>
        <div className={styles.profileRow}>
          <div className={`${styles.photoPlaceholder} sqircle`} aria-hidden="true">
            JG
          </div>
          <p className={styles.paragraph}>{about.bio}</p>
        </div>
      </div>
    )
  }, [activeSection, about])

  return (
    <Window
      title="About Me"
      onClose={onClose}
      onFocus={onFocus}
      defaultPosition={defaultPosition}
      zIndex={zIndex}
      width={760}
      height={520}
      bodyClassName={styles.aboutBody}
    >
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="About sections">
          {ABOUT_SECTIONS.map((section) => (
            <button
              key={section}
              type="button"
              className={`${styles.navItem} ${activeSection === section ? styles.isActive : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </aside>

        <section className={styles.contentPanel} aria-label={`${activeSection} content`}>
          {sectionContent}
        </section>
      </div>
    </Window>
  )
}

export default AboutWindow
