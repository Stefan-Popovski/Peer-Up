import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import ThemeToggle from './Themetoggle.jsx'
import LanguageToggle from './Languagetoggle.jsx'
import { Link } from 'react-router-dom'
import { Button } from './ui/Button'

export default function DashboardHeader({ roleLabel, name }) {
  const { signOut } = useAuth()
  const { t } = useLanguage()
  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="PeerUp">
          <img src="/logo.svg" alt="PeerUp Logo" className="h-16 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            {name || 'You'} · {roleLabel}
          </span>
          <ThemeToggle />
          <LanguageToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="font-semibold text-muted-foreground hover:text-foreground border border-border rounded-full px-4"
          >
            {t('signOut')}
          </Button>
        </div>
      </div>
    </header>
  )
}