import { useState } from 'react'
import { useAuth } from './context/AuthContext.jsx'
import BootScreen from './screens/BootScreen.jsx'
import DesktopScreen from './screens/DesktopScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'

function App() {
  const { login } = useAuth()
  const [activeScreen, setActiveScreen] = useState('boot')
  const [isBootExiting, setIsBootExiting] = useState(false)

  if (activeScreen === 'desktop') {
    return <DesktopScreen />
  }

  if (activeScreen === 'login') {
    return (
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
    )
  }

  return (
    <BootScreen
      isExiting={isBootExiting}
      onComplete={() => {
        setIsBootExiting(true)
      }}
      onExitComplete={() => {
        setActiveScreen('login')
      }}
    />
  )
}

export default App
