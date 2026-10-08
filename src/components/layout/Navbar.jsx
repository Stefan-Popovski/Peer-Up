import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import LanguageToggle from '../LanguageToggle'
import ThemeToggle from '../Themetoggle'
import { useLanguage } from '../../context/LanguageContext'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()

  const navLinks = [
    { to: '/kako-raboti', labelKey: 'navHowItWorks' },
    { to: '/predmeti',    labelKey: 'navSubjects' },
    { to: '/ceni',        labelKey: 'navPricing' },
    { to: '/mentori',     labelKey: 'navMentors' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        'bg-card/85 backdrop-blur-lg border-b border-border/80',
        scrolled ? 'shadow-sm shadow-black/5' : ''
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="PeerUp"
          >
            <img
              src="/logo.svg"
              alt="PeerUp Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-foreground',
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground'
                  )
                }
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
          </div>

          {/* Right Header Area */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
            <Link to="/auth">
              <Button
                variant="ghost"
                size="sm"
                className="font-semibold text-muted-foreground hover:text-foreground border border-border rounded-full px-5"
              >
                {t('navSignIn')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground hover:text-primary rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={t('openMenu')}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'py-2 px-3 rounded-lg text-base font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )
                }
              >
                {t(link.labelKey)}
              </NavLink>
            ))}

            <div className="border-t border-border pt-3 mt-1 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <Link to="/auth" className="w-full">
                <Button variant="ghost" className="w-full justify-center border border-border rounded-full">
                  {t('navSignIn')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
