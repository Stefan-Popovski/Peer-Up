import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  ChevronDown,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Globe,
  Languages,
  Code,
  BookOpen,
  Star,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { MentorCard } from '../components/mentor/MentorCard'
import { BookingModal } from '../components/mentor/BookingModal'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../lib/supabase'

function TimelineStepItem({ step, index, isMobile = false }) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    const currentRef = domRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const delayMs = index * 120

  if (isMobile) {
    return (
      <div
        ref={domRef}
        style={{
          transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
        }}
        className={`relative flex items-center gap-4 group transition-all duration-500 ease-out transform ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-6 scale-90'
        }`}
      >
        <div className="absolute -left-[31px] w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center border-4 border-background shrink-0">
          {step.step}
        </div>
        <div className="pl-6">
          <h3 className="text-base font-bold text-dark">
            {step.title}
          </h3>
          <p className="text-xs text-muted-foreground font-medium">
            {step.subtitle}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
      }}
      className={`flex flex-col items-center text-center group cursor-pointer transition-all duration-500 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-10 scale-75'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center border-4 border-background transition-transform duration-200 group-hover:scale-110 shadow-none">
        {step.step}
      </div>
      <div className="mt-5 space-y-1">
        <h3 className="text-lg font-bold text-dark">
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">
          {step.subtitle}
        </p>
      </div>
    </div>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const isMk = language !== 'en'

  const [selectedSubject, setSelectedSubject] = useState('Сите')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [bookingMentor, setBookingMentor] = useState(null)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const [supabaseMentors, setSupabaseMentors] = useState([])
  const [loadingMentors, setLoadingMentors] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadMentors() {
      setLoadingMentors(true)
      try {
        if (supabase) {
          const { data: tsData, error: tsError } = await supabase
            .from('teacher_subjects')
            .select('id, level, hourly_rate, teacher_id, subject_id, profiles(full_name, bio, avatar_url), subjects(name)')
            .limit(20)

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
        console.warn('Error loading mentors:', err)
        if (isMounted) setSupabaseMentors([])
      } finally {
        if (isMounted) setLoadingMentors(false)
      }
    }

    loadMentors()
    return () => {
      isMounted = false
    }
  }, [isMk])

  const SUBJECT_LIST = [
    t('homeMentorsPriceAll'),
    'Математика',
    'Физика',
    'Хемија',
    'Биологија',
    'Англиски',
    'Германски',
    'Програмирање',
    'Историја',
  ]

  const SUBJECT_CARDS = [
    { key: 'math', name: 'Математика', icon: Calculator, color: 'bg-primary/10 text-primary border border-primary/20' },
    { key: 'physics', name: 'Физика', icon: Atom, color: 'bg-accent/20 text-dark border border-accent/30' },
    { key: 'chemistry', name: 'Хемија', icon: FlaskConical, color: 'bg-green/15 text-green border border-green/30' },
    { key: 'biology', name: 'Биологија', icon: Dna, color: 'bg-primary/10 text-primary border border-primary/20' },
    { key: 'english', name: 'Англиски', icon: Globe, color: 'bg-accent/20 text-dark border border-accent/30' },
    { key: 'german', name: 'Германски', icon: Languages, color: 'bg-green/15 text-green border border-green/30' },
    { key: 'programming', name: 'Програмирање', icon: Code, color: 'bg-primary/10 text-primary border border-primary/20' },
    { key: 'history', name: 'Историја', icon: BookOpen, color: 'bg-dark/10 text-dark border border-dark/20' },
  ]

  const HOW_STEPS = [
    {
      step: '1',
      title: isMk ? 'Избери' : 'Select',
      subtitle: isMk ? 'предмет' : 'subject',
    },
    {
      step: '2',
      title: isMk ? 'Пронајди' : 'Find',
      subtitle: isMk ? 'ментор' : 'mentor',
    },
    {
      step: '3',
      title: isMk ? 'Закажи' : 'Book',
      subtitle: isMk ? 'термин' : 'session',
    },
    {
      step: '4',
      title: isMk ? 'Учи' : 'Learn',
      subtitle: isMk ? 'онлајн' : 'online',
    },
  ]

  const FAQ_ITEMS = [
    {
      question: isMk ? 'Како функционира PeerUp?' : 'How does PeerUp work?',
      answer: isMk
        ? 'PeerUp е платформа која поврзува ученици со млади ментори - талентирани средношколци и студенти. Избираш ментор според предмет и достапност, закажуваш час онлајн преку Google Meet и учиш од некој кој го има совладано истиот материјал.'
        : 'PeerUp is a platform connecting students with young mentors — talented high school and university students. Choose a mentor by subject and availability, book an online lesson via Google Meet, and learn from someone who has mastered the subject.',
    },
    {
      question: isMk ? 'Кои се менторите на PeerUp?' : 'Who are the mentors on PeerUp?',
      answer: isMk
        ? 'Нашите ментори се внимателно избрани средношколци и студенти. Учесници на натпревари, или студенти со докажано искуство. Секој ментор поминува процес на евалуација пред да почне да предава.'
        : 'Our mentors are carefully evaluated high school and university students, competition participants, or students with proven experience. Every mentor passes an evaluation process before teaching.',
    },
    {
      question: isMk ? 'Колку чини еден час?' : 'How much does a session cost?',
      answer: isMk
        ? 'Цената е 400-700 денари по час. Ова е поевтино од традиционалните приватни часови, а квалитетот е загарантиран преку нашиот систем на оценување.'
        : 'The price is €6-€10 per hour. This is more affordable than traditional private tutoring, with quality backed by our rating system.',
    },
    {
      question: isMk ? 'Како се одржуваат часовите?' : 'How are lessons held?',
      answer: isMk
        ? 'Сите часови се одржуваат онлајн преку Google Meet. По закажувањето, добиваш линк за видео повик, отстранувајќи ја обврската за патување до менторот и назад.'
        : 'All sessions take place online via Google Meet. After booking, you receive a video link, eliminating travel time.',
    },
    {
      question: isMk ? 'Можам ли да го сменам менторот?' : 'Can I change my mentor?',
      answer: isMk
        ? 'Да, апсолутно! Ако сметаш дека друг ментор би бил подобар за тебе, слободно можеш да закажеш час со друг ментор. Нашата цел е да најдеш соодветен ментор за Вашите образовни потреби и цели.'
        : 'Yes, absolutely! If you feel another mentor would suit you better, you are free to book with anyone else.',
    },
    {
      question: isMk ? 'Како да станам ментор?' : 'How do I become a mentor?',
      answer: (
        <>
          {isMk
            ? 'Ако си талентиран средношколец или студент со одлични резултати во одредена сфера, можеш да аплицираш преку понудената форма за ментори ('
            : 'If you are a talented student with top grades in a subject, you can apply using our mentor form ('}
          <Link to="/stani-mentor-info" className="text-primary font-semibold underline hover:text-primary/80">
            {isMk ? 'кликни тука' : 'click here'}
          </Link>
          {isMk
            ? '). Потребни се информации за академски успех (натпревари, проекти, оценки) и кратко интервју.'
            : '). Academic achievement details and a short interview are required.'}
        </>
      ),
    },
    {
      question: isMk ? 'Што ако не сум задоволен од часот?' : 'What if I am not satisfied with a session?',
      answer: isMk
        ? 'Доколку не сте задоволни со одржаниот час, слободно контактирајте нè за поддршка. Ќе ја разгледаме ситуацијата, зависно од причината, може да ви понудиме промена на менторот, заменски час или поврат на средствата.'
        : 'If you are unsatisfied with a session, contact our support team. We will review the situation and offer a mentor change, replacement lesson, or refund.',
    },
    {
      question: isMk ? 'За кои предмети можам да најдам ментор?' : 'Which subjects can I find a mentor for?',
      answer: isMk
        ? 'Моментално нудиме ментори за ограничен број предмети, листата постојано ќе се проширува со приклучување на нови ментори. Нашата цел е постепено да оформиме мрежа на поддршка за што поголем број училишни предмети и области.'
        : 'We currently offer mentors across key subjects, with our network growing continuously as new mentors join.',
    },
  ]

  const homeMentors = supabaseMentors.filter((m) => {
    if (selectedSubject !== 'Сите' && selectedSubject !== 'All' && !m.subjects.some((s) => s.toLowerCase().includes(selectedSubject.toLowerCase()))) {
      return false
    }
    if (onlyAvailable && !m.available) return false
    if (selectedPrice === 'low' && m.price > 9) return false
    if (selectedPrice === 'mid' && (m.price < 10 || m.price > 12)) return false
    if (selectedPrice === 'high' && m.price <= 12) return false
    return true
  }).slice(0, 8)

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] pt-28 pb-20 overflow-hidden flex items-center bg-background">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Col */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-semibold mb-6 animate-fade-in-up">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>{t('homeHeroBadge')}</span>
              </div>

              <p className="text-primary font-semibold text-sm md:text-base mb-3 animate-fade-in-up">
                {t('homeHeroHook')}
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-dark leading-[1.1] mb-12 animate-fade-in-up">
                {t('homeHeroTitle1')}{' '}
                <span className="text-primary">{t('homeHeroTitle2')}</span>{' '}
                {t('homeHeroTitle3')}
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up">
                <Link to="/mentori">
                  <Button variant="default" size="lg" className="w-full sm:w-auto shadow-none hover:shadow-none">
                    {t('homeFindMentor')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/stani-mentor-info">
                  <Button variant="heroOutline" size="lg" className="w-full sm:w-auto shadow-none hover:shadow-none">
                    <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                    {t('homeBecomeMentor')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Col: Mentor Card Preview */}
            <div className="flex-1 relative animate-fade-in-up w-full max-w-md lg:max-w-none">
              <div className="relative max-w-md mx-auto">
                <div className="bg-card rounded-3xl p-6 sm:p-8 relative z-10 border border-border shadow-none">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shrink-0">
                      👩‍🎓
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-dark text-lg truncate">
                        Марија К.
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Математика • Физика
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-accent/15 px-3 py-1.5 rounded-full border border-accent/30 shrink-0">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="text-sm font-bold text-dark">5.0</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                      {isMk ? 'Државен натпревар' : 'National Olympiad'}
                    </span>
                    <span className="px-3 py-1 bg-green/15 text-green text-xs font-semibold rounded-full border border-green/30">
                      {isMk ? '3+ години искуство' : '3+ years experience'}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground italic mb-6 leading-relaxed bg-muted p-3.5 rounded-xl border border-border">
                    &ldquo;{isMk ? 'Математиката не мора да биде тешка! Заедно ќе ги совладаме сите концепти.' : 'Math doesn’t have to be hard! Together we will master all concepts.'}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green animate-pulse" />
                      <span className="text-xs font-semibold text-green">
                        {isMk ? 'Онлајн сега' : 'Online now'}
                      </span>
                    </div>
                    <Link to="/mentori">
                      <Button variant="default" size="sm" className="shadow-none hover:shadow-none">
                        {isMk ? 'Закажи час' : 'Book lesson'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. HOW IT WORKS PREVIEW */}
      <section className="py-20 container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-14 text-left">
            {t('homeHowItWorksTitle')}
          </h2>

          {/* Desktop Timeline Layout */}
          <div className="hidden md:block relative my-12">
            {/* Connecting Horizontal Line */}
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-primary/40 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-4 gap-4 relative z-10">
              {HOW_STEPS.map((step, idx) => (
                <TimelineStepItem key={step.step} step={step} index={idx} isMobile={false} />
              ))}
            </div>
          </div>

          {/* Mobile Timeline Layout */}
          <div className="block md:hidden relative pl-6 border-l-2 border-primary/40 space-y-8 my-10 ml-4">
            {HOW_STEPS.map((step, idx) => (
              <TimelineStepItem key={step.step} step={step} index={idx} isMobile={true} />
            ))}
          </div>

          {/* Button */}
          <div className="text-center mt-14">
            <Link to="/kako-raboti">
              <Button variant="heroOutline" size="lg" className="shadow-none hover:shadow-none">
                {t('homeHowItWorksMore')}
                <ArrowRight className="w-4 h-4 ml-2 text-primary" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SUBJECTS PREVIEW */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
              {t('homeSubjectsTitle')}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {t('homeSubjectsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto mb-12">
            {SUBJECT_CARDS.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  onClick={() => navigate(`/mentori?subject=${encodeURIComponent(item.name)}`)}
                  className="bg-card rounded-2xl p-5 sm:p-6 shadow-soft hover:shadow-hover border border-border transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-dark text-base mb-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. MENTORS DIRECTORY PREVIEW (FETCHED FROM BACKEND SUPABASE) */}
      <section className="py-20 container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
            {t('homeMentorsTitle')}<span className="text-gradient">{t('homeMentorsTitleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t('homeMentorsSubtitle')}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft border border-border mb-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Subject selector */}
            <div className="flex flex-wrap gap-1.5">
              {SUBJECT_LIST.slice(0, 6).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    selectedSubject === s
                      ? 'bg-primary text-white shadow-sm ring-1 ring-primary'
                      : 'bg-muted text-dark hover:bg-primary/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Price filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">{t('homeMentorsPriceLabel')}</span>
              {[
                { v: 'all', l: t('homeMentorsPriceAll') },
                { v: 'low', l: '≤€9' },
                { v: 'mid', l: '€10-12' },
                { v: 'high', l: '>€12' },
              ].map((p) => (
                <button
                  key={p.v}
                  onClick={() => setSelectedPrice(p.v)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    selectedPrice === p.v
                      ? 'bg-green text-white font-semibold'
                      : 'bg-muted text-dark hover:bg-green/10'
                  }`}
                >
                  {p.l}
                </button>
              ))}
            </div>

            {/* Availability */}
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                onlyAvailable
                  ? 'bg-green/20 text-green border border-green/30'
                  : 'bg-muted text-dark hover:bg-muted/80'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {t('homeMentorsOnlyAvailable')}
            </button>
          </div>
        </div>

        {/* Mentors Grid / Empty State */}
        {loadingMentors ? (
          <div className="py-16 text-center text-muted-foreground animate-pulse">
            {t('loading')}
          </div>
        ) : homeMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {homeMentors.map((mentor) => (
              <MentorCard
                key={mentor.id || mentor.slug}
                mentor={mentor}
                onBook={(m) => setBookingMentor(m)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-3xl p-8 sm:p-12 border border-border text-center max-w-lg mx-auto mb-12 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">
              {t('noMentorsFound')}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {t('noMentorsFoundDesc')}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedSubject(t('homeMentorsPriceAll'))
                setSelectedPrice('all')
                setOnlyAvailable(false)
              }}
            >
              {t('resetFilters')}
            </Button>
          </div>
        )}

        <div className="text-center">
          <Link to="/mentori">
            <Button variant="heroOutline" size="lg">
              {t('homeMentorsSeeAll')}
              <ArrowRight className="w-4 h-4 ml-2 text-primary" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>{t('homeFaqBadge')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-3">
            {t('homeFaqTitle')}
          </h2>
          <p className="text-muted-foreground text-base">
            {t('homeFaqSubtitle')}
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx
            return (
              <div
                key={idx}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-dark text-sm sm:text-base hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-dark/80 leading-relaxed border-t border-border bg-muted/40 animate-fade-in-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 9. CTA SECTION */}
      <section className="py-20 gradient-primary dark:bg-none dark:bg-gradient-to-br dark:from-[#06152b] dark:via-[#091f3a] dark:to-[#071629] dark:border-y dark:border-slate-800 relative overflow-hidden text-white">
        {/* Subtle ambient cyan/teal corner glow in dark mode */}
        <div className="hidden dark:block absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden dark:block absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 dark:bg-accent/15 text-white dark:text-accent border border-white/20 dark:border-accent/30 text-xs font-bold mb-4 backdrop-blur-sm">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span>{t('homeCtaBadge')}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-white dark:text-slate-100">
                {t('homeCtaTitle')}
              </h2>
              <p className="text-white/95 dark:text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
                {t('homeCtaSubtitle')}
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 text-center">
                <div className="bg-white/10 dark:bg-slate-900/70 backdrop-blur-sm p-2.5 sm:p-3.5 rounded-2xl border border-white/20 dark:border-slate-700/50 flex flex-col items-center justify-center min-w-0">
                  <div className="text-xs sm:text-base md:text-md font-bold text-white dark:text-slate-100 truncate max-w-full">
                    {t('homeCtaBox1Title')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/80 dark:text-slate-400 mt-0.5">
                    {t('homeCtaBox1Desc')}
                  </div>
                </div>
                <div className="bg-white/10 dark:bg-slate-900/70 backdrop-blur-sm p-2.5 sm:p-3.5 rounded-2xl border border-white/20 dark:border-slate-700/50 flex flex-col items-center justify-center min-w-0">
                  <div className="text-xs sm:text-base md:text-md font-bold text-white dark:text-slate-100 truncate max-w-full">
                    {t('homeCtaBox2Title')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/80 dark:text-slate-400 mt-0.5">
                    {t('homeCtaBox2Desc')}
                  </div>
                </div>
                <div className="bg-white/10 dark:bg-slate-900/70 backdrop-blur-sm p-2.5 sm:p-3.5 rounded-2xl border border-white/20 dark:border-slate-700/50 flex flex-col items-center justify-center min-w-0">
                  <div className="text-xs sm:text-base md:text-md font-bold text-white dark:text-slate-100 truncate max-w-full">
                    {t('homeCtaBox3Title')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/80 dark:text-slate-400 mt-0.5">
                    {t('homeCtaBox3Desc')}
                  </div>
                </div>
              </div>

              <Link to="/stani-mentor-info">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-white text-[#071b3a] hover:bg-white/90 dark:bg-accent dark:text-[#071b3a] dark:hover:bg-accent-400 dark:shadow-accent/20 shadow-lg font-bold"
                >
                  {t('homeCtaApplyBtn')}
                  <ArrowRight className="w-5 h-5 ml-2 text-primary dark:text-[#071b3a]" />
                </Button>
              </Link>
            </div>

            {/* What we look for checklist */}
            <div className="bg-dark/40 dark:bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 dark:border-slate-800">
              <h3 className="font-bold text-xl mb-4 text-white dark:text-slate-100">
                {t('homeCtaChecklistTitle')}
              </h3>
              <ul className="space-y-3.5 text-sm text-white/95 dark:text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{t('homeCtaCheck1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{t('homeCtaCheck2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{t('homeCtaCheck3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal (Shared) */}
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
