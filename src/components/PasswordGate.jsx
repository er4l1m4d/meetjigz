import { useState } from 'react'
import styles from './PasswordGate.module.css'

const STORAGE_KEY = 'jigz-console-auth'
const CORRECT_HASH = 'a4f8c2e1d9b7'

function hashPassword(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

function PasswordGate({ children }) {
  const [authorized, setAuthorized] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === CORRECT_HASH
    } catch {
      return false
    }
  })
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const hash = hashPassword(password)
    if (hash === CORRECT_HASH) {
      try {
        sessionStorage.setItem(STORAGE_KEY, CORRECT_HASH)
      } catch {}
      setAuthorized(true)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (authorized) return children

  return (
    <div className={styles.overlay}>
      <dialog className={styles.modal} open>
        <h2 className={styles.title}>console</h2>
        <p className={styles.hint}>enter password to continue</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            placeholder="password"
            autoFocus
          />
          {error && <p className={styles.error}>incorrect password</p>}
          <button type="submit" className={styles.submit}>unlock</button>
        </form>
      </dialog>
    </div>
  )
}

export default PasswordGate
