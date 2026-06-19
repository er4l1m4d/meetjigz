import { DiscordLogo, TelegramLogo, TwitterLogo } from '@phosphor-icons/react'
import styles from './ContactSection.module.css'

const ICONS = {
  x: TwitterLogo,
  telegram: TelegramLogo,
  discord: DiscordLogo,
}

function ContactSection({ contact }) {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.sectionLabel}>Contact</p>
          <h2 className={styles.sectionHeadline}>Let&apos;s work together.</h2>
          <a className={styles.email} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>

        <div className={styles.right}>
          <div className={styles.socials}>
            {contact.socials.map((social) => {
              const Icon = ICONS[social.id]
              return (
                <a
                  key={social.id}
                  className={styles.socialLink}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {Icon && <Icon size={16} weight="fill" />}
                  {social.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        Designed & Built by {contact.name}
      </div>
    </section>
  )
}

export default ContactSection
