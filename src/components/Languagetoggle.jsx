import { Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const isMk = language === 'mk'

  return (
    <button
      onClick={() => setLanguage(isMk ? 'en' : 'mk')}
      aria-label="Switch language"
      className="flex items-center gap-1.5 h-9 px-2 rounded-lg text-sm font-semibold hover:bg-muted/60 transition-colors"
    >
      <Globe className="w-4 h-4 text-foreground shrink-0" />
      <span className={isMk ? 'text-foreground' : 'text-muted-foreground'}>MK</span>
      <span className="text-muted-foreground font-normal">/</span>
      <span className={!isMk ? 'text-foreground' : 'text-muted-foreground'}>EN</span>
    </button>
  )
}