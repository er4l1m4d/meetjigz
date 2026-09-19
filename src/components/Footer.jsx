import { useLocation } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react'
import { usePortfolioData } from '../hooks/usePortfolioData.js'
import { findSocialIcon } from '../lib/socialIcons.js'
import Reveal from './animations/Reveal.jsx'
import { fadeUp } from './animations/variants.js'
import styles from './Footer.module.css'

const DEFAULT_FOOTER_NAV = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'works', label: 'Works' },
  { id: 'contact', label: 'Contact' },
]

function Footer() {
  const { contact, settings } = usePortfolioData()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const footerNav = settings?.navLinks || DEFAULT_FOOTER_NAV

  const goToSection = (id) => {
    if (!isHome) {
      window.location.assign(`/#${id}`)
      return
    }
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyrightText = settings?.copyright
    ? `© ${settings.copyright.year || '2026'} ${settings.copyright.name || 'Damilare Ogo-Oluwade'} · ${settings.copyright.credit || 'designed & built by me'}`
    : '© 2026 Damilare Ogo-Oluwade · designed & built by me'

  return (
    <footer id="contact" className={styles.footer}>
      <Reveal variants={fadeUp} className={styles.card}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.hello}>
              <span className={styles.eyebrow}>Say hello</span>
              <a className={styles.email} href={`mailto:${contact.email}`}>
                {contact.email}
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </div>
            <div className={styles.nav}>
              {footerNav.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.navLink}
                  onClick={() => goToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.meta}>
            <p className={styles.copyright}>{copyrightText}</p>
            <div className={styles.metaRight}>
              <div className={styles.socials}>
                {contact.socials.map((social) => {
                  const entry = findSocialIcon(social.icon)
                  const SocialIcon = entry?.Icon || null
                  return (
                    <a
                      key={social.id || social.href || entry?.key || 'social'}
                      href={social.href}
                      className={styles.pill}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {SocialIcon && <SocialIcon size={14} weight="bold" style={{ marginRight: social.label ? '6px' : 0 }} />}
                      {social.label}
                    </a>
                  )
                })}
              </div>
              <button
                type="button"
                className={styles.toTop}
                onClick={backToTop}
                aria-label="Back to top"
              >
                <ArrowUp size={16} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}

export default Footer
