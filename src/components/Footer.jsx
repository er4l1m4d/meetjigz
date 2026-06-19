import styles from './Footer.module.css'

function Footer({ contact }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>jigz</div>

        <ul className={styles.links}>
          {contact.socials.map((social) => (
            <li key={social.id}>
              <a className={styles.link} href={social.href} target="_blank" rel="noreferrer noopener">
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.copyright}>&copy; 2026 Jigz.</p>
      </div>
    </footer>
  )
}

export default Footer
