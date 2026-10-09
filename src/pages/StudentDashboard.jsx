import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { supabase } from '../lib/supabase'
import DashboardHeader from '../components/Dashboardheader.jsx'
import MonthCalendar from '../components/Monthcalendar.jsx'
import { Button } from '../components/ui/Button'
import { AlertCircle, Calendar, CheckCircle2, Search, Clock } from 'lucide-react'

function toDateKey(iso) {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function StudentDashboard() {
  const { user, profile } = useAuth()
  const { t, formatSlot, formatTime } = useLanguage()
  const [mentors, setMentors] = useState([])
  const [sessions, setSessions] = useState([])
  const [openRow, setOpenRow] = useState(null)
  const [slotsByTeacher, setSlotsByTeacher] = useState({})
  const [selectedDayByTeacher, setSelectedDayByTeacher] = useState({})
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState(null)

  const loadMentorsAndSessions = async () => {
    const [{ data: m }, { data: s }] = await Promise.all([
      supabase
        .from('teacher_subjects')
        .select('id, level, hourly_rate, teacher_id, subject_id, profiles(full_name, bio), subjects(name)')
        .limit(20),
      supabase
        .from('sessions')
        .select('id, status, created_at, subjects(name), teacher:teacher_id(full_name), availability(start_time, end_time)')
        .eq('learner_id', user.id)
        .order('created_at', { ascending: false }),
    ])
    setMentors(m || [])
    setSessions(s || [])
    setLoading(false)
  }

  useEffect(() => {
    if (user) loadMentorsAndSessions()
  }, [user])

  const toggleSlots = async (row) => {
    if (openRow === row.id) {
      setOpenRow(null)
      return
    }
    setOpenRow(row.id)
    if (!slotsByTeacher[row.teacher_id]) {
      const { data } = await supabase
        .from('availability')
        .select('*')
        .eq('teacher_id', row.teacher_id)
        .eq('is_booked', false)
        .gte('start_time', new Date().toISOString())
        .order('start_time')
      setSlotsByTeacher((prev) => ({ ...prev, [row.teacher_id]: data || [] }))
    }
  }

  const bookSlot = async (row, slot) => {
    setMsg(null)
    const { error: sessionError } = await supabase.from('sessions').insert({
      teacher_id: row.teacher_id,
      learner_id: user.id,
      subject_id: row.subject_id,
      availability_id: slot.id,
      status: 'pending',
    })
    if (sessionError) {
      setMsg({ type: 'error', text: sessionError.message })
      return
    }
    await supabase.from('availability').update({ is_booked: true }).eq('id', slot.id)
    setSlotsByTeacher((prev) => ({
      ...prev,
      [row.teacher_id]: prev[row.teacher_id].filter((s) => s.id !== slot.id),
    }))
    setMsg({ type: 'ok', text: 'Booked — waiting on the mentor to confirm.' })
    loadMentorsAndSessions()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader roleLabel={t('roleStudent')} name={profile?.full_name} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-dark mb-6">
          {t('findMentor')}
        </h1>

        {msg && (
          <div
            className={`p-4 mb-6 rounded-xl text-sm flex items-center gap-2.5 ${
              msg.type === 'error'
                ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                : 'bg-primary/10 text-primary border border-primary/20'
            }`}
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{msg.text}</span>
          </div>
        )}

        {loading ? (
          <p className="text-sm text-muted-foreground">{t('loading')}</p>
        ) : mentors.length === 0 ? (
          <div className="p-6 bg-card rounded-2xl border border-border text-sm text-muted-foreground">
            {t('noMentors')}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {mentors.map((row) => {
              const teacherSlots = slotsByTeacher[row.teacher_id] || []
              const markedDays = {}
              for (const s of teacherSlots) markedDays[toDateKey(s.start_time)] = 'open'
              const selectedDay = selectedDayByTeacher[row.teacher_id] || null
              const daySlots = selectedDay ? teacherSlots.filter((s) => toDateKey(s.start_time) === selectedDay) : []

              return (
                <div key={row.id} className="bg-card rounded-2xl p-6 border border-border shadow-soft flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-extrabold text-dark">{row.subjects?.name}</h3>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                        {row.hourly_rate ? `${row.hourly_rate} ден./час` : 'Free'}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-muted-foreground mb-3">
                      {row.profiles?.full_name} · <span className="text-dark">{row.level}</span>
                    </p>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                      {row.profiles?.bio || 'No bio available yet.'}
                    </p>
                  </div>

                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSlots(row)}
                      className="w-full justify-between font-semibold text-xs border-border"
                    >
                      <span>{openRow === row.id ? t('hideTimes') : t('seeFreeTimes')}</span>
                      <Calendar className="w-4 h-4 text-primary" />
                    </Button>

                    {openRow === row.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        {!slotsByTeacher[row.teacher_id] ? (
                          <p className="text-xs text-muted-foreground">{t('loading')}</p>
                        ) : teacherSlots.length === 0 ? (
                          <p className="text-xs text-muted-foreground">{t('noOpenTimes')}</p>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <MonthCalendar
                              markedDays={markedDays}
                              selected={selectedDay}
                              onSelect={(key) => setSelectedDayByTeacher((prev) => ({ ...prev, [row.teacher_id]: key }))}
                            />
                            <div className="w-full">
                              {!selectedDay ? (
                                <p className="text-xs text-muted-foreground text-center">{t('pickADay')}</p>
                              ) : daySlots.length === 0 ? (
                                <p className="text-xs text-muted-foreground text-center">{t('noSlotsForDay')}</p>
                              ) : (
                                <div className="space-y-2">
                                  {daySlots.map((slot) => (
                                    <div key={slot.id} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-muted/40 border border-border/50">
                                      <span className="text-xs font-semibold text-dark">
                                        {formatTime(slot.start_time)}–{formatTime(slot.end_time)}
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => bookSlot(row, slot)}
                                        className="h-8 px-3 text-xs font-bold"
                                      >
                                        {t('book')}
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* My Requests Section */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold text-dark mb-6">
            {t('myRequests')}
          </h2>

          <div className="space-y-3">
            {sessions.length === 0 ? (
              <div className="p-6 bg-card rounded-2xl border border-border text-sm text-muted-foreground">
                {t('nothingYetBook')}
              </div>
            ) : (
              sessions.map((s) => (
                <div key={s.id} className="bg-card rounded-2xl p-5 border border-border shadow-soft flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-sm font-bold text-dark">
                      {s.subjects?.name} — <span className="font-normal text-muted-foreground">with {s.teacher?.full_name}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {s.availability ? formatSlot(s.availability) : new Date(s.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                    {s.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

      </main>
    </div>
  )
}