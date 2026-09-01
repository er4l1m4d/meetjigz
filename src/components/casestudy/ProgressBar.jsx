import { useState, useEffect } from 'react'
import styles from './ProgressBar.module.css'

function ProgressBar({ sections }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(`cs-${sections[i]}`)
        if (el && el.offsetTop <= scrollY) {
          setActive(i)
          return
        }
      }
      setActive(0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  function scrollTo(index) {
    const el = document.getElementById(`cs-${sections[index]}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (sections.length === 0) return null

  return (
    <nav className={styles.bar} aria-label="Case study sections">
      {sections.map((section, i) => (
        <button
          key={section}
          type="button"
          className={`${styles.dot} ${i === active ? styles.active : ''}`}
          onClick={() => scrollTo(i)}
          aria-label={`Go to ${section} section`}
          aria-current={i === active ? 'true' : undefined}
        />
      ))}
    </nav>
  )
}

export default ProgressBar
