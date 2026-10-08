import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Award, Trophy } from 'lucide-react'
import { ALL_MENTORS } from '../data/mentors'
import { Button } from '../components/ui/Button'
import { BookingModal } from '../components/mentor/BookingModal'

export function MentorProfilePage() {
  const { slug } = useParams()
  const mentor = ALL_MENTORS.find((m) => m.slug === slug || m.id === slug)
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    if (mentor) {
      document.title = `${mentor.name} – ментор за ${mentor.subjects.join(', ')} | PeerUp`
    } else {
      document.title = 'Ментор не е пронајден | PeerUp'
    }
  }, [mentor])

  if (!mentor) {
    return (
      <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-dark mb-4">
          Менторот не е пронајден
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Профилот што го барате не постои или е деактивиран.
        </p>
        <Link to="/mentori">
          <Button variant="default">
            Назад кон сите ментори
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
          Назад кон сите ментори
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
                  {mentor.available ? 'Достапен за нови часови' : 'Моментално зафатен'}
                </span>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-accent">
                  <Star className="w-5 h-5 fill-accent" />
                  <span className="font-bold text-dark text-sm sm:text-base">
                    {mentor.rating}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  ({mentor.reviews} рецензии од ученици)
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs sm:text-sm font-semibold text-dark">
                  {mentor.classesHeld || mentor.reviews * 3 + 12} одржани часови
                </span>
              </div>

              {/* Badge */}
              {mentor.badge && (
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>{mentor.badge}</span>
                </div>
              )}
            </div>

            {/* Price & Book */}
            <div className="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-border flex flex-col items-start sm:items-end gap-3 shrink-0">
              <div>
                <span className="text-3xl font-black text-dark">
                  €{mentor.price}
                </span>
                <span className="text-sm text-muted-foreground"> / час</span>
              </div>
              <Button
                variant="default"
                size="lg"
                disabled={!mentor.available}
                onClick={() => setBookingOpen(true)}
                className="w-full sm:w-auto shadow-md"
              >
                {mentor.available ? 'Закажи час' : 'Зафатен'}
              </Button>
            </div>
          </div>

          {/* Subjects Badges */}
          <div className="pt-6 border-t border-border">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Предмети за подучување
            </h3>
            <div className="flex flex-wrap gap-2">
              {mentor.subjects?.map((s, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm border border-primary/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft border border-border">
              <h2 className="text-xl font-bold text-dark mb-4">
                За менторот
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {mentor.bio}
              </p>
            </div>

            <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft border border-border">
              <h2 className="text-xl font-bold text-dark mb-4">
                Достигнувања и квалификации
              </h2>
              <ul className="space-y-3">
                {mentor.achievements?.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-dark">
                    <Trophy className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border space-y-4">
              <h3 className="font-bold text-dark text-base border-b border-border pb-3">
                Информации за часовите
              </h3>

              <div>
                <span className="text-xs text-muted-foreground block">Формат:</span>
                <span className="text-sm font-semibold text-dark">100% онлајн (Zoom / Meet)</span>
              </div>

              <div>
                <span className="text-xs text-muted-foreground block">Времетраење на час:</span>
                <span className="text-sm font-semibold text-dark">60 минути</span>
              </div>

              <div>
                <span className="text-xs text-muted-foreground block">Јазици:</span>
                <span className="text-sm font-semibold text-dark">
                  {mentor.languages?.join(', ') || 'Македонски'}
                </span>
              </div>

              <div>
                <span className="text-xs text-muted-foreground block">Искуство:</span>
                <span className="text-sm font-semibold text-dark">
                  {mentor.experience || '3+ години искуство'}
                </span>
              </div>

              <div className="pt-3 border-t border-border">
                <Button
                  variant="default"
                  className="w-full"
                  disabled={!mentor.available}
                  onClick={() => setBookingOpen(true)}
                >
                  Закажи час сега
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
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
