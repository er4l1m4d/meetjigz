import styles from './ProjectSection.module.css'

function ProjectSection({ projects = [] }) {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Selected Work</p>
        <h2 className={styles.sectionHeadline}>Projects</h2>

        <div className={styles.grid}>
          {projects.map((project) => (
            <a
              key={project.id}
              className={styles.card}
              href={project.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className={styles.cardThumb} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.cardTags}>
                  {project.tags.map((tag) => (
                    <span key={`${project.id}-${tag}`} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={styles.cardLink}>Learn more</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectSection
