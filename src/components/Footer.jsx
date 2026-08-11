import Reveal from './animations/Reveal.jsx'
import { fadeIn } from './animations/variants.js'
import styles from './Footer.module.css'

function Footer({ contact }) {
  return (
    <footer className={styles.footer}>
      <Reveal variants={fadeIn}>
        <div className={styles.inner}>
          <div className={styles.divider} />

          <h2 className={styles.headline}>
            Let&apos;s build something <span className={styles.pop}>together</span>.
          </h2>

          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.line}>
                <span className={styles.prompt}>$</span>
                <span className={styles.command}>contact --block</span>
              </div>
              <div className={styles.line}>
                <span className={styles.output}>name:</span>
                <span className={styles.value}>{contact.name}</span>
              </div>
              <div className={styles.line}>
                <span className={styles.output}>role:</span>
                <span className={styles.value}>{contact.role}</span>
              </div>
              <div className={styles.line}>
                <span className={styles.output}>email:</span>
                <a href={`mailto:${contact.email}`} className={styles.link}>{contact.email}</a>
              </div>
              {contact.socials.map((social) => (
                <div key={social.id} className={styles.line}>
                  <span className={styles.output}>{social.id}:</span>
                  <a href={social.href} className={styles.link} target="_blank" rel="noreferrer noopener">{social.label}</a>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.brand}>jigz</div>
            <p className={styles.copyright}>&copy; 2026 jigz.</p>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}

export default Footer
