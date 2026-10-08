import { Filter, RotateCcw } from 'lucide-react'
import { SUBJECTS } from '../../data/subjects'
import { SCHOOL_LEVEL_LABELS } from '../../types/index'
import { DEFAULT_FILTERS } from '../../hooks/useMentors'
import { MK } from '../../i18n/mk'
import { Select } from '../ui'
import { cn } from '../../lib/utils'

const subjectOptions = [
  { value: '', label: MK.filters.allSubjects },
  ...SUBJECTS.map((s) => ({ value: s.id, label: s.name })),
]

const levelOptions = [
  { value: '', label: MK.filters.allLevels },
  ...Object.entries(SCHOOL_LEVEL_LABELS).map(([value, label]) => ({ value, label })),
]

export function MentorFiltersPanel({ filters, onChange, languages, className }) {
  const languageOptions = [
    { value: '', label: MK.filters.allLanguages },
    ...(languages || []).map((l) => ({ value: l, label: l })),
  ]

  const hasActiveFilters = filters.subjectId !== '' || filters.level !== '' || filters.language !== ''

  return (
    <aside aria-label="Филтри за ментори"
      className={cn('rounded-2xl bg-white p-5 shadow-card', className)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 font-semibold text-dark">
          <Filter className="h-4 w-4 text-primary" aria-hidden="true" />
          {MK.filters.title}
        </h2>
        {hasActiveFilters && (
          <button onClick={() => onChange(DEFAULT_FILTERS)}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Исчисти ги сите филтри"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            {MK.filters.reset}
          </button>
        )}
      </div>

      <div className="space-y-4">
        <Select
          label={MK.filters.subject}
          options={subjectOptions}
          value={filters.subjectId}
          onChange={(e) => onChange({ ...filters, subjectId: e.target.value })}
        />
        <Select
          label={MK.filters.level}
          options={levelOptions}
          value={filters.level}
          onChange={(e) => onChange({ ...filters, level: e.target.value })}
        />
        <Select
          label={MK.filters.language}
          options={languageOptions}
          value={filters.language}
          onChange={(e) => onChange({ ...filters, language: e.target.value })}
        />
      </div>
    </aside>
  )
}
