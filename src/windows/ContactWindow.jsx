import { useState } from 'react'
import { DiscordLogo, TelegramLogo, TwitterLogo } from '@phosphor-icons/react'
import Window from './Window.jsx'
import styles from './ContactWindow.module.css'

const ICONS = {
  x: TwitterLogo,
  telegram: TelegramLogo,
  discord: DiscordLogo,
}

function ContactWindow({ contact, onClose, onFocus, defaultPosition, zIndex }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyContact = async () => {
    try {
      await navigator.clipboard.writeText(contact.vcard)
      setIsCopied(true)
      window.setTimeout(() => setIsCopied(false), 1200)
    } catch {
      setIsCopied(false)
    }
  }

  return (
    <Window
      title="Contact"
      onClose={onClose}
      onFocus={onFocus}
      defaultPosition={defaultPosition}
      zIndex={zIndex}
      width={360}
      height={420}
      bodyClassName={styles.contactBody}
    >
      <div className={styles.card}>
        <div className={`${styles.avatar} sqircle`}>JG</div>
        <h3 className={styles.name}>{contact.name}</h3>
        <p className={styles.role}>{contact.role}</p>

        <button type="button" className={styles.copyBtn} onClick={copyContact}>
          {isCopied ? 'Copied!' : 'Copy Contact'}
        </button>

        <div className={styles.links}>
          {contact.socials.map((social) => {
            const Icon = ICONS[social.id]
            return (
              <a key={social.id} className={styles.link} href={social.href} target="_blank" rel="noreferrer noopener">
                {Icon && <Icon size={16} weight="fill" />} {social.label}
              </a>
            )
          })}
        </div>
      </div>
    </Window>
  )
}

export default ContactWindow
