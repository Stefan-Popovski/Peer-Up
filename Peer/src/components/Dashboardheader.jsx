import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import Brand from './Brand.jsx'
import ThemeToggle from './Themetoggle.jsx'
import LanguageToggle from './Languagetoggle.jsx'

export default function DashboardHeader({ roleLabel, name }) {
  const { signOut } = useAuth()
  const { t } = useLanguage()
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Brand size={24} />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-inkSoft hidden sm:inline mr-1">
            {name || 'You'} · {roleLabel}
          </span>
          <ThemeToggle />
          <LanguageToggle />
          <button onClick={signOut} className="rounded border border-line px-4 h-9 text-sm hover:bg-paperDim">
            {t('signOut')}
          </button>
        </div>
      </div>
    </header>
  )
}