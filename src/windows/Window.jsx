import { motion as Motion } from 'framer-motion'
import Draggable from 'react-draggable'
import { useRef, useState } from 'react'
import styles from './Window.module.css'

function Window({
  title,
  children,
  onClose,
  onFocus,
  defaultPosition = { x: 120, y: 120 },
  zIndex = 10,
  width,
  height,
  className = '',
  bodyClassName = '',
}) {
  const nodeRef = useRef(null)
  const closeHandledRef = useRef(false)
  const [isClosing, setIsClosing] = useState(false)

  return (
    <Draggable nodeRef={nodeRef} handle=".window-titlebar" bounds="parent" defaultPosition={defaultPosition}>
      <section
        ref={nodeRef}
        className={`${styles.shell} glass ${className}`.trim()}
        style={{ zIndex, width, height, pointerEvents: isClosing ? 'none' : 'auto' }}
        onMouseDown={onFocus}
      >
        <Motion.div
          className={styles.inner}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: isClosing ? 0 : 1, scale: isClosing ? 0.92 : 1 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          onAnimationComplete={() => {
            if (isClosing && !closeHandledRef.current) {
              closeHandledRef.current = true
              onClose?.()
            }
          }}
        >
          <header className={styles.titlebar}>
            <div className={styles.dots}>
              <button
                type="button"
                className={`${styles.dot} ${styles.dotClose}`}
                aria-label={`Close ${title}`}
                onClick={() => setIsClosing(true)}
              />
              <span className={`${styles.dot} ${styles.dotMin}`} aria-hidden="true" />
              <span className={`${styles.dot} ${styles.dotMax}`} aria-hidden="true" />
            </div>
            <h2 className={styles.title}>{title}</h2>
          </header>

          <div className={`${styles.body} ${bodyClassName}`.trim()}>{children}</div>
        </Motion.div>
      </section>
    </Draggable>
  )
}

export default Window
