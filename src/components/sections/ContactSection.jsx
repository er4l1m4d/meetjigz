import { motion } from 'framer-motion'
import { DiscordLogo, TelegramLogo, TwitterLogo } from '@phosphor-icons/react'
import Reveal from '../animations/Reveal.jsx'
import { staggerContainer, staggerItem, slideFromLeft, slideFromRight } from '../animations/variants.js'
import styles from './ContactSection.module.css'

const ICONS = {
  x: TwitterLogo,
  telegram: TelegramLogo,
  discord: DiscordLogo,
}

function ContactSection({ contact }) {
  return (
    <section className={styles.section} id="contact">
      <Reveal>
        <h2 className={styles.sectionHeadline}>
          contact
          <span className={styles.divider} />
        </h2>
      </Reveal>

      <div className={styles.grid}>
        <Reveal variants={slideFromLeft}>
          <div>
            <p className={styles.labelCaps}>Get in touch</p>
            <a className={styles.email} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </Reveal>

        <Reveal variants={slideFromRight}>
          <div className={styles.socials}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainer}
            >
              {contact.socials.map((social) => {
                const Icon = ICONS[social.id]
                return (
                  <motion.a
                    key={social.id}
                    className={styles.socialLink}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {Icon && <Icon size={20} weight="light" />}
                    {social.label}
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default ContactSection
