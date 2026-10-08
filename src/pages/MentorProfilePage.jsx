import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Award, Trophy, BookOpen, Clock, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { BookingModal } from '../components/mentor/BookingModal'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../lib/supabase'

export function MentorProfilePage() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const isMk = language !== 'en'

  const [mentor, setMentor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadMentor() {
      setLoading(true)
      try {
        if (supabase) {
          const { data: tsData } = await supabase
            .from('teacher_subjects')
            .select('id, level, hourly_rate, teacher_id, subject_id, profiles(full_name, bio, avatar_url), subjects(name)')
            .eq('id', slug)

          if (tsData && tsData.length > 0) {
            const ts = tsData[0]
            const m = {
              id: ts.id,
              name: ts.profiles?.full_name || (isMk ? 'Верификуван Ментор' : 'Verified Mentor'),
              bio: ts.profiles?.bio || '',
              avatar: ts.profiles?.avatar_url || '🧑‍🎓',
              subjects: ts.subjects?.name ? [ts.subjects.name] : [],
              level: ts.level || 'Средно',
              price: ts.hourly_rate || 10,
              rating: 5.0,
              reviews: 12,
              available: true,
            }
            if (isMounted) setMentor(m)
          } else {
            const { data: pData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', slug)
              .single()

            if (pData) {
              const m = {
                id: pData.id,
                name: pData.full_name || (isMk ? 'Верификуван Ментор' : 'Verified Mentor'),
                bio: pData.bio || '',
                avatar: pData.avatar_url || '🧑‍🎓',
                subjects: pData.subjects || [],
                level: pData.level || 'Средно',
                price: pData.hourly_rate || 10,
                rating: 5.0,
                reviews: 12,
                available: true,
              }
              if (isMounted) setMentor(m)
            } else {
              if (isMounted) setMentor(null)
            }
          }
        } else {
          if (isMounted) setMentor(null)
        }
      } catch (err) {
        if (isMounted) setMentor(null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadMentor()
    return () => {
      isMounted = false
    }
  }, [slug, isMk])

  useEffect(() => {
    if (mentor) {
      document.title = `${mentor.name} | PeerUp`
    } else {
      document.title = isMk ? 'Ментор не е пронајден | PeerUp' : 'Mentor not found | PeerUp'
    }
  }, [mentor, isMk])

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 text-center text-muted-foreground animate-pulse">
        {t('loading')}
      </div>
    )
  }

  if (!mentor) {
    return (
      <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 text-center max-w-md">
        <h2 className="text-2xl font-bold text-dark mb-2">
          {isMk ? 'Менторот не е пронајден' : 'Mentor not found'}
        </h2>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          {isMk
            ? 'Профилот што го барате не постои или е деактивиран.'
            : 'The profile you are looking for does not exist or has been deactivated.'}
        </p>
        <Link to="/mentori">
          <Button variant="default">
            {isMk ? 'Назад кон сите ментори' : 'Back to all mentors'}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Back Link */}
        <Link
          to="/mentori"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-dark font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isMk ? 'Назад кон сите ментори' : 'Back to all mentors'}
        </Link>

        {/* Header Hero Card */}
        <div className="bg-card rounded-3xl p-6 sm:p-10 shadow-soft border border-border mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl gradient-primary flex items-center justify-center text-5xl sm:text-6xl shadow-md shrink-0">
              {mentor.avatar || '🧑‍🎓'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-dark">
                  {mentor.name}
                </h1>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    mentor.available
                      ? 'bg-green/15 text-green border border-green/30'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {mentor.available
                    ? isMk ? 'Достапен за нови часови' : 'Available for new lessons'
                    : isMk ? 'Моментално зафатен' : 'Currently busy'}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-accent">
                  <Star className="w-5 h-5 fill-accent" />
                  <span className="font-bold text-dark text-sm sm:text-base">
                    {mentor.rating}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  ({mentor.reviews} {isMk ? 'рецензии' : 'reviews'})
                </span>
              </div>

              {mentor.subjects.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {mentor.subjects.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-border flex flex-col items-start sm:items-end gap-3 shrink-0">
              <div className="text-left sm:text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-dark">
                  €{mentor.price}
                </span>
                <span className="text-xs text-muted-foreground block">
                  {isMk ? 'по час (60 мин)' : 'per hour (60 min)'}
                </span>
              </div>

              <Button
                variant="hero"
                size="lg"
                onClick={() => setBookingOpen(true)}
                className="w-full sm:w-auto"
              >
                {isMk ? 'Закажи час' : 'Book a lesson'}
              </Button>
            </div>
          </div>

          {mentor.bio && (
            <div className="pt-6 border-t border-border">
              <h3 className="text-sm font-bold text-dark uppercase tracking-wider mb-2">
                {isMk ? 'За менторот' : 'About the mentor'}
              </h3>
              <p className="text-sm text-dark/80 leading-relaxed">
                {mentor.bio}
              </p>
            </div>
          )}
        </div>
      </div>

      {bookingOpen && (
        <BookingModal
          isOpen={bookingOpen}
          mentor={mentor}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  )
}
