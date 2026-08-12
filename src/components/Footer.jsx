import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.divider} />
        <div className={styles.bottom}>
          <div className={styles.brand}>jigz</div>
          <p className={styles.copyright}>&copy; 2026 jigz.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
