import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { supabase } from '../lib/Supabaseclient'
import DashboardHeader from '../components/DashboardHeader.jsx'
import MonthCalendar from '../components/Monthcalendar.jsx'

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
    <div className="min-h-screen">
      <DashboardHeader roleLabel={t('roleStudent')} name={profile?.full_name} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="font-display font-semibold tracking-tight text-2xl">{t('findMentor')}</h1>
        {msg && (
          <p className="text-sm mt-2" style={{ color: msg.type === 'error' ? '#b3541e' : 'var(--teal-mid)' }}>
            {msg.text}
          </p>
        )}
        {loading ? (
          <p className="text-sm text-inkSoft mt-4">{t('loading')}</p>
        ) : mentors.length === 0 ? (
          <p className="text-sm text-inkSoft mt-4">{t('noMentors')}</p>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {mentors.map((row) => {
              const teacherSlots = slotsByTeacher[row.teacher_id] || []
              const markedDays = {}
              for (const s of teacherSlots) markedDays[toDateKey(s.start_time)] = 'open'
              const selectedDay = selectedDayByTeacher[row.teacher_id] || null
              const daySlots = selectedDay ? teacherSlots.filter((s) => toDateKey(s.start_time) === selectedDay) : []

              return (
                <div key={row.id} className="rounded border border-line bg-paperDim p-5 flex flex-col">
                  <p className="font-display font-semibold tracking-tight text-lg">{row.subjects?.name}</p>
                  <p className="text-sm text-inkSoft mt-1">
                    {row.profiles?.full_name} · {row.level}
                  </p>
                  <p className="text-sm text-inkSoft mt-2">{row.profiles?.bio?.slice(0, 90) || 'No bio yet.'}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm" style={{ color: 'var(--teal-mid)' }}>
                      {row.hourly_rate ? `$${row.hourly_rate}/hr` : 'Skill swap'}
                    </span>
                    <button
                      onClick={() => toggleSlots(row)}
                      className="rounded border border-line px-3 py-1.5 text-xs hover:bg-paper"
                    >
                      {openRow === row.id ? t('hideTimes') : t('seeFreeTimes')}
                    </button>
                  </div>

                  {openRow === row.id && (
                    <div className="mt-4 pt-4 border-t border-line">
                      {!slotsByTeacher[row.teacher_id] ? (
                        <p className="text-xs text-inkSoft">{t('loading')}</p>
                      ) : teacherSlots.length === 0 ? (
                        <p className="text-xs text-inkSoft">{t('noOpenTimes')}</p>
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <MonthCalendar
                            markedDays={markedDays}
                            selected={selectedDay}
                            onSelect={(key) => setSelectedDayByTeacher((prev) => ({ ...prev, [row.teacher_id]: key }))}
                          />
                          <div className="w-full">
                            {!selectedDay ? (
                              <p className="text-xs text-inkSoft text-center">{t('pickADay')}</p>
                            ) : daySlots.length === 0 ? (
                              <p className="text-xs text-inkSoft text-center">{t('noSlotsForDay')}</p>
                            ) : (
                              <div className="space-y-2">
                                {daySlots.map((slot) => (
                                  <div key={slot.id} className="flex items-center justify-between gap-2">
                                    <span className="text-xs">
                                      {formatTime(slot.start_time)}–{formatTime(slot.end_time)}
                                    </span>
                                    <button
                                      onClick={() => bookSlot(row, slot)}
                                      className="rounded px-2.5 py-1 text-xs font-medium"
                                      style={{ background: 'var(--gradient)', color: '#04252b' }}
                                    >
                                      {t('book')}
                                    </button>
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
              )
            })}
          </div>
        )}

        <h2 className="font-display font-semibold tracking-tight text-2xl mt-14">{t('myRequests')}</h2>
        <div className="mt-6 space-y-3">
          {sessions.length === 0 && <p className="text-sm text-inkSoft">{t('nothingYetBook')}</p>}
          {sessions.map((s) => (
            <div key={s.id} className="rounded border border-line bg-paperDim p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm font-medium">
                  {s.subjects?.name} with {s.teacher?.full_name}
                </p>
                <p className="text-xs text-inkSoft mt-0.5">
                  {s.availability ? formatSlot(s.availability) : new Date(s.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full border border-line text-inkSoft">{s.status}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}