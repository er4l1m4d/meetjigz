import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from './context/AuthContext.jsx'
import BootScreen from './screens/BootScreen.jsx'
import DesktopScreen from './screens/DesktopScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
}

function App() {
  const { login } = useAuth()
  const [activeScreen, setActiveScreen] = useState('boot')
  const [isBootExiting, setIsBootExiting] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {activeScreen === 'desktop' && (
        <motion.div
          key="desktop"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <DesktopScreen />
        </motion.div>
      )}

      {activeScreen === 'login' && (
        <motion.div
          key="login"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LoginScreen
            onGuestLogin={() => {
              login('guest')
              setActiveScreen('desktop')
            }}
            onJigzLogin={() => {
              login('jigz')
              setActiveScreen('desktop')
            }}
          />
        </motion.div>
      )}

      {activeScreen === 'boot' && (
        <motion.div
          key="boot"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <BootScreen
            isExiting={isBootExiting}
            onComplete={() => {
              setIsBootExiting(true)
            }}
            onExitComplete={() => {
              setActiveScreen('login')
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
