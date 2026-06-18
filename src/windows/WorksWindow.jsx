import Window from './Window.jsx'
import styles from './WorksWindow.module.css'

function WorksWindow({ projects, onClose, onFocus, defaultPosition, zIndex }) {
  return (
    <Window
      title="Works"
      onClose={onClose}
      onFocus={onFocus}
      defaultPosition={defaultPosition}
      zIndex={zIndex}
      width={800}
      height={560}
      bodyClassName={styles.worksBody}
    >
      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.thumb} aria-hidden="true" />
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={`${project.id}-${tag}`} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Window>
  )
}

export default WorksWindow
