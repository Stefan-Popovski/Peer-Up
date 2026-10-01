import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/Supabaseclient'
import DashboardHeader from '../components/Dashboardheader.jsx'

export default function StudentDashboard() {
  const { user, profile } = useAuth()
  const [mentors, setMentors] = useState([])
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: m }, { data: s }] = await Promise.all([
        supabase
          .from('teacher_subjects')
          .select('id, level, hourly_rate, teacher_id, subject_id, profiles(full_name, bio), subjects(name)')
          .limit(20),
        supabase
          .from('sessions')
          .select('id, status, created_at, subjects(name), teacher:teacher_id(full_name)')
          .eq('learner_id', user.id)
          .order('created_at', { ascending: false }),
      ])
      setMentors(m || [])
      setSessions(s || [])
      setLoading(false)
    }
    if (user) load()
  }, [user])

  const requestSession = async (teacherId, subjectId) => {
    await supabase.from('sessions').insert({ teacher_id: teacherId, learner_id: user.id, subject_id: subjectId, status: 'pending' })
    const { data } = await supabase
      .from('sessions')
      .select('id, status, created_at, subjects(name), teacher:teacher_id(full_name)')
      .eq('learner_id', user.id)
      .order('created_at', { ascending: false })
    setSessions(data || [])
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader roleLabel="Student" name={profile?.full_name} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="font-display font-semibold tracking-tight text-2xl">Find a mentor</h1>
        {loading ? (
          <p className="text-sm text-inkSoft mt-4">Loading…</p>
        ) : mentors.length === 0 ? (
          <p className="text-sm text-inkSoft mt-4">No mentors have listed a subject yet.</p>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentors.map((row) => (
              <div key={row.id} className="rounded border border-line bg-paperDim p-5 flex flex-col">
                <p className="font-display font-semibold tracking-tight text-lg">{row.subjects?.name}</p>
                <p className="text-sm text-inkSoft mt-1">
                  {row.profiles?.full_name} · {row.level}
                </p>
                <p className="text-sm text-inkSoft mt-2 flex-1">{row.profiles?.bio?.slice(0, 90) || 'No bio yet.'}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm" style={{ color: 'var(--teal-mid)' }}>
                    {row.hourly_rate ? `$${row.hourly_rate}/hr` : 'Skill swap'}
                  </span>
                  <button
                    onClick={() => requestSession(row.teacher_id, row.subject_id)}
                    className="rounded border border-line px-3 py-1.5 text-xs hover:bg-paper"
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="font-display font-semibold tracking-tight text-2xl mt-14">My requests</h2>
        <div className="mt-6 space-y-3">
          {sessions.length === 0 && <p className="text-sm text-inkSoft">Nothing yet — request a session above.</p>}
          {sessions.map((s) => (
            <div key={s.id} className="rounded border border-line bg-paperDim p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm font-medium">
                  {s.subjects?.name} with {s.teacher?.full_name}
                </p>
                <p className="text-xs text-inkSoft mt-0.5">{new Date(s.created_at).toLocaleDateString()}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full border border-line text-inkSoft">{s.status}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}