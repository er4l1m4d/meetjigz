import Reveal from './animations/Reveal.jsx'
import { fadeIn } from './animations/variants.js'
import styles from './Footer.module.css'

function Footer({ contact }) {
  return (
    <Reveal variants={fadeIn}>
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            jigz
          </div>

          <ul className={styles.links}>
            {contact.socials.map((social) => (
              <li key={social.id}>
                <a
                  className={styles.link}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.copyright}>&copy; 2026 jigz.</p>
        </div>
      </footer>
    </Reveal>
  )
}

export default Footer
