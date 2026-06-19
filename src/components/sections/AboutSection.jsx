import styles from './AboutSection.module.css'

function AboutSection({ about }) {
  return (
    <section className={styles.section} id="about">
      <h2 className={styles.sectionHeadline}>
        About
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
              {about.skills.map((skill) => (
                <li key={skill} className={styles.chip}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className={styles.group}>
            <h3 className={styles.groupTitle}>Tools</h3>
            <ul className={styles.list}>
              {about.tools.map((tool) => (
                <li key={tool} className={styles.chip}>{tool}</li>
              ))}
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
