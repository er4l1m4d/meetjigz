import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './SpotlightOverlay.module.css'

const SAMPLE_RESULTS = [
  { id: 'works', label: 'Works', detail: 'Projects window' },
  { id: 'about', label: 'About Me', detail: 'Skills, Tools, Hobbies' },
  { id: 'contact', label: 'Contact', detail: 'Social links' },
]

function SpotlightOverlayInner({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const results = useMemo(() => {
    if (!query) {
      return SAMPLE_RESULTS
    }
    const lower = query.toLowerCase()
    return SAMPLE_RESULTS.filter((item) => item.label.toLowerCase().includes(lower))
  }, [query])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Spotlight search" onClick={onClose}>
      <div className={`${styles.panel} glass`} onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className={styles.results}>
          {results.map((item) => (
            <button key={item.id} type="button" className={styles.result} onClick={onClose}>
              <span className={styles.resultTitle}>{item.label}</span>
              <span className={styles.resultDetail}>{item.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function SpotlightOverlay({ isOpen, onClose }) {
  return <SpotlightOverlayInner key={String(isOpen)} isOpen={isOpen} onClose={onClose} />
}

export default SpotlightOverlay
