import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      const stored = localStorage.getItem('peerup-theme')
      if (stored === 'dark' || stored === 'light') return stored
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('peerup-theme', theme)
    } catch (e) {
      console.warn('Could not save theme preference to localStorage', e)
    }
  }, [theme])

  // Listen to system OS preference changes if user hasn't explicitly set preference
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = (e) => {
      try {
        const stored = localStorage.getItem('peerup-theme')
        if (!stored) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      } catch {}
    }
    mq.addEventListener('change', handleSystemChange)
    return () => mq.removeEventListener('change', handleSystemChange)
  }, [])

  const toggleTheme = () => {
    // Enable buttery smooth CSS transition during toggle without causing FOUC on load
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('theme-transition')
      window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition')
      }, 350)
    }
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}