import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/Supabaseclient'
import { useLanguage } from '../context/LanguageContext.jsx'
import ThemeToggle from '../components/Themetoggle.jsx'
import LanguageToggle from '../components/Languagetoggle.jsx'

export default function MentorApplication() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [experience, setExperience] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const { error } = await supabase.from('mentor_applications').insert({
      full_name: fullName,
      email,
      phone,
      experience,
    })
    setBusy(false)
    if (error) {
      setMsg({ type: 'error', text: error.message })
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="max-w-sm w-full rounded border border-line bg-paperDim p-6 text-center">
          <h1 className="font-display font-semibold tracking-tight text-2xl">{t('thanks')}</h1>
          <p className="text-sm text-inkSoft mt-3">
            {t('applicationSent')} {email}.
          </p>
          <Link to="/" className="inline-block mt-5 text-sm" style={{ color: 'var(--teal-mid)' }}>
            {t('backHome')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="max-w-sm w-full rounded border border-line bg-paperDim p-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xs text-inkSoft hover:text-ink">
            {t('back')}
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
        <h1 className="font-display font-semibold tracking-tight text-2xl mt-3">{t('wantMentor')}</h1>
        <p className="text-sm text-inkSoft mt-2">{t('wantMentorDesc')}</p>

        <form onSubmit={handleSubmit} className="space-y-3 mt-5">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t('fullName')}
            required
            className="rounded px-3 py-2 text-sm w-full"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('email')}
            required
            className="rounded px-3 py-2 text-sm w-full"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('phone')}
            required
            className="rounded px-3 py-2 text-sm w-full"
          />
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder={t('experiencePlaceholder')}
            required
            rows={4}
            className="rounded px-3 py-2 text-sm w-full resize-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded px-5 py-2.5 text-sm font-medium w-full disabled:opacity-60"
            style={{ background: 'var(--gradient)', color: '#04252b' }}
          >
            {busy ? t('sending') : t('submitApplication')}
          </button>
        </form>

        {msg && (
          <p className="text-sm mt-3" style={{ color: '#b3541e' }}>
            {msg.text}
          </p>
        )}
      </div>
    </div>
  )
}