/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [userType, setUserType] = useState(null)

  const login = (type) => {
    if (type !== 'guest' && type !== 'jigz') {
      return
    }

    setUserType(type)
  }

  const logout = () => {
    setUserType(null)
  }

  const value = useMemo(
    () => ({
      userType,
      isAuthenticated: userType !== null,
      isJigz: userType === 'jigz',
      isGuest: userType === 'guest',
      login,
      logout,
    }),
    [userType],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
