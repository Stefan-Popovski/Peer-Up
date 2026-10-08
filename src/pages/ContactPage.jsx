import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle2, ShieldAlert, Send, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 600))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>{t('contactBadge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-4 leading-tight max-w-3xl mx-auto">
            {t('contactTitle')} <span className="text-gradient">{t('contactTitleHighlight')}</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            {t('contactSubtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-soft">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-green mx-auto" />
                <h2 className="text-2xl font-bold text-dark">{t('contactSent')}</h2>
                <p className="text-sm text-muted-foreground">
                  {t('contactSentDesc')}
                </p>
                <Button variant="default" onClick={() => setSubmitted(false)} className="mt-4">
                  {t('contactSendNew')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-dark mb-4">{t('contactFormTitle')}</h2>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">
                    {t('contactNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('contactNamePlaceholder')}
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">
                    {t('contactEmailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('contactEmailPlaceholder')}
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">
                    {t('contactMessageLabel')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contactMessagePlaceholder')}
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full mt-2"
                  loading={sending}
                  disabled={!name || !email || !message}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t('contactSendBtn')}
                </Button>
              </form>
            )}
          </div>

          {/* Info cards */}
          <div className="space-y-6">
            <div className="bg-card rounded-3xl p-6 border border-border shadow-soft flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">{t('contactEmailDirectLabel')}</p>
                <a href="mailto:contact@peerup.mk" className="text-base font-bold text-dark hover:text-primary transition-colors">
                  info@peerup.mk
                </a>
              </div>
            </div>

            <div className="bg-dark/5 border border-dark/15 rounded-3xl p-6 text-dark">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-dark mb-1">{t('contactSafetyTitle')}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {t('contactSafetyDesc')}
                  </p>
                  <Link to="/report">
                    <Button variant="default" size="sm">
                      {t('contactReportBtn')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
