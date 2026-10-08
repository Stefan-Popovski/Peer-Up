import { MentorCard } from './MentorCard'
import { SkeletonCard, Button } from '../ui'
import { MK } from '../../i18n/mk'

export function MentorGrid({ mentors, loading = false, onBook, onClearFilters }) {
  if (loading) {
    return (
      <div aria-live="polite" aria-label={MK.mentors.loading}
        className="grid grid-cols-1 gap-8 xl:grid-cols-2"
      >
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (mentors.length === 0) {
    return (
      <div role="status"
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-dark/10 py-16 text-center"
      >
        <span className="text-4xl" aria-hidden="true">🔍</span>
        <p className="text-base font-medium text-dark/60">{MK.mentors.noResults}</p>
        {onClearFilters && (
          <Button variant="secondary" size="sm" onClick={onClearFilters}>
            {MK.mentors.noResultsAction}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div aria-live="polite">
      <p className="mb-4 text-sm text-dark/50">{MK.filters.showing(mentors.length)}</p>
      <ul className="grid grid-cols-1 gap-8 xl:grid-cols-2" role="list" aria-label="Листа на ментори">
        {mentors.map((mentor) => (
          <li key={mentor.id}>
            <MentorCard mentor={mentor} onBook={onBook} />
          </li>
        ))}
      </ul>
    </div>
  )
}
