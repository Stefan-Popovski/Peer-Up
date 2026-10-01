import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/Supabaseclient'
import DashboardHeader from '../components/Dashboardheader.jsx'

export default function MentorDashboard() {
  const { user, profile } = useAuth()
  const [subjects, setSubjects] = useState([])
  const [subjectId, setSubjectId] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [rate, setRate] = useState('')
  const [requests, setRequests] = useState([])
  const [msg, setMsg] = useState(null)

  const load = async () => {
    const [{ data: subs }, { data: reqs }] = await Promise.all([
      supabase.from('subjects').select('*').order('name'),
      supabase
        .from('sessions')
        .select('id, status, created_at, subjects(name), learner:learner_id(full_name)')
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false }),
    ])
    setSubjects(subs || [])
    setRequests(reqs || [])
    if (subs && subs.length > 0 && !subjectId) setSubjectId(subs[0].id)
  }

  useEffect(() => {
    if (user) load()
  }, [user])

  const listSubject = async (e) => {
    e.preventDefault()
    setMsg(null)
    if (!subjectId) {
      setMsg({ type: 'error', text: 'Pick a subject.' })
      return
    }
    try {
      const { error } = await supabase.from('teacher_subjects').upsert(
        { teacher_id: user.id, subject_id: subjectId, level, hourly_rate: rate ? Number(rate) : null },
        { onConflict: 'teacher_id,subject_id' }
      )
      if (error) throw error
      const subjectName = subjects.find((s) => s.id === subjectId)?.name
      setMsg({ type: 'ok', text: `Listed ${subjectName}.` })
      setRate('')
      load()
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    }
  }

  const confirmRequest = async (id) => {
    await supabase.from('sessions').update({ status: 'confirmed' }).eq('id', id)
    load()
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader roleLabel="Mentor" name={profile?.full_name} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="font-display font-semibold tracking-tight text-2xl">Teach something</h1>
        <form onSubmit={listSubject} className="mt-6 grid sm:grid-cols-2 gap-4 max-w-xl">
          <div>
            <label className="text-xs text-inkSoft">Subject</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
              className="rounded px-3 py-2 text-sm mt-1 w-full"
            >
              {subjects.length === 0 && <option value="">No subjects available</option>}
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-inkSoft">Level you teach</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded px-3 py-2 text-sm mt-1 w-full">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-inkSoft">Rate — leave blank for a skill swap</label>
            <input
              type="number"
              min="0"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="$ per hour (optional)"
              className="rounded px-3 py-2 text-sm mt-1 w-full"
            />
          </div>
          <button
            type="submit"
            className="rounded px-5 py-2.5 text-sm font-medium w-fit"
            style={{ background: 'var(--gradient)', color: '#04252b' }}
          >
            List this subject
          </button>
        </form>
        {msg && (
          <p className="text-sm mt-3" style={{ color: msg.type === 'error' ? '#b3541e' : 'var(--teal-mid)' }}>
            {msg.text}
          </p>
        )}

        <h2 className="font-display font-semibold tracking-tight text-2xl mt-14">Requests</h2>
        <div className="mt-6 space-y-3">
          {requests.length === 0 && <p className="text-sm text-inkSoft">No requests yet.</p>}
          {requests.map((r) => (
            <div key={r.id} className="rounded border border-line bg-paperDim p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm font-medium">
                  {r.subjects?.name} with {r.learner?.full_name}
                </p>
                <p className="text-xs text-inkSoft mt-0.5">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full border border-line text-inkSoft">{r.status}</span>
                {r.status === 'pending' && (
                  <button
                    onClick={() => confirmRequest(r.id)}
                    className="rounded px-3 py-1.5 text-xs"
                    style={{ background: 'var(--gradient)', color: '#04252b' }}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}