import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Clock, Sparkles, X, Users } from 'lucide-react'
import { MentorCard } from '../components/mentor/MentorCard'
import { BookingModal } from '../components/mentor/BookingModal'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../lib/supabase'

export function MentorDirectoryPage() {
  const { t, language } = useLanguage()
  const isMk = language !== 'en'

  const [searchParams, setSearchParams] = useSearchParams()
  const initialSubject = searchParams.get('subject') || (isMk ? 'Сите' : 'All')

  const [selectedSubject, setSelectedSubject] = useState(initialSubject)
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [bookingMentor, setBookingMentor] = useState(null)

  const [supabaseMentors, setSupabaseMentors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchMentors() {
      setLoading(true)
      try {
        if (supabase) {
          const { data: tsData, error: tsError } = await supabase
            .from('teacher_subjects')
            .select('id, level, hourly_rate, teacher_id, subject_id, profiles(full_name, bio, avatar_url), subjects(name)')

          if (!tsError && tsData && tsData.length > 0) {
            const mapped = tsData.map((ts) => ({
              id: ts.id,
              name: ts.profiles?.full_name || (isMk ? 'Верификуван Ментор' : 'Verified Mentor'),
              bio: ts.profiles?.bio || '',
              avatar: ts.profiles?.avatar_url || '',
              subjects: ts.subjects?.name ? [ts.subjects.name] : [],
              level: ts.level || 'Средно',
              price: ts.hourly_rate || 10,
              rating: 5.0,
              reviews: 12,
              available: true,
            }))
            if (isMounted) setSupabaseMentors(mapped)
          } else {
            const { data: profData } = await supabase
              .from('profiles')
              .select('*')
              .eq('role', 'mentor')

            if (profData && profData.length > 0) {
              const mapped = profData.map((p) => ({
                id: p.id,
                name: p.full_name || (isMk ? 'Верификуван Ментор' : 'Verified Mentor'),
                bio: p.bio || '',
                avatar: p.avatar_url || '',
                subjects: p.subjects || [],
                level: p.level || 'Средно',
                price: p.hourly_rate || 10,
                rating: 5.0,
                reviews: 12,
                available: true,
              }))
              if (isMounted) setSupabaseMentors(mapped)
            } else {
              if (isMounted) setSupabaseMentors([])
            }
          }
        } else {
          if (isMounted) setSupabaseMentors([])
        }
      } catch (err) {
        console.warn('Error fetching mentors:', err)
        if (isMounted) setSupabaseMentors([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchMentors()
    return () => {
      isMounted = false
    }
  }, [isMk])

  const SUBJECT_LIST = [
    isMk ? 'Сите' : 'All',
    'Математика',
    'Физика',
    'Хемија',
    'Биологија',
    'Англиски',
    'Германски',
    'Програмирање',
    'Историја',
  ]

  const PRICE_FILTERS = [
    { value: 'all', label: isMk ? 'Сите цени' : 'All prices' },
    { value: 'low', label: '≤€9/час' },
    { value: 'mid', label: '€10-12/час' },
    { value: 'high', label: '>€12/час' },
  ]

  const SORT_OPTIONS = [
    { value: 'rating', label: isMk ? 'Највисока оценка' : 'Highest rating' },
    { value: 'reviews', label: isMk ? 'Најмногу рецензии' : 'Most reviews' },
    { value: 'price_asc', label: isMk ? 'Цена: најниска' : 'Price: low to high' },
    { value: 'price_desc', label: isMk ? 'Цена: највисока' : 'Price: high to low' },
  ]

  const filteredMentors = useMemo(() => {
    return supabaseMentors
      .filter((m) => {
        // Subject match
        if (
          selectedSubject !== 'Сите' &&
          selectedSubject !== 'All' &&
          !m.subjects.some((s) => s.toLowerCase().includes(selectedSubject.toLowerCase()))
        ) {
          return false
        }

        // Availability match
        if (onlyAvailable && !m.available) {
          return false
        }

        // Price match
        if (selectedPrice === 'low' && m.price > 9) return false
        if (selectedPrice === 'mid' && (m.price < 10 || m.price > 12)) return false
        if (selectedPrice === 'high' && m.price <= 12) return false

        // Search match
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim()
          const matchName = m.name.toLowerCase().includes(query)
          const matchBadge = m.badge?.toLowerCase().includes(query)
          const matchSubj = m.subjects.some((s) => s.toLowerCase().includes(query))
          if (!matchName && !matchBadge && !matchSubj) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'reviews') return b.reviews - a.reviews
        if (sortBy === 'price_asc') return a.price - b.price
        if (sortBy === 'price_desc') return b.price - a.price
        return 0
      })
  }, [supabaseMentors, selectedSubject, selectedPrice, sortBy, onlyAvailable, searchQuery])

  const handleResetFilters = () => {
    setSelectedSubject(isMk ? 'Сите' : 'All')
    setSelectedPrice('all')
    setSortBy('rating')
    setOnlyAvailable(false)
    setSearchQuery('')
    setSearchParams({})
  }

  const isFilterActive =
    (selectedSubject !== 'Сите' && selectedSubject !== 'All') ||
    selectedPrice !== 'all' ||
    onlyAvailable ||
    searchQuery.trim() !== ''

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="relative overflow-hidden py-14 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>{isMk ? 'Верифицирани ментори' : 'Verified mentors'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-4 leading-tight max-w-3xl mx-auto">
            {isMk ? 'Запознај ги нашите ' : 'Meet our '}{' '}
            <span className="text-gradient">
              {isMk ? 'топ ментори' : 'top mentors'}
            </span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
            {isMk
              ? 'Победници на државни олимпијади и натпревари со докажани резултати и љубов кон предавањето.'
              : 'National olympiad winners and competition high-achievers with proven results and a passion for teaching.'}
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isMk
                  ? 'Пребарај по име, предмет или признание...'
                  : 'Search by name, subject, or achievement...'
              }
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-card border border-border shadow-soft text-dark text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-dark cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="container mx-auto px-4 sm:px-6 mb-10">
        <div className="bg-card rounded-3xl p-6 shadow-soft border border-border space-y-5">
          {/* Subjects pills */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2.5">
              {isMk ? 'Предмет' : 'Subject'}
            </label>
            <div className="flex flex-wrap gap-2">
              {SUBJECT_LIST.map((subj) => {
                const isActive = selectedSubject === subj
                return (
                  <button
                    key={subj}
                    onClick={() => {
                      setSelectedSubject(subj)
                      if (subj !== 'Сите' && subj !== 'All') {
                        setSearchParams({ subject: subj })
                      } else {
                        setSearchParams({})
                      }
                    }}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-sm ring-1 ring-primary'
                        : 'bg-muted text-dark hover:bg-primary/10'
                    }`}
                  >
                    {subj}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Secondary filter row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            {/* Price pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {t('homeMentorsPriceLabel')}
              </span>
              <div className="flex flex-wrap gap-1">
                {PRICE_FILTERS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setSelectedPrice(p.value)}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                      selectedPrice === p.value
                        ? 'bg-green text-white font-semibold'
                        : 'bg-muted text-dark hover:bg-green/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {isMk ? 'Подреди:' : 'Sort by:'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-muted text-dark text-xs rounded-lg px-2.5 py-1.5 border border-border outline-none focus:ring-1 focus:ring-accent cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability toggle */}
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                onlyAvailable
                  ? 'bg-green/20 text-green border border-green/30'
                  : 'bg-muted text-dark hover:bg-muted/80'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {t('homeMentorsOnlyAvailable')}
            </button>
          </div>

          {/* Counts & Reset */}
          <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
            <p className="text-muted-foreground">
              {isMk ? 'Прикажани ' : 'Showing '}{' '}
              <strong className="text-dark">{filteredMentors.length}</strong>{' '}
              {isMk ? 'од ' : 'of '}{supabaseMentors.length} {isMk ? 'ментори' : 'mentors'}
            </p>
            {isFilterActive && (
              <button
                onClick={handleResetFilters}
                className="text-primary font-bold hover:underline cursor-pointer"
              >
                {t('resetFilters')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Mentors Grid / Empty state */}
      <section className="container mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground animate-pulse font-medium">
            {t('loading')}
          </div>
        ) : filteredMentors.length === 0 ? (
          <div className="bg-card rounded-3xl p-8 sm:p-12 border border-border text-center max-w-lg mx-auto shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">
              {t('noMentorsFound')}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {t('noMentorsFoundDesc')}
            </p>
            <Button variant="default" size="sm" onClick={handleResetFilters}>
              {t('resetFilters')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id || mentor.slug}
                mentor={mentor}
                onBook={(m) => setBookingMentor(m)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Booking Modal */}
      {bookingMentor && (
        <BookingModal
          isOpen={!!bookingMentor}
          mentor={bookingMentor}
          onClose={() => setBookingMentor(null)}
        />
      )}
    </div>
  )
}
