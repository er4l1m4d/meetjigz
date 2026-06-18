import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { usePortfolioData } from '../hooks/usePortfolioData.js'
import { useWindowManager } from '../hooks/useWindowManager.js'
import ContactWindow from '../windows/ContactWindow.jsx'
import Dock from '../components/Dock.jsx'
import SpotlightOverlay from '../components/SpotlightOverlay.jsx'
import TopBar from '../components/TopBar.jsx'
import TypewriterGreeting from '../components/TypewriterGreeting.jsx'
import AboutWindow from '../windows/AboutWindow.jsx'
import WorksWindow from '../windows/WorksWindow.jsx'
import styles from './DesktopScreen.module.css'

function DesktopScreen() {
  const { userType } = useAuth()
  const { projects, about, contact } = usePortfolioData()
  const { openWindow, closeWindow, focusWindow, getWindow } = useWindowManager(['about'])
  const [spotlightOpen, setSpotlightOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setSpotlightOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const works = getWindow('works')
  const aboutWin = getWindow('about')
  const contactWin = getWindow('contact')

  return (
    <section className={styles.screen} aria-label="Desktop">
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.ambient} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobA}`} />
        <span className={`${styles.blob} ${styles.blobB}`} />
        <span className={`${styles.blob} ${styles.blobC}`} />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <TopBar onOpenSpotlight={() => setSpotlightOpen(true)} />
      <Dock
        onOpenWorks={() => openWindow('works')}
        onOpenContact={() => openWindow('contact')}
      />
      <SpotlightOverlay isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
      <div className={styles.windowLayer} aria-label="Window layer">
        {works.open && (
          <WorksWindow
            projects={projects}
            defaultPosition={{ x: 84, y: 124 }}
            zIndex={works.zIndex}
            onFocus={() => focusWindow('works')}
            onClose={() => closeWindow('works')}
          />
        )}

        {aboutWin.open && (
          <AboutWindow
            about={about}
            defaultPosition={{ x: 430, y: 176 }}
            zIndex={aboutWin.zIndex}
            onFocus={() => focusWindow('about')}
            onClose={() => closeWindow('about')}
          />
        )}

        {contactWin.open && (
          <ContactWindow
            contact={contact}
            defaultPosition={{ x: 260, y: 210 }}
            zIndex={contactWin.zIndex}
            onFocus={() => focusWindow('contact')}
            onClose={() => closeWindow('contact')}
          />
        )}
      </div>

      <div className={styles.content}>
        <TypewriterGreeting key={userType ?? 'guest'} userType={userType} />
      </div>
    </section>
  )
}

export default DesktopScreen
