import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function daysInMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}
function dateKey(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// markedDays: { 'YYYY-MM-DD': 'open' | 'booked' }
export default function MonthCalendar({ markedDays = {}, selected, onSelect }) {
  const { locale } = useLanguage()
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()))

  const first = startOfMonth(cursor)
  const totalDays = daysInMonth(cursor)
  const leadBlanks = (first.getDay() + 6) % 7 // Monday-first

  const monthLabel = cursor.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, i + 1) // Jan 1 2024 was a Monday
    return d.toLocaleDateString(locale, { weekday: 'short' })
  })

  const todayKey = dateKey(new Date())
  const cells = Array(leadBlanks).fill(null).concat(Array.from({ length: totalDays }, (_, i) => i + 1))

  return (
    <div className="rounded-xl border border-line bg-paperDim p-4 w-full max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="w-7 h-7 rounded hover:bg-paper text-sm"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="font-display font-semibold text-sm capitalize">{monthLabel}</span>
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="w-7 h-7 rounded hover:bg-paper text-sm"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-inkSoft mb-1">
        {weekdayLabels.map((w, i) => (
          <div key={i} className="capitalize">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`b${i}`} />
          const d = new Date(cursor.getFullYear(), cursor.getMonth(), day)
          const key = dateKey(d)
          const mark = markedDays[key]
          const isSelected = selected === key
          const isToday = key === todayKey
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect?.(key)}
              className="relative h-8 rounded text-xs flex items-center justify-center hover:bg-paper transition-colors"
              style={{
                background: isSelected ? 'var(--gradient)' : 'transparent',
                color: isSelected ? '#04252b' : 'inherit',
                boxShadow: isToday && !isSelected ? 'inset 0 0 0 1px var(--teal-mid)' : 'none',
              }}
            >
              {day}
              {mark && !isSelected && (
                <span
                  className="absolute bottom-1 w-1 h-1 rounded-full"
                  style={{ background: mark === 'booked' ? 'var(--ink-soft)' : 'var(--teal-mid)' }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}