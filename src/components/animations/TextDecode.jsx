import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function TextDecode({ text, duration = 1200, delay = 0, className, style }) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    let startTime
    const totalChars = text.length
    const msPerChar = duration / totalChars

    const tick = (now) => {
      if (!startTime) startTime = now + delay
      const elapsed = now - startTime
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }

      const resolvedCount = Math.min(Math.floor(elapsed / msPerChar), totalChars)
      const unresolved = totalChars - resolvedCount

      let result = text.slice(0, resolvedCount)
      for (let i = 0; i < unresolved; i++) {
        result += CHARS[Math.floor(Math.random() * CHARS.length)]
      }

      setDisplay(result)

      if (resolvedCount < totalChars) {
        raf = requestAnimationFrame(tick)
      } else {
        setDone(true)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, duration, delay])

  return (
    <motion.span
      className={className}
      style={{ ...style, fontVariantNumeric: 'tabular-nums' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {display}
      {!done && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: 'var(--primary)',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            animation: 'blinkCursor 1s steps(1, end) infinite',
          }}
        />
      )}
    </motion.span>
  )
}

export default TextDecode
