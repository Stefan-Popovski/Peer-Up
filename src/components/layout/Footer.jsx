import { Link } from 'react-router-dom'
import { MapPin, Mail, ArrowUp } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#071b3a] text-white/90 py-16 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div>
            <Link to="/" className="inline-block -mt-5 -ml-1" aria-label="PeerUp">
              <img
                src="/logo.svg"
                alt="PeerUp Logo"
                className="h-20 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              {t('footerTagline')}
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60 pt-4">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{t('footerCity')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t('footerExplore')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/kako-raboti" className="text-white/70 hover:text-accent transition-colors">
                  {t('footerHowItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/predmeti" className="text-white/70 hover:text-accent transition-colors">
                  {t('footerSubjects')}
                </Link>
              </li>
              <li>
                <Link to="/ceni" className="text-white/70 hover:text-accent transition-colors">
                  {t('footerPricing')}
                </Link>
              </li>
              <li>
                <Link to="/mentori" className="text-white/70 hover:text-accent transition-colors">
                  {t('footerMentors')}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Mentors */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t('footerForMentors')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/stani-mentor" className="text-white/70 hover:text-accent transition-colors">
                  {t('footerBecomeMentor')}
                </Link>
              </li>
              <li>
                <Link to="/stani-mentor" className="text-white/70 hover:text-accent transition-colors">
                  {t('footerEarnings')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-accent transition-colors">
                  {t('footerFaq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t('footerSupport')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/faq" className="text-white/70 hover:text-accent transition-colors">
                  {t('footerFaqCenter')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-accent transition-colors">
                  {t('footerContact')}
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:contact@peerup.mk"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  info@peerup.mk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} PeerUp. {t('footerRights')}</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-accent transition-colors">
              {t('footerTerms')}
            </Link>
            <Link to="/privacy" className="hover:text-accent transition-colors">
              {t('footerPrivacy')}
            </Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-accent transition-colors cursor-pointer"
            >
              {t('footerBackToTop')} <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
