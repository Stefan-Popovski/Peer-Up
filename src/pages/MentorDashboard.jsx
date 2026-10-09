import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { supabase } from '../lib/supabase'
import DashboardHeader from '../components/Dashboardheader.jsx'
import MonthCalendar from '../components/Monthcalendar.jsx'
import { Button } from '../components/ui/Button'
import { AlertCircle, Plus, Trash2, BookOpen, Calendar, Check, X } from 'lucide-react'

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
    <div className="min-h-screen bg-background">
      <DashboardHeader roleLabel={t('roleMentor')} name={profile?.full_name} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Teach Something Form */}
        <section className="mb-12">
          <h1 className="text-2xl md:text-3xl font-extrabold text-dark mb-6">
            {t('teachSomething')}
          </h1>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft max-w-xl">
            <form onSubmit={listSubject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">
                    {t('subject')}
                  </label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all cursor-pointer"
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
                  <label className="block text-xs font-semibold text-dark mb-1">
                    {t('levelYouTeach')}
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all cursor-pointer"
                  >
                    <option value="Beginner">{t('beginner')}</option>
                    <option value="Intermediate">{t('intermediate')}</option>
                    <option value="Advanced">{t('advanced')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark mb-1">
                  {t('rateLabel')}
                </label>
                <input
                  type="number"
                  min="0"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder={t('ratePlaceholder')}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                />
              </div>

              <Button type="submit" variant="default" size="sm" className="font-bold gap-1.5">
                <Plus className="w-4 h-4" />
                {t('listSubject')}
              </Button>
            </form>

            {msg && (
              <div
                className={`p-3 mt-4 rounded-xl text-xs flex items-center gap-2 ${
                  msg.type === 'error'
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                    : 'bg-primary/10 text-primary border border-primary/20'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{msg.text}</span>
              </div>
            )}
          </div>
        </section>

        {/* Availability Calendar & Slots */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-dark mb-2">
            {t('yourAvailability')}
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            {t('availabilityDesc')}
          </p>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft flex flex-col lg:flex-row gap-8 items-start">
            <MonthCalendar markedDays={markedDays} selected={selectedDay} onSelect={setSelectedDay} />

            <div className="flex-1 w-full">
              {selectedDay ? (
                <>
                  <form onSubmit={addSlot} className="flex flex-wrap items-end gap-3 p-4 rounded-xl bg-muted/40 border border-border/50">
                    <div>
                      <label className="block text-xs font-semibold text-dark mb-1">{t('starts')}</label>
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        className="rounded-xl border border-input bg-background px-3 py-2 text-sm text-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-dark mb-1">{t('ends')}</label>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        className="rounded-xl border border-input bg-background px-3 py-2 text-sm text-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                      />
                    </div>
                    <Button type="submit" variant="default" size="sm" className="font-bold h-10">
                      {t('addSlot')}
                    </Button>
                  </form>

                  {slotMsg && (
                    <p className="text-xs text-red-500 font-medium mt-2">{slotMsg.text}</p>
                  )}

                  <div className="mt-6 space-y-2">
                    {slotsForSelectedDay.length === 0 && (
                      <p className="text-xs text-muted-foreground">{t('noSlotsForDay')}</p>
                    )}
                    {slotsForSelectedDay.map((s) => (
                      <div
                        key={s.id}
                        className="rounded-xl border border-border bg-background p-3 flex items-center justify-between flex-wrap gap-2"
                      >
                        <span className="text-sm font-semibold text-dark">
                          {formatTime(s.start_time)}–{formatTime(s.end_time)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                              s.is_booked
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-muted text-muted-foreground border-border'
                            }`}
                          >
                            {s.is_booked ? t('booked') : t('open')}
                          </span>
                          {!s.is_booked && (
                            <button
                              onClick={() => deleteSlot(s.id)}
                              className="text-xs text-muted-foreground hover:text-red-500 transition-colors p-1"
                              aria-label="Remove slot"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-8 text-center border border-dashed border-border rounded-xl text-xs text-muted-foreground">
                  {t('pickADay')}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Requests Section */}
        <section>
          <h2 className="text-2xl font-extrabold text-dark mb-6">
            Booking Requests
          </h2>
          <div className="space-y-3">
            {requests.length === 0 ? (
              <div className="p-6 bg-card rounded-2xl border border-border text-sm text-muted-foreground">
                No session requests yet.
              </div>
            ) : (
              requests.map((r) => (
                <div key={r.id} className="bg-card rounded-2xl p-5 border border-border shadow-soft flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-sm font-bold text-dark">
                      {r.subjects?.name} — <span className="font-normal text-muted-foreground">Student: {r.learner?.full_name}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {r.availability ? formatSlot(r.availability) : new Date(r.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.status === 'pending' ? (
                      <>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => decideRequest(r, 'confirmed')}
                          className="gap-1.5 text-xs font-bold"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => decideRequest(r, 'denied')}
                          className="gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-3.5 h-3.5" />
                          Deny
                        </Button>
                      </>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                        {r.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </main>
    </div>
  )
}