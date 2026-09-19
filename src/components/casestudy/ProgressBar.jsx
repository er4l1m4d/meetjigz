import { useState, useEffect } from 'react'
import styles from './ProgressBar.module.css'

function ProgressBar({ sections }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = sections.indexOf(entry.target.id.replace('cs-', ''))
          if (idx !== -1) setActive(idx)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    const els = sections
      .map((s) => document.getElementById(`cs-${s}`))
      .filter(Boolean)
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
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
