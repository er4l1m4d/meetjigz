import { motion } from 'framer-motion'
import Reveal from './animations/Reveal.jsx'
import { fadeIn } from './animations/variants.js'
import styles from './Footer.module.css'

function Footer({ contact }) {
  return (
    <Reveal variants={fadeIn}>
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <motion.div
            className={styles.brand}
            whileHover={{ color: 'var(--primary)' }}
          >
            jigz
          </motion.div>

          <ul className={styles.links}>
            {contact.socials.map((social) => (
              <li key={social.id}>
                <motion.a
                  className={styles.link}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  whileHover={{ color: 'var(--primary)', scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.label}
                </motion.a>
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
