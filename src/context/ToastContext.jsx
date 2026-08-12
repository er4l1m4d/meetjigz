import { createContext, useContext, useState, useCallback, useRef } from 'react'
import styles from './ToastContext.module.css'

const ToastContext = createContext(null)

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const dismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setToast(null)
  }, [])

  const showToast = useCallback(
    (message, { onUndo, duration = 5000 } = {}) => {
      dismiss()
      setToast({ message, onUndo })
      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          setToast(null)
          timerRef.current = null
        }, duration)
      }
    },
    [dismiss],
  )

  const handleUndo = useCallback(() => {
    if (toast?.onUndo) {
      toast.onUndo()
    }
    dismiss()
  }, [toast, dismiss])

  const value = { showToast, dismiss }

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          <span className={styles.message}>{toast.message}</span>
          {toast.onUndo && (
            <button type="button" className={styles.undo} onClick={handleUndo}>
              undo
            </button>
          )}
          <button type="button" className={styles.close} onClick={dismiss} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a ToastProvider')
  return context
}

export { ToastProvider, useToast }
