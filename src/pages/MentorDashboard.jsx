import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { supabase } from '../lib/supabase'
import DashboardHeader from '../components/DashboardHeader.jsx'
import MonthCalendar from '../components/Monthcalendar.jsx'

function toDateKey(iso) {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function MentorDashboard() {
  const { user, profile } = useAuth()
  const { t, formatSlot, formatTime } = useLanguage()
  const [subjects, setSubjects] = useState([])
  const [subjectId, setSubjectId] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [rate, setRate] = useState('')
  const [requests, setRequests] = useState([])
  const [slots, setSlots] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [msg, setMsg] = useState(null)
  const [slotMsg, setSlotMsg] = useState(null)

  const load = async () => {
    const [{ data: subs }, { data: reqs }, { data: avail }] = await Promise.all([
      supabase.from('subjects').select('*').order('name'),
      supabase
        .from('sessions')
        .select('id, status, created_at, subjects(name), learner:learner_id(full_name), availability(start_time, end_time)')
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('availability')
        .select('*')
        .eq('teacher_id', user.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time'),
    ])
    setSubjects(subs || [])
    setRequests(reqs || [])
    setSlots(avail || [])
    if (subs && subs.length > 0 && !subjectId) setSubjectId(subs[0].id)
  }

  useEffect(() => {
    if (user) load()
  }, [user])

  const markedDays = useMemo(() => {
    const marks = {}
    for (const s of slots) {
      const key = toDateKey(s.start_time)
      if (!s.is_booked) marks[key] = 'open'
      else if (!marks[key]) marks[key] = 'booked'
    }
    return marks
  }, [slots])

  const slotsForSelectedDay = useMemo(
    () => (selectedDay ? slots.filter((s) => toDateKey(s.start_time) === selectedDay) : []),
    [slots, selectedDay]
  )

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

  const addSlot = async (e) => {
    e.preventDefault()
    setSlotMsg(null)
    if (!selectedDay || !startTime || !endTime) return
    const start = new Date(`${selectedDay}T${startTime}`)
    const end = new Date(`${selectedDay}T${endTime}`)
    if (end <= start) {
      setSlotMsg({ type: 'error', text: 'End time must be after start time.' })
      return
    }
    const { error } = await supabase
      .from('availability')
      .insert({ teacher_id: user.id, start_time: start.toISOString(), end_time: end.toISOString() })
    if (error) {
      setSlotMsg({ type: 'error', text: error.message })
      return
    }
    setStartTime('')
    setEndTime('')
    load()
  }

  const deleteSlot = async (id) => {
    await supabase.from('availability').delete().eq('id', id)
    load()
  }

  const decideRequest = async (r, status) => {
    await supabase.from('sessions').update({ status }).eq('id', r.id)
    if (status === 'denied' && r.availability_id) {
      await supabase.from('availability').update({ is_booked: false }).eq('id', r.availability_id)
    }
    load()
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader roleLabel={t('roleMentor')} name={profile?.full_name} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="font-display font-semibold tracking-tight text-2xl">{t('teachSomething')}</h1>
        <form onSubmit={listSubject} className="mt-6 grid sm:grid-cols-2 gap-4 max-w-xl">
          <div>
            <label className="text-xs text-inkSoft">{t('subject')}</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
              className="rounded px-3 py-2 text-sm mt-1 w-full"
            >
              {subjects.length === 0 && <option value="">—</option>}
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-inkSoft">{t('levelYouTeach')}</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded px-3 py-2 text-sm mt-1 w-full">
              <option value="Beginner">{t('beginner')}</option>
              <option value="Intermediate">{t('intermediate')}</option>
              <option value="Advanced">{t('advanced')}</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-inkSoft">{t('rateLabel')}</label>
            <input
              type="number"
              min="0"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder={t('ratePlaceholder')}
              className="rounded px-3 py-2 text-sm mt-1 w-full"
            />
          </div>
          <button
            type="submit"
            className="rounded px-5 py-2.5 text-sm font-medium w-fit"
            style={{ background: 'var(--gradient)', color: '#04252b' }}
          >
            {t('listSubject')}
          </button>
        </form>
        {msg && (
          <p className="text-sm mt-3" style={{ color: msg.type === 'error' ? '#b3541e' : 'var(--teal-mid)' }}>
            {msg.text}
          </p>
        )}

        <h2 className="font-display font-semibold tracking-tight text-2xl mt-14">{t('yourAvailability')}</h2>
        <p className="text-sm text-inkSoft mt-2">{t('availabilityDesc')}</p>

        <div className="mt-5 flex flex-col lg:flex-row gap-6 items-start">
          <MonthCalendar markedDays={markedDays} selected={selectedDay} onSelect={setSelectedDay} />

          <div className="flex-1 w-full">
            {selectedDay ? (
              <>
                <form onSubmit={addSlot} className="flex flex-wrap items-end gap-3">
                  <div>
                    <label className="text-xs text-inkSoft">{t('starts')}</label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="rounded px-3 py-2 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-inkSoft">{t('ends')}</label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="rounded px-3 py-2 text-sm mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded px-4 py-2 text-sm font-medium"
                    style={{ background: 'var(--gradient)', color: '#04252b' }}
                  >
                    {t('addSlot')}
                  </button>
                </form>
                {slotMsg && (
                  <p className="text-sm mt-2" style={{ color: '#b3541e' }}>
                    {slotMsg.text}
                  </p>
                )}

                <div className="mt-5 space-y-2">
                  {slotsForSelectedDay.length === 0 && <p className="text-sm text-inkSoft">{t('noSlotsForDay')}</p>}
                  {slotsForSelectedDay.map((s) => (
                    <div
                      key={s.id}
                      className="rounded border border-line bg-paperDim p-3 flex items-center justify-between flex-wrap gap-2"
                    >
                      <span className="text-sm">
                        {formatTime(s.start_time)}–{formatTime(s.end_time)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs px-2 py-1 rounded-full border border-line"
                          style={{ color: s.is_booked ? 'var(--teal-mid)' : 'var(--ink-soft)' }}
                        >
                          {s.is_booked ? t('booked') : t('open')}
                        </span>
                        {!s.is_booked && (
                          <button onClick={() => deleteSlot(s.id)} className="text-xs text-inkSoft hover:text-ink">
                            {t('remove')}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-inkSoft">{t('pickADay')}</p>
            )}
          </div>
        </div>

        <h2 className="font-display font-semibold tracking-tight text-2xl mt-14">{t('requests')}</h2>
        <div className="mt-6 space-y-3">
          {requests.length === 0 && <p className="text-sm text-inkSoft">{t('noRequestsYet')}</p>}
          {requests.map((r) => (
            <div key={r.id} className="rounded border border-line bg-paperDim p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm font-medium">
                  {r.subjects?.name} with {r.learner?.full_name}
                </p>
                <p className="text-xs text-inkSoft mt-0.5">
                  {r.availability ? formatSlot(r.availability) : new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full border border-line text-inkSoft">{r.status}</span>
                {r.status === 'pending' && (
                  <>
                    <button
                      onClick={() => decideRequest(r, 'confirmed')}
                      className="rounded px-3 py-1.5 text-xs"
                      style={{ background: 'var(--gradient)', color: '#04252b' }}
                    >
                      {t('confirm')}
                    </button>
                    <button
                      onClick={() => decideRequest(r, 'denied')}
                      className="rounded border border-line px-3 py-1.5 text-xs hover:bg-paper"
                    >
                      {t('deny')}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}