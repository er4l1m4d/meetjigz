import { createElement, useEffect, useRef, useState } from 'react'
import { Cube, MagnifyingGlass } from '@phosphor-icons/react'
import { useSkillIconCatalog } from '../../hooks/useSkillIconCatalog.js'
import styles from './IconPicker.module.css'

function IconPicker({ skill, value, onChange }) {
  const catalog = useSkillIconCatalog()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const entries = catalog?.SKILL_ICONS || []
  const q = query.trim().toLowerCase()
  const results = q && catalog
    ? entries.filter(
        ({ key, label, aliases }) =>
          key.includes(q) ||
          label.toLowerCase().includes(q) ||
          aliases.some((a) => a.toLowerCase().includes(q)),
      )
    : entries

  const explicit = value && catalog ? catalog.findSkillIcon(value) : null
  const CurrentIcon = catalog ? (explicit ? explicit.Icon : catalog.resolveSkillIcon(skill)) : null

  const pick = (key) => {
    onChange(key === value ? '' : key)
    setOpen(false)
    setQuery('')
  }

  const title = explicit
    ? `icon: ${explicit.label} (click to change)`
    : CurrentIcon
      ? 'auto-matched icon (click to override)'
      : 'pick an icon'

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen((v) => !v)}
        title={title}
        aria-label="pick skill icon"
      >
        {CurrentIcon ? createElement(CurrentIcon, { size: 15 }) : createElement(Cube, { size: 15, weight: 'duotone' })}
      </button>

      {open && (
        <div className={styles.popover}>
          <div className={styles.searchWrap}>
            <MagnifyingGlass size={13} className={styles.searchIcon} />
            <input
              className={styles.search}
              type="text"
              placeholder="search icons…"
              value={query}
              autoFocus
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                onChange('')
                setOpen(false)
                setQuery('')
              }}
              title="reset to auto-match"
            >
              auto
            </button>
          </div>
          <div className={styles.grid}>
            {!catalog && <span className={styles.empty}>loading…</span>}
            {results.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                className={`${styles.cell} ${value === key ? styles.cellActive : ''}`}
                onClick={() => pick(key)}
                title={label}
                aria-label={label}
              >
                {createElement(Icon, { size: 17 })}
              </button>
            ))}
            {catalog && results.length === 0 && <span className={styles.empty}>no matches</span>}
          </div>
        </div>
      )}
    </div>
  )
}

export default IconPicker
