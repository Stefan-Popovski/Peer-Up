import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { supabase } from '../lib/Supabaseclient'
import Brand from '../components/Brand.jsx'
import ThemeToggle from '../components/Themetoggle.jsx'
import LanguageToggle from '../components/Languagetoggle.jsx'

export default function AdminPanel() {
  const { signOut } = useAuth()
  const { t, formatSlot } = useLanguage()
  const [pending, setPending] = useState([])
  const [allSessions, setAllSessions] = useState([])
  const [admins, setAdmins] = useState([])
  const [mentorApps, setMentorApps] = useState([])
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const [{ data: sessions }, { data: adminList }, { data: applications }] = await Promise.all([
      supabase
        .from('sessions')
        .select(
          'id, status, created_at, availability_id, subjects(name), teacher:teacher_id(full_name, email), learner:learner_id(full_name, email), availability(start_time, end_time)'
        )
        .order('created_at', { ascending: false }),
      supabase.from('admin_emails').select('email, added_at').order('added_at'),
      supabase.from('mentor_applications').select('*').order('created_at', { ascending: false }),
    ])
    setAllSessions(sessions || [])
    setPending((sessions || []).filter((s) => s.status === 'pending'))
    setAdmins(adminList || [])
    setMentorApps(applications || [])
    setLoading(false)
  }

  const decideApplication = async (app, decision) => {
    await supabase.from('mentor_applications').update({ status: decision }).eq('id', app.id)
    if (decision === 'accepted') {
      // Grant mentor status: add to the approved list, and if they already
      // have an account (signed up as a student before applying), upgrade it now.
      await supabase.from('approved_mentors').insert({ email: app.email })
      await supabase.from('profiles').update({ role: 'mentor' }).eq('email', app.email)
    }
    load()
  }

  useEffect(() => {
    load()
  }, [])

  const setStatus = async (session, status) => {
    await supabase.from('sessions').update({ status }).eq('id', session.id)
    if (status === 'denied' && session.availability_id) {
      await supabase.from('availability').update({ is_booked: false }).eq('id', session.availability_id)
    }
    load()
  }

  const addAdmin = async (e) => {
    e.preventDefault()
    setMsg(null)
    const email = newAdminEmail.trim().toLowerCase()
    if (!email) return
    const { error } = await supabase.from('admin_emails').insert({ email })
    if (error) {
      setMsg({ type: 'error', text: error.message })
    } else {
      setMsg({ type: 'ok', text: `${email} can now sign in as an admin.` })
      setNewAdminEmail('')
      load()
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brand size={24} />
            <span className="text-xs px-2 py-1 rounded-full border border-line text-inkSoft">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/student" className="rounded border border-line px-4 py-2 text-sm hover:bg-paperDim">
              {t('studentPanel')}
            </Link>
            <Link to="/mentor" className="rounded border border-line px-4 py-2 text-sm hover:bg-paperDim">
              {t('mentorPanel')}
            </Link>
            <ThemeToggle />
            <LanguageToggle />
            <button onClick={signOut} className="rounded border border-line px-4 h-9 text-sm hover:bg-paperDim">
              {t('signOut')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="font-display font-semibold tracking-tight text-2xl">{t('mentorApplications')}</h1>
        {loading ? (
          <p className="text-sm text-inkSoft mt-4">{t('loading')}</p>
        ) : mentorApps.filter((a) => a.status === 'pending').length === 0 ? (
          <p className="text-sm text-inkSoft mt-4">{t('noPendingApplications')}</p>
        ) : (
          <div className="mt-6 space-y-3">
            {mentorApps
              .filter((a) => a.status === 'pending')
              .map((a) => (
                <div key={a.id} className="rounded border border-line bg-paperDim p-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="text-sm font-medium">
                        {a.full_name} — {a.email} — {a.phone}
                      </p>
                      <p className="text-xs text-inkSoft mt-0.5">{new Date(a.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decideApplication(a, 'accepted')}
                        className="rounded px-3 py-1.5 text-xs"
                        style={{ background: 'var(--teal-mid)', color: '#F1FBF7' }}
                      >
                        {t('accept')}
                      </button>
                      <button
                        onClick={() => decideApplication(a, 'denied')}
                        className="rounded border border-line px-3 py-1.5 text-xs hover:bg-paper"
                      >
                        {t('deny')}
                      </button>
                    </div>
                  </div>
                  {a.experience && <p className="text-sm text-inkSoft mt-3">{a.experience}</p>}
                </div>
              ))}
          </div>
        )}

        <h2 className="font-display font-semibold tracking-tight text-2xl mt-14">{t('pendingSessionRequests')}</h2>
        {loading ? (
          <p className="text-sm text-inkSoft mt-4">{t('loading')}</p>
        ) : pending.length === 0 ? (
          <p className="text-sm text-inkSoft mt-4">{t('nothingPending')}</p>
        ) : (
          <div className="mt-6 space-y-3">
            {pending.map((s) => (
              <div key={s.id} className="rounded border border-line bg-paperDim p-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-sm font-medium">
                    {s.subjects?.name} — {s.learner?.full_name} ({s.learner?.email}) with {s.teacher?.full_name} ({s.teacher?.email})
                  </p>
                  <p className="text-xs text-inkSoft mt-0.5">
                    {s.availability ? formatSlot(s.availability) : new Date(s.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStatus(s, 'confirmed')}
                    className="rounded px-3 py-1.5 text-xs"
                    style={{ background: 'var(--teal-mid)', color: '#F1FBF7' }}
                  >
                    {t('accept')}
                  </button>
                  <button
                    onClick={() => setStatus(s, 'denied')}
                    className="rounded border border-line px-3 py-1.5 text-xs hover:bg-paper"
                  >
                    {t('deny')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="font-display font-semibold tracking-tight text-2xl mt-14">{t('allSessions')}</h2>
        <div className="mt-6 space-y-2">
          {allSessions.map((s) => (
            <div key={s.id} className="text-sm flex items-center justify-between border-b border-line py-2">
              <span>
                {s.subjects?.name} — {s.learner?.full_name} → {s.teacher?.full_name}
              </span>
              <span className="text-xs px-2 py-1 rounded-full border border-line text-inkSoft">{s.status}</span>
            </div>
          ))}
        </div>

        <h2 className="font-display font-semibold tracking-tight text-2xl mt-14">{t('admins')}</h2>
        <ul className="mt-4 text-sm space-y-1">
          {admins.map((a) => (
            <li key={a.email} className="text-inkSoft">
              {a.email}
            </li>
          ))}
        </ul>
        <form onSubmit={addAdmin} className="mt-5 flex gap-2 max-w-md">
          <input
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            placeholder="new-admin@example.com"
            required
            className="rounded px-3 py-2 text-sm flex-1"
          />
          <button
            type="submit"
            className="rounded px-4 py-2 text-sm font-medium"
            style={{ background: 'var(--gradient)', color: '#04252b' }}
          >
            Add admin
          </button>
        </form>
        {msg && (
          <p className="text-sm mt-3" style={{ color: msg.type === 'error' ? '#b3541e' : 'var(--teal-mid)' }}>
            {msg.text}
          </p>
        )}
        <p className="text-xs text-inkSoft mt-2">
          {t('adminNote')}
        </p>
      </main>
    </div>
  )
}