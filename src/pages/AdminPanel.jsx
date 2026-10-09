import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { supabase } from '../lib/supabase'
import ThemeToggle from '../components/Themetoggle.jsx'
import LanguageToggle from '../components/Languagetoggle.jsx'
import { Button } from '../components/ui/Button'
import { ShieldCheck, Check, X, UserPlus, AlertCircle } from 'lucide-react'

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
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2" aria-label="PeerUp">
              <img src="/logo.svg" alt="PeerUp Logo" className="h-16 w-auto object-contain" />
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/student">
              <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground hover:text-foreground">
                {t('studentPanel')}
              </Button>
            </Link>
            <Link to="/mentor">
              <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground hover:text-foreground">
                {t('mentorPanel')}
              </Button>
            </Link>
            <ThemeToggle />
            <LanguageToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="font-semibold text-muted-foreground hover:text-foreground border border-border rounded-full px-4"
            >
              {t('signOut')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Mentor Applications Section */}
        <section className="mb-12">
          <h1 className="text-2xl md:text-3xl font-extrabold text-dark mb-6">
            {t('mentorApplications')}
          </h1>

          {loading ? (
            <p className="text-sm text-muted-foreground">{t('loading')}</p>
          ) : mentorApps.filter((a) => a.status === 'pending').length === 0 ? (
            <div className="p-6 bg-card rounded-2xl border border-border text-sm text-muted-foreground">
              {t('noPendingApplications')}
            </div>
          ) : (
            <div className="space-y-4">
              {mentorApps
                .filter((a) => a.status === 'pending')
                .map((a) => (
                  <div key={a.id} className="bg-card rounded-2xl p-5 border border-border shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-dark">
                        {a.first_name || a.full_name} {a.last_name || ''} — <span className="text-muted-foreground font-normal">{a.email}</span> — <span className="text-muted-foreground font-normal">{a.phone}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(a.created_at).toLocaleString()}
                      </p>
                      {a.education && (
                        <p className="text-xs text-dark/80 pt-1">
                          <span className="font-semibold">Образование:</span> {a.education}
                        </p>
                      )}
                      {a.subjects && a.subjects.length > 0 && (
                        <p className="text-xs text-dark/80">
                          <span className="font-semibold">Предмети:</span> {Array.isArray(a.subjects) ? a.subjects.join(', ') : a.subjects}
                        </p>
                      )}
                      {a.achievements && (
                        <p className="text-xs text-muted-foreground italic pt-1">
                          &ldquo;{a.achievements}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => decideApplication(a, 'accepted')}
                        className="gap-1.5 text-xs font-bold"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {t('accept')}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => decideApplication(a, 'denied')}
                        className="gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                        {t('deny')}
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Pending Session Requests */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-dark mb-6">
            {t('pendingSessionRequests')}
          </h2>

          {loading ? (
            <p className="text-sm text-muted-foreground">{t('loading')}</p>
          ) : pending.length === 0 ? (
            <div className="p-6 bg-card rounded-2xl border border-border text-sm text-muted-foreground">
              {t('nothingPending')}
            </div>
          ) : (
            <div className="space-y-3">
              {pending.map((s) => (
                <div key={s.id} className="bg-card rounded-2xl p-5 border border-border shadow-soft flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm font-bold text-dark">
                      {s.subjects?.name} — <span className="font-normal text-muted-foreground">{s.learner?.full_name} ({s.learner?.email})</span> with <span className="font-normal text-muted-foreground">{s.teacher?.full_name} ({s.teacher?.email})</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {s.availability ? formatSlot(s.availability) : new Date(s.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => setStatus(s, 'confirmed')}
                      className="gap-1.5 text-xs font-bold"
                    >
                      <Check className="w-3.5 h-3.5" />
                      {t('accept')}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setStatus(s, 'denied')}
                      className="gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3.5 h-3.5" />
                      {t('deny')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* All Sessions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-dark mb-6">
            {t('allSessions')}
          </h2>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-soft divide-y divide-border">
            {allSessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('nothingYetBook')}</p>
            ) : (
              allSessions.map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-dark">
                    {s.subjects?.name} — <span className="text-muted-foreground font-normal">{s.learner?.full_name} → {s.teacher?.full_name}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                    {s.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Admins Management Section */}
        <section>
          <h2 className="text-2xl font-extrabold text-dark mb-4">
            {t('admins')}
          </h2>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft max-w-xl">
            <ul className="space-y-2 mb-6 text-sm">
              {admins.map((a) => (
                <li key={a.email} className="flex items-center gap-2 text-dark font-medium">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>{a.email}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={addAdmin} className="flex gap-2">
              <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="new-admin@example.com"
                required
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all flex-1"
              />
              <Button type="submit" variant="default" size="sm" className="gap-1.5 font-bold">
                <UserPlus className="w-4 h-4" />
                Add admin
              </Button>
            </form>

            {msg && (
              <div className={`p-3 mt-4 rounded-xl text-xs flex items-center gap-2 ${
                msg.type === 'error'
                  ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                  : 'bg-primary/10 text-primary border border-primary/20'
              }`}>
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{msg.text}</span>
              </div>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              {t('adminNote')}
            </p>
          </div>
        </section>

      </main>
    </div>
  )
}