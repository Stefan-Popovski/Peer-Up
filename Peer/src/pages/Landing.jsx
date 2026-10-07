import { Link } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import ThemeToggle from '../components/Themetoggle.jsx'
import LanguageToggle from '../components/Languagetoggle.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Landing() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto w-full px-5 py-6 flex items-center justify-between">
        <Brand />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 py-10 flex flex-col justify-center">
        <div className="max-w-lg">
          <h1 className="font-display font-semibold text-4xl sm:text-5xl leading-[1.08] tracking-tight">
            {t('heroTitle1')}
            <br />
            <span className="gradient-text">{t('heroTitle2')}</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-inkSoft">{t('heroSubtitle')}</p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-xl">
          <Link to="/auth" className="flex-1 inline-flex flex-col rounded-xl p-6 gradient-btn shadow-sm">
            <span className="font-display font-semibold text-xl">{t('signInUp')}</span>
            <span className="text-sm mt-2" style={{ color: '#04252bcc' }}>
              {t('signInUpDesc')}
            </span>
          </Link>

          <Link
            to="/mentor-application"
            className="flex-1 inline-flex flex-col rounded-xl border border-line bg-paperDim p-6 hover:border-tealMid transition-colors"
          >
            <span className="font-display font-semibold text-xl">{t('wantMentor')}</span>
            <span className="text-sm text-inkSoft mt-2">{t('wantMentorDesc')}</span>
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs text-inkSoft py-8">{t('footer')}</footer>
    </div>
  )
}