import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/Supabaseclient'

export default function AuthPage() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  const { signIn, signUp, checkIsAdmin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    try {
      if (mode === 'signup') {
        // role is always 'student' here — mentor status is granted via the
        // approved_mentors list (see mentor_applications.sql), not chosen at signup.
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
      <div className="max-w-sm w-full rounded border border-line bg-paperDim p-6">
        <Link to="/" className="text-xs text-inkSoft hover:text-ink">
          ← back
        </Link>
        <h1 className="font-display font-semibold tracking-tight text-2xl mt-3">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h1>

        <div className="flex gap-4 text-sm mt-5 border-b border-line">
          <TabButton active={mode === 'signin'} onClick={() => setMode('signin')} label="Sign in" />
          <TabButton active={mode === 'signup'} onClick={() => setMode('signup')} label="Sign up" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-5">
          {mode === 'signup' && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              required
              className="rounded px-3 py-2 text-sm w-full"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="rounded px-3 py-2 text-sm w-full"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className="rounded px-3 py-2 text-sm w-full"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded px-5 py-2.5 text-sm font-medium w-full disabled:opacity-60"
            style={{ background: 'var(--gradient)', color: '#04252b' }}
          >
            {busy ? 'Please wait…' : mode === 'signup' ? 'Sign up' : 'Sign in'}
          </button>
        </form>

        {msg && (
          <p className="text-sm mt-3" style={{ color: msg.type === 'error' ? '#b3541e' : 'var(--teal-mid)' }}>
            {msg.text}
          </p>
        )}

        <p className="text-xs text-inkSoft mt-4">
          Want to teach instead?{' '}
          <Link to="/mentor-application" style={{ color: 'var(--teal-mid)' }}>
            Apply to be a mentor
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