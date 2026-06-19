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
      <h2 className={styles.sectionHeadline}>
        Contact
        <span className={styles.divider} />
      </h2>

      <div className={styles.grid}>
        <div>
          <p className={styles.labelCaps}>Get in touch</p>
          <a className={styles.email} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>

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
                {Icon && <Icon size={20} weight="fill" />}
                {social.label}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
