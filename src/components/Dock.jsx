import { motion as Motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Briefcase, DiscordLogo, TelegramLogo, TwitterLogo } from '@phosphor-icons/react'
import styles from './Dock.module.css'

const DOCK_ITEMS = [
  { id: 'pfp', label: 'Profile', type: 'pfp' },
  { id: 'works', label: 'Works', icon: Briefcase, type: 'icon' },
  { id: 'x', label: 'X', icon: TwitterLogo, type: 'icon', href: 'https://x.com/jigz_crypto' },
  { id: 'telegram', label: 'Telegram', icon: TelegramLogo, type: 'icon', href: 'https://t.me/jigz_crypto' },
  { id: 'discord', label: 'Discord', icon: DiscordLogo, type: 'icon', href: 'https://discord.com/' },
]

function Dock({ onOpenWorks, onOpenContact }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const getScale = useMemo(
    () => (index) => {
      if (hoveredIndex < 0) {
        return 1
      }
      if (index === hoveredIndex) {
        return 1.24
      }
      if (Math.abs(index - hoveredIndex) === 1) {
        return 1.12
      }
      return 1
    },
    [hoveredIndex],
  )

  return (
    <nav className={`${styles.dock} glass`} aria-label="Desktop dock">
      {DOCK_ITEMS.map((item, index) => {
        if (item.type === 'pfp') {
          return (
            <Motion.button
              key={item.id}
              type="button"
              className={styles.itemWrap}
              aria-label={item.label}
              onClick={() => {
                if (typeof onOpenContact === 'function') {
                  onOpenContact()
                }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(-1)}
              animate={{ scale: getScale(index), y: hoveredIndex === index ? -6 : 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 24, mass: 0.5 }}
            >
              {hoveredIndex === index && <span className={styles.tooltip}>{item.label}</span>}
              <span className={`${styles.item} ${styles.itemPfp}`}>
                <span className={`${styles.pfp} sqircle`}>JG</span>
              </span>
            </Motion.button>
          )
        }

        const Icon = item.icon
        return (
          <Motion.button
            key={item.id}
            type="button"
            className={styles.itemWrap}
            aria-label={item.label}
            onClick={() => {
              if (item.id === 'works') {
                if (typeof onOpenWorks === 'function') {
                  onOpenWorks()
                }
                return
              }

              if (item.href) {
                window.open(item.href, '_blank', 'noopener,noreferrer')
              }
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(-1)}
            animate={{ scale: getScale(index), y: hoveredIndex === index ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24, mass: 0.5 }}
          >
            {hoveredIndex === index && <span className={styles.tooltip}>{item.label}</span>}
            <span className={styles.item}>
              <Icon size={20} weight="fill" />
            </span>
          </Motion.button>
        )
      })}
    </nav>
  )
}

export default Dock
