import { useMemo } from 'react'
import styles from './DotMatrixVisual.module.css'

const GRID_COLS = 14
const GRID_ROWS = 10

const accentColors = ['var(--blue)', 'var(--pop)', 'var(--green)', 'var(--amber)']

const hashString = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

const generatePattern = (seed) => {
  const dots = []
  const rng = (n) => {
    const x = Math.sin(seed + n) * 10000
    return x - Math.floor(x)
  }

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const index = row * GRID_COLS + col
      const rand = rng(index)
      const isActive = rand > 0.45
      const isAccent = isActive && rand > 0.78

      // Create deterministic positions for a more intentional feel
      const x = col + (isActive ? (rng(index + 100) - 0.5) * 0.3 : 0)
      const y = row + (isActive ? (rng(index + 200) - 0.5) * 0.3 : 0)
      const size = isActive ? (isAccent ? 5 + rand * 3 : 3 + rand * 2) : 2

      dots.push({
        id: `${row}-${col}`,
        x,
        y,
        size,
        isActive,
        isAccent,
      })
    }
  }
  return dots
}

function DotMatrixVisual({ seedString = 'default', accentIndex = 0 }) {
  const seed = hashString(seedString)
  const dots = useMemo(() => generatePattern(seed), [seed])
  const accentColor = accentColors[accentIndex % accentColors.length]

  return (
    <div className={styles.matrix} aria-hidden="true">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className={`${styles.dot} ${dot.isActive ? styles.active : ''} ${
            dot.isAccent ? styles.accent : ''
          }`}
          style={{
            left: `${(dot.x / (GRID_COLS - 1)) * 100}%`,
            top: `${(dot.y / (GRID_ROWS - 1)) * 100}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.isAccent ? accentColor : undefined,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  )
}

export default DotMatrixVisual
