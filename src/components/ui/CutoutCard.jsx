import styles from './CutoutCard.module.css'

// ============================================================================
// CutoutCard — notched-tab card primitives (CSS Module port of the Tailwind
// registry component). Same slot structure: Card > Media(Image/Overlay/
// InsetLabel/Pin/Corner) > Content(Footer) > Action.
// Shared surface class + stagger hook live in ./cutoutCardBits.js
// ==========================================================================

function CutoutCard({ className = '', children, ...rest }) {
  return (
    <div className={`${styles.card} ${className}`} {...rest}>
      {children}
    </div>
  )
}

function CutoutCardMedia({ className = '', style, children, ...rest }) {
  return (
    <div
      className={`${styles.media} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

function CutoutCardImage({ src, alt = '', fallback = null, ...rest }) {
  if (!src) return fallback
  return <img className={styles.image} src={src} alt={alt} loading="lazy" {...rest} />
}

function CutoutCardVisual({ children, ...rest }) {
  return (
    <div className={styles.visual} {...rest}>
      {children}
    </div>
  )
}

function CutoutCardOverlay({ className = '', ...rest }) {
  return <div className={`${styles.overlay} ${className}`} aria-hidden="true" {...rest} />
}

function CutoutCardInsetLabel({ className = '', children, ...rest }) {
  return (
    <div className={`${styles.insetLabel} ${className}`} {...rest}>
      {children}
    </div>
  )
}

function CutoutCardPin({ className = '', children, ...rest }) {
  return (
    <div className={`${styles.pin} ${className}`} {...rest}>
      {children}
    </div>
  )
}

function CutoutCorner({ className = '', size, angle = 0, style, ...rest }) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.corner} ${className}`}
      style={{
        transform: angle ? `rotate(${angle}deg)` : undefined,
        '--s': size ? `${size}px` : undefined,
        ...style,
      }}
      {...rest}
    />
  )
}

function CutoutCardContent({ className = '', children, ...rest }) {
  return (
    <div className={`${styles.content} ${className}`} {...rest}>
      {children}
    </div>
  )
}

function CutoutCardFooter({ className = '', children, ...rest }) {
  return (
    <div className={`${styles.footer} ${className}`} {...rest}>
      {children}
    </div>
  )
}

function CutoutCardAction({ className = '', inline = false, style, children, ...rest }) {
  return (
    <div
      className={`${styles.action} ${inline ? styles.actionInline : ''} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

export {
  CutoutCard,
  CutoutCardAction,
  CutoutCardContent,
  CutoutCardFooter,
  CutoutCardImage,
  CutoutCardInsetLabel,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardPin,
  CutoutCardVisual,
  CutoutCorner,
}
