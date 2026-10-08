import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { supabase } from '../lib/supabase'
import ThemeToggle from '../components/ThemeToggle.jsx'
import LanguageToggle from '../components/LanguageToggle.jsx'

export default function AuthPage() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  const { signIn, signUp, checkIsAdmin } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    try {
      if (mode === 'signup') {
        const { error } = await signUp({ email, password, fullName, role: 'student' })
        if (error) throw error
        setMsg({ type: 'ok', text: 'Check your email to confirm your account, then sign in.' })
        setMode('signin')
      } else {
        const { data, error } = await signIn({ email, password })
        if (error) throw error

        const admin = await checkIsAdmin(email)
        if (admin) {
          navigate('/admin')
          return
        }
        const { data: prof } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
        navigate(`/${prof?.role || 'student'}`)
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Something went wrong.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-sm w-full rounded-2xl border border-line bg-paperDim p-6 shadow-card">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xs text-inkSoft hover:text-ink">
            {t('back')}
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
        <h1 className="font-display font-semibold tracking-tight text-2xl mt-3 text-ink">
          {mode === 'signup' ? t('createAccount') : t('welcomeBack')}
        </h1>

        <div className="flex gap-4 text-sm mt-5 border-b border-line">
          <TabButton active={mode === 'signin'} onClick={() => setMode('signin')} label={t('signIn')} />
          <TabButton active={mode === 'signup'} onClick={() => setMode('signup')} label={t('signUp')} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-5">
          {mode === 'signup' && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('fullName')}
              required
              className="rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-inkSoft outline-none focus:border-accent focus:ring-1 focus:ring-accent w-full transition-all"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('email')}
            required
            className="rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-inkSoft outline-none focus:border-accent focus:ring-1 focus:ring-accent w-full transition-all"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('password')}
            required
            minLength={6}
            className="rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-inkSoft outline-none focus:border-accent focus:ring-1 focus:ring-accent w-full transition-all"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold w-full disabled:opacity-60 cursor-pointer shadow-soft hover:shadow-hover transition-all"
            style={{ background: 'var(--gradient)', color: '#071b3a' }}
          >
            {busy ? t('pleaseWait') : mode === 'signup' ? t('signUp') : t('signIn')}
          </button>
        </form>

        {msg && (
          <p className="text-sm mt-3" style={{ color: msg.type === 'error' ? '#b3541e' : 'var(--teal-mid)' }}>
            {msg.text}
          </p>
        )}

        <p className="text-xs text-inkSoft mt-4">
          {t('wantTeachInstead')}{' '}
          <Link to="/stani-mentor" style={{ color: 'var(--teal-mid)' }}>
            {t('applyMentor')}
          </Link>
        </p>
      </div>
    </div>
  )
}

function TabButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-display font-semibold tracking-tight text-lg pb-2 border-b-2"
      style={{ borderColor: active ? 'var(--teal-mid)' : 'transparent', color: active ? 'var(--ink)' : 'var(--ink-soft)' }}
    >
      {label}
    </button>
  )
}