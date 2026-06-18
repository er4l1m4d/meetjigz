import { useEffect, useMemo, useState } from 'react'
import styles from './TypewriterGreeting.module.css'

const TYPING_INTERVAL_MS = 65
const HOLD_DURATION_MS = 2200

function TypewriterGreeting({ userType }) {
  const message = useMemo(() => {
    if (userType === 'jigz') {
      return 'Welcome back, Jigz.'
    }
    return 'Hello, guest.'
  }, [userType])

  const [typedText, setTypedText] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let charIndex = 0
    let fadeTimeoutId

    const typeInterval = window.setInterval(() => {
      charIndex += 1
      setTypedText(message.slice(0, charIndex))

      if (charIndex >= message.length) {
        window.clearInterval(typeInterval)

        fadeTimeoutId = window.setTimeout(() => {
          setIsVisible(false)
        }, HOLD_DURATION_MS)
      }
    }, TYPING_INTERVAL_MS)

    return () => {
      window.clearInterval(typeInterval)
      if (fadeTimeoutId) {
        window.clearTimeout(fadeTimeoutId)
      }
    }
  }, [message])

  return (
    <div className={`${styles.greeting} ${isVisible ? styles.isVisible : ''}`} aria-live="polite">
      <span>{typedText}</span>
      {isVisible && <span className={styles.cursor} aria-hidden="true">|</span>}
    </div>
  )
}

export default TypewriterGreeting
