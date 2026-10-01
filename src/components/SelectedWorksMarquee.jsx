import { useEffect, useRef } from 'react'
import SelectedWorkCard from './SelectedWorkCard.jsx'
import styles from './SelectedWorksMarquee.module.css'

const IDLE_RESUME_MS = 3000
const SWIPE_THRESHOLD = 6

function cloneArray(arr, n) {
  return [...Array(n)].flatMap(() => arr)
}

export default function SelectedWorksMarquee({ entries }) {
  const duplicated = cloneArray(entries, 2)
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const count = entries.length

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track || count === 0) return undefined
    if (typeof requestAnimationFrame !== 'function') return undefined

    let pos = 0
    let wrapWidth = 0
    let loopSeconds = 60
    let hovering = false
    let touching = false
    let visible = true
    let lastInteraction = -Infinity
    let lastFrame = performance.now()
    let frame = 0

    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const measure = () => {
      const first = track.children[0]
      const second = track.children[count]
      wrapWidth = first && second ? second.offsetLeft - first.offsetLeft : 0
      const raw = getComputedStyle(root).getPropertyValue('--marquee-duration').trim()
      const value = parseFloat(raw)
      loopSeconds = Number.isFinite(value) && value > 0
        ? raw.includes('ms') ? value / 1000 : value
        : 60
    }

    const wrap = (value) => {
      if (wrapWidth <= 0) return Math.max(0, value)
      let next = value
      while (next >= wrapWidth) next -= wrapWidth
      while (next < 0) next += wrapWidth
      return next
    }

    const apply = () => {
      root.scrollLeft = pos
    }

    const nudge = (delta) => {
      pos = wrap(pos + delta)
      apply()
      lastInteraction = performance.now()
    }

    const onWheel = (event) => {
      let dx = event.deltaX
      let dy = event.deltaY
      if (event.deltaMode === 1) {
        dx *= 16
        dy *= 16
      } else if (event.deltaMode === 2) {
        dx *= root.clientWidth
        dy *= root.clientHeight
      }
      const horizontal = Math.abs(dx) > Math.abs(dy) || (event.shiftKey && dx === 0 && dy !== 0)
      if (!horizontal) return
      const delta = dx !== 0 ? dx : dy
      if (!delta) return
      event.preventDefault()
      nudge(delta)
    }

    let startX = 0
    let startY = 0
    let lastX = 0
    let axis = null

    const onTouchStart = (event) => {
      if (event.touches.length !== 1) {
        axis = null
        return
      }
      touching = true
      startX = lastX = event.touches[0].clientX
      startY = event.touches[0].clientY
      axis = null
    }

    const onTouchMove = (event) => {
      if (!touching || event.touches.length !== 1) return
      const x = event.touches[0].clientX
      const y = event.touches[0].clientY
      if (axis === null) {
        const dx = Math.abs(x - startX)
        const dy = Math.abs(y - startY)
        if (dx < SWIPE_THRESHOLD && dy < SWIPE_THRESHOLD) return
        axis = dx > dy ? 'x' : 'y'
      }
      if (axis !== 'x') return
      event.preventDefault()
      nudge(lastX - x)
      lastX = x
    }

    const onTouchEnd = () => {
      touching = false
      axis = null
      lastInteraction = performance.now()
    }

    const onPointerEnter = (event) => {
      if (event.pointerType !== 'mouse') return
      hovering = true
    }

    const onPointerLeave = (event) => {
      if (event.pointerType !== 'mouse') return
      hovering = false
    }

    const tick = (now) => {
      // rAF timestamps can predate the performance.now() captured at start,
      // which would yield a negative dt and wrap() a tiny backwards jump all
      // the way to the end of the loop. Clamp on both sides.
      const dt = Math.min(Math.max(now - lastFrame, 0), 64)
      lastFrame = now
      const idle = now - lastInteraction >= IDLE_RESUME_MS
      if (!reducedMotion && visible && !hovering && !touching && idle && wrapWidth > 0) {
        pos = wrap(pos + (wrapWidth / loopSeconds) * (dt / 1000))
        apply()
      }
      frame = requestAnimationFrame(tick)
    }

    let observer = null
    let intersection = null

    measure()
    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchmove', onTouchMove, { passive: false })
    root.addEventListener('touchend', onTouchEnd)
    root.addEventListener('touchcancel', onTouchEnd)
    root.addEventListener('pointerenter', onPointerEnter)
    root.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', measure)

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure)
      observer.observe(track)
    }
    if (typeof IntersectionObserver !== 'undefined') {
      intersection = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? true
      })
      intersection.observe(root)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      intersection?.disconnect()
      window.removeEventListener('resize', measure)
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('touchstart', onTouchStart)
      root.removeEventListener('touchmove', onTouchMove)
      root.removeEventListener('touchend', onTouchEnd)
      root.removeEventListener('touchcancel', onTouchEnd)
      root.removeEventListener('pointerenter', onPointerEnter)
      root.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [count])

  return (
    <div className={styles.marqueeRoot} ref={rootRef}>
      <div className={styles.marqueeTrack} ref={trackRef}>
        {duplicated.map((entry, i) => (
          <div
            key={`${entry.id}-${i}`}
            className={styles.marqueeCard}
            aria-hidden={i >= entries.length}
          >
            <SelectedWorkCard entry={entry} />
          </div>
        ))}
      </div>
      <div className={styles.edgeLeft} aria-hidden="true" />
      <div className={styles.edgeRight} aria-hidden="true" />
    </div>
  )
}
