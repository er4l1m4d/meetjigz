import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import styles from './LoginScreen.module.css'

const PROFILES = [
  { id: 'jigz', label: 'Jigz', initials: 'JG' },
  { id: 'guest', label: 'Guest', initials: 'GU' },
]

const JIGZ_PASSWORD_HASH = (import.meta.env.VITE_JIGZ_PASSWORD_HASH ?? '').trim().toLowerCase()

async function sha256Hex(value) {
  const encoder = new TextEncoder()
  const data = encoder.encode(value)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function LoginScreen({ onGuestLogin, onJigzLogin }) {
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState('')
  const [shakeToken, setShakeToken] = useState(0)

  const triggerShake = () => {
    setShakeToken((current) => current + 1)
  }

  const handleJigzSubmit = async (event) => {
    event.preventDefault()
    setErrorText('')

    if (!JIGZ_PASSWORD_HASH) {
      setErrorText('Set VITE_JIGZ_PASSWORD_HASH in your .env file.')
      triggerShake()
      return
    }

    const enteredHash = await sha256Hex(password)

    if (enteredHash === JIGZ_PASSWORD_HASH) {
      if (typeof onJigzLogin === 'function') {
        onJigzLogin()
      }
      return
    }

    setErrorText('Incorrect password. Try again.')
    triggerShake()
  }

  return (
    <section className={styles.screen} aria-label="Login screen">
      <div className={styles.cardGrid}>
        {PROFILES.map((profile) => (
          <div key={profile.id} className={styles.cardSlot}>
            <button
              type="button"
              className={`${styles.card} glass ${selectedProfile === profile.id ? styles.isActive : ''}`}
              onClick={() => {
                setErrorText('')
                setPassword('')

                if (profile.id === 'guest' && typeof onGuestLogin === 'function') {
                  onGuestLogin()
                  return
                }

                if (profile.id === 'jigz') {
                  setSelectedProfile('jigz')
                }
              }}
            >
              <span className={`${styles.avatar} sqircle`} aria-hidden="true">
                {profile.initials}
              </span>
              <span className={styles.name}>{profile.label}</span>
            </button>

            {profile.id === 'jigz' && selectedProfile === 'jigz' && (
              <Motion.form
                key={shakeToken}
                className={`${styles.passwordPanel} glass`}
                onSubmit={handleJigzSubmit}
                initial={{ opacity: 0, y: 6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: shakeToken > 0 ? [0, -9, 9, -7, 7, 0] : 0,
                }}
                transition={{ duration: shakeToken > 0 ? 0.34 : 0.22 }}
              >
                <label htmlFor="jigz-password" className={styles.passwordLabel}>
                  Password
                </label>
                <input
                  id="jigz-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={styles.passwordInput}
                  placeholder="Enter Jigz password"
                  autoComplete="current-password"
                  aria-invalid={errorText ? 'true' : 'false'}
                />
                <button type="submit" className={styles.passwordSubmit}>
                  Enter
                </button>

                {errorText && <p className={styles.passwordError}>{errorText}</p>}
              </Motion.form>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default LoginScreen
