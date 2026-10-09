import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { supabase } from '../lib/supabase'
import ThemeToggle from '../components/ThemeToggle.jsx'
import LanguageToggle from '../components/LanguageToggle.jsx'
import { Button } from '../components/ui/Button'
import { ArrowLeft, AlertCircle } from 'lucide-react'

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
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-card">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-dark transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('back')}</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        {/* Brand Logo */}
        <div className="text-center mb-6">
          <img src="/logo.svg" alt="PeerUp Logo" className="h-16 w-auto mx-auto object-contain mb-3" />
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">
            {mode === 'signup' ? t('createAccount') : t('welcomeBack')}
          </h1>
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b border-border mb-6">
          <TabButton active={mode === 'signin'} onClick={() => setMode('signin')} label={t('signIn')} />
          <TabButton active={mode === 'signup'} onClick={() => setMode('signup')} label={t('signUp')} />
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-dark mb-1">
                {t('fullName')}
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('fullName')}
                required
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-dark mb-1">
              {t('email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('email')}
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark mb-1">
              {t('password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('password')}
              required
              minLength={6}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={busy}
            loading={busy}
            className="w-full font-bold shadow-none hover:shadow-none mt-2"
          >
            {busy ? t('pleaseWait') : mode === 'signup' ? t('signUp') : t('signIn')}
          </Button>
        </form>

        {msg && (
          <div
            className={`p-3.5 mt-4 rounded-xl text-xs flex items-center gap-2 ${
              msg.type === 'error'
                ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                : 'bg-primary/10 text-primary border border-primary/20'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{msg.text}</span>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            {t('wantTeachInstead')}{' '}
            <Link to="/stani-mentor-info" className="text-primary font-bold hover:underline">
              {t('applyMentor')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function TabButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 text-center py-2.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
        active
          ? 'border-primary text-primary'
          : 'border-transparent text-muted-foreground hover:text-dark'
      }`}
    >
      {label}
    </button>
  )
}