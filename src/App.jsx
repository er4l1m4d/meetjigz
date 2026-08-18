import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BootScreen from './screens/BootScreen.jsx'
import DesktopScreen from './screens/DesktopScreen.jsx'
import CaseStudyPage from './screens/CaseStudyPage.jsx'
import ConsolePage from './screens/ConsolePage.jsx'
import PasswordGate from './components/PasswordGate.jsx'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
}

function App() {
  const [activeScreen, setActiveScreen] = useState('boot')
  const [isBootExiting, setIsBootExiting] = useState(false)

  if (activeScreen === 'boot') {
    return (
      <AnimatePresence mode="wait">
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
              setActiveScreen('desktop')
            }}
          />
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <motion.div
          key="desktop"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes>
            <Route path="/" element={<DesktopScreen />} />
            <Route path="/project/:id" element={<CaseStudyPage />} />
            <Route path="/console" element={<PasswordGate><ConsolePage /></PasswordGate>} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
