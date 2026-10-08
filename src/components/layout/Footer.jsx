import { Link } from 'react-router-dom'
import { MapPin, Mail, ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark text-white/90 py-16 border-t border-dark/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="inline-block" aria-label="PeerUp">
              <img
                src="/logo.svg"
                alt="PeerUp Logo"
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Првата peer-to-peer tutoring платформа во Македонија. Поврзуваме ученици со млади ментори за квалитетно, пријателско и достапно учење.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60 pt-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Скопје, Македонија</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Истражи
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/kako-raboti" className="text-white/70 hover:text-accent transition-colors">
                  Како функционира
                </Link>
              </li>
              <li>
                <Link to="/predmeti" className="text-white/70 hover:text-accent transition-colors">
                  Предмети и области
                </Link>
              </li>
              <li>
                <Link to="/ceni" className="text-white/70 hover:text-accent transition-colors">
                  Цени и пакети
                </Link>
              </li>
              <li>
                <Link to="/mentori" className="text-white/70 hover:text-accent transition-colors">
                  Верифицирани ментори
                </Link>
              </li>
            </ul>
          </div>

          {/* For Mentors */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              За ментори
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/stani-mentor" className="text-white/70 hover:text-accent transition-colors">
                  Стани ментор
                </Link>
              </li>
              <li>
                <Link to="/stani-mentor" className="text-white/70 hover:text-accent transition-colors">
                  Заработка и бенефити
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-accent transition-colors">
                  Често поставувани прашања
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Поддршка
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/faq" className="text-white/70 hover:text-accent transition-colors">
                  FAQ центар
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-accent transition-colors">
                  Контактирај нè
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:contact@peerup.mk"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  contact@peerup.mk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} PeerUp. Сите права задржани.</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-accent transition-colors">
              Услови за користење
            </Link>
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Политика за приватност
            </Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-accent transition-colors cursor-pointer"
            >
              На врв <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
