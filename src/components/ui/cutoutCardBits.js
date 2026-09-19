import { useMemo } from 'react'
import styles from './CutoutCard.module.css'

// Shared constants + motion variants for the CutoutCard family.
// Kept out of the component file so Fast Refresh only sees components there.

export const cutoutCardSurfaceClassName = styles.surface

export function useCutoutContentStaggerVariants() {
  return useMemo(
    () => ({
      container: {
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08, delayChildren: 0.15 },
        },
      },
      item: {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      },
    }),
    [],
  )
}
