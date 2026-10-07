import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return localStorage.getItem('peerup-lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('peerup-lang', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key) => translations[language]?.[key] ?? translations.en[key] ?? key

  // en-GB and mk-MK both render day before month (e.g. 7/10/2026, not 10/7/2026).
  const locale = language === 'mk' ? 'mk-MK' : 'en-GB'

  const formatDate = (date) => new Date(date).toLocaleDateString(locale)
  const formatTime = (date) => new Date(date).toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' })
  const formatSlot = (slot) => `${formatDate(slot.start_time)} · ${formatTime(slot.start_time)}–${formatTime(slot.end_time)}`

  const value = { language, setLanguage, t, locale, formatDate, formatTime, formatSlot }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}