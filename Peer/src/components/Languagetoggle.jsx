import { useLanguage } from '../context/LanguageContext.jsx'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'mk' : 'en')}
      aria-label="Switch language"
      className="rounded border border-line h-9 px-3 flex items-center justify-center text-xs font-medium hover:bg-paperDim"
    >
      {language === 'en' ? 'MK' : 'EN'}
    </button>
  )
}