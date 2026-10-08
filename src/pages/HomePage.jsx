import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Star,
  CheckCircle2,
  Award,
  Calendar,
  Clock,
  ChevronDown,
  Quote,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Globe,
  Languages,
  Code,
  BookOpen,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { MentorCard } from '../components/mentor/MentorCard'
import { BookingModal } from '../components/mentor/BookingModal'
import { ALL_MENTORS } from '../data/mentors'

const SUBJECT_LIST = [
  'Сите',
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
  { key: 'math', name: 'Математика', icon: Calculator, count: 45, color: 'bg-primary/10 text-primary border border-primary/20' },
  { key: 'physics', name: 'Физика', icon: Atom, count: 32, color: 'bg-accent/20 text-dark border border-accent/30' },
  { key: 'chemistry', name: 'Хемија', icon: FlaskConical, count: 28, color: 'bg-green/15 text-green border border-green/30' },
  { key: 'biology', name: 'Биологија', icon: Dna, count: 25, color: 'bg-primary/10 text-primary border border-primary/20' },
  { key: 'english', name: 'Англиски', icon: Globe, count: 50, color: 'bg-accent/20 text-dark border border-accent/30' },
  { key: 'german', name: 'Германски', icon: Languages, count: 20, color: 'bg-green/15 text-green border border-green/30' },
  { key: 'programming', name: 'Програмирање', icon: Code, count: 35, color: 'bg-primary/10 text-primary border border-primary/20' },
  { key: 'history', name: 'Историја', icon: BookOpen, count: 18, color: 'bg-dark/10 text-dark border border-dark/20' },
]

const HOW_STEPS = [
  {
    step: '1',
    title: 'Пребарај ментор',
    description: 'Избери предмет и ниво. Филтрирај според оценки, искуство и достапност.',
  },
  {
    step: '2',
    title: 'Закажи час',
    description: 'Избери термин кој ти одговара. Флексибилни часови од 30 до 90 минути.',
  },
  {
    step: '3',
    title: 'Учи онлајн',
    description: 'Поврзи се преку Zoom или Google Meet. Без патување, од удобноста на домот.',
  },
  {
    step: '4',
    title: 'Постигни успех',
    description: 'Следи го напредокот и постигни ги своите академски цели со самодоверба.',
  },
]

const PRICING_PLANS = [
  {
    name: 'Еден час',
    description: 'За повремена помош',
    price: '€10',
    period: '/час',
    discount: null,
    popular: false,
    features: ['Избери било кој ментор', '30-90 минути по час', 'Онлајн преку Zoom/Meet', 'Флексибилно закажување'],
  },
  {
    name: 'Месечен пакет',
    description: 'Најпопуларен избор',
    price: '€72',
    period: '/8 часа',
    discount: '10% заштеда',
    popular: true,
    features: ['8 часа месечно', 'Редовен ментор', 'Приоритетно закажување', 'Следење на напредок', 'Материјали за вежбање'],
  },
  {
    name: 'Стандард',
    description: 'За редовна подготовка',
    price: '€10',
    period: '/месечно + €7.50/час',
    discount: '25% попуст',
    popular: false,
    features: ['Членска претплата', '25% попуст на часови', 'Пристап до материјали', 'Групни сесии', 'Email поддршка'],
  },
  {
    name: 'Премиум',
    description: 'За интензивна подготовка',
    price: '€25',
    period: '/месечно + €6/час',
    discount: '40% попуст',
    popular: false,
    features: ['40% попуст на часови', 'Приоритетен ментор', 'Неограничен пристап до материјали', '1-на-1 менторски план', '24/7 поддршка'],
  },
]

const FAQ_ITEMS = [
  {
    question: 'Кои се менторите на PeerUp?',
    answer: 'Нашите ментори се талентирани средношколци и студенти кои постигнале извонредни резултати на државни и меѓународни натпревари, олимпијади, или имаат одличен академски успех. Сите ментори поминуваат низ процес на верификација и интервју.',
  },
  {
    question: 'Колку чини еден час?',
    answer: 'Цените варираат во зависност од менторот и неговото искуство, но во просек се €8-€12 по час. Ова е значително поевтино од традиционалните приватни часови, а квалитетот е загарантиран преку нашиот систем на оценување.',
  },
  {
    question: 'Како се одржуваат часовите?',
    answer: 'Сите часови се одржуваат онлајн преку Zoom или Google Meet. По закажувањето, добиваш линк за видео повик. Ова значи дека можеш да учиш од удобноста на твојот дом, без губење време и пари на патување.',
  },
  {
    question: 'Можам ли да го сменам менторот?',
    answer: 'Да, апсолутно! Ако сметаш дека друг ментор би бил подобар за тебе, слободно можеш да закажеш час со друг ментор. Нашата цел е да најдеш совршен ментор за твоите потреби.',
  },
  {
    question: 'Како да станам ментор?',
    answer: 'Ако си талентиран средношколец или студент со одлични резултати, можеш да аплицираш преку нашата форма за ментори (/stani-mentor). Потребни се информации за академски успех и краток интервју.',
  },
  {
    question: 'Што ако не сум задоволен од часот?',
    answer: 'Твоето задоволство е наш приоритет. Ако не си задоволен од првиот час со ментор, контактирај нè и ќе најдеме решение — било да е тоа друг ментор бесплатно или целосно рефундирање.',
  },
  {
    question: 'За кои предмети можам да најдам ментор?',
    answer: 'Нудиме ментори за сите главни предмети: Математика, Физика, Хемија, Биологија, Англиски, Германски, Програмирање, Историја и други. Исто така имаме специјализирани ментори за подготовка за државни натпревари и матура.',
  },
]

export function HomePage() {
  const navigate = useNavigate()
  const [selectedSubject, setSelectedSubject] = useState('Сите')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [bookingMentor, setBookingMentor] = useState(null)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const motwMentor = ALL_MENTORS.find((m) => m.name === 'Александра С.') || ALL_MENTORS[0]

  const homeMentors = ALL_MENTORS.filter((m) => {
    if (selectedSubject !== 'Сите' && !m.subjects.some((s) => s.toLowerCase() === selectedSubject.toLowerCase())) {
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
      <section className="relative min-h-[92vh] pt-28 pb-20 overflow-hidden flex items-center bg-gradient-to-br from-background via-primary/5 to-accent/10">
        {/* Soft blur orbs using strict palette */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-pulse-soft pointer-events-none" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Col */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-semibold mb-6 animate-fade-in-up backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Првата peer-to-peer tutoring платформа во Македонија</span>
              </div>

              {/* Hook */}
              <p className="text-primary font-semibold text-sm md:text-base mb-3 animate-fade-in-up">
                Се мачиш со училишните предмети? Сакаш достапна помош?
              </p>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-dark leading-[1.1] mb-6 animate-fade-in-up">
                Учи од{' '}
                <span className="text-gradient">млади ментори</span>{' '}
                кои те разбираат
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up">
                <strong className="text-dark font-semibold">
                  Победници на државни натпревари и олимпијади
                </strong>{' '}
                кои знаат како да го доловат материјалот на начин на кој што ќе го разбереш. 100% онлајн, без патување.
              </p>

              {/* Quick Benefits */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up">
                <div className="flex items-center gap-2 text-sm text-dark font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green" />
                  <span>Веднаш достапни</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-dark font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green" />
                  <span>Од €8/час</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-dark font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green" />
                  <span>100% онлајн</span>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up">
                <Link to="/mentori">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/25">
                    Најди ментор
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/stani-mentor">
                  <Button variant="heroOutline" size="lg" className="w-full sm:w-auto">
                    <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                    Стани ментор
                  </Button>
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start animate-fade-in-up">
                <div className="flex items-center gap-2.5 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full shadow-soft border border-border">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-dark font-bold">500+</strong> ученици
                  </span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full shadow-soft border border-border">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-dark font-bold">4.9</strong> просечна оценка
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Floating Mentor Card */}
            <div className="flex-1 relative animate-fade-in-up w-full max-w-md lg:max-w-none">
              <div className="relative max-w-md mx-auto">
                {/* Glow ring */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl scale-95" />

                {/* Card preview */}
                <div className="bg-card/95 backdrop-blur-md rounded-3xl shadow-hover p-6 sm:p-8 relative z-10 border border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-3xl shadow-lg shrink-0">
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

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                      Државен натпревар
                    </span>
                    <span className="px-3 py-1 bg-green/15 text-green text-xs font-semibold rounded-full border border-green/30">
                      3+ години искуство
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-muted-foreground italic mb-6 leading-relaxed bg-muted p-3.5 rounded-xl border border-border">
                    &ldquo;Математиката не мора да биде тешка! Заедно ќе ги совладаме сите концепти.&rdquo;
                  </p>

                  {/* Actions & Status */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green animate-pulse" />
                      <span className="text-xs font-semibold text-green">Онлајн сега</span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setBookingMentor(motwMentor)}
                      className="shadow-sm"
                    >
                      Закажи час - €8/час
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & STATS & TESTIMONIALS SECTION */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6">
          {/* 4 Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto">
            <div className="text-center p-5 bg-card rounded-2xl border border-border shadow-soft">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">500+</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">Задоволни ученици</div>
            </div>
            <div className="text-center p-5 bg-card rounded-2xl border border-border shadow-soft">
              <div className="text-3xl sm:text-4xl font-extrabold text-dark mb-1">50+</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">Верифицирани ментори</div>
            </div>
            <div className="text-center p-5 bg-card rounded-2xl border border-border shadow-soft">
              <div className="text-3xl sm:text-4xl font-extrabold text-green mb-1">4.9/5</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">Просечна оценка</div>
            </div>
            <div className="text-center p-5 bg-card rounded-2xl border border-border shadow-soft">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">100%</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">Селектирани ментори</div>
            </div>
          </div>

          {/* Testimonials Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
              Што велат нашите <span className="text-gradient">корисници</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Реални искуства од ученици и родители кои учат преку PeerUp
            </p>
          </div>

          {/* 3 Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
            <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card border border-border flex flex-col justify-between">
              <div>
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-sm md:text-base text-dark leading-relaxed mb-6">
                  &ldquo;Бев загубена во математика, а сега имам петка! Менторот ми објаснува како да ми е другар, без никаков притисок.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white">
                  М
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm">Марија П.</h4>
                  <p className="text-xs text-muted-foreground">Ученичка, 8-мо одделение</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card border border-border flex flex-col justify-between">
              <div>
                <Quote className="w-8 h-8 text-green/40 mb-4" />
                <p className="text-sm md:text-base text-dark leading-relaxed mb-6">
                  &ldquo;Конечно достапни цени за приватни часови. Синот ми напредува секоја недела и сам со нетрпение го чека терминот.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center text-sm font-bold">
                  Г
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm">Горан С.</h4>
                  <p className="text-xs text-muted-foreground">Родител</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card border border-border flex flex-col justify-between">
              <div>
                <Quote className="w-8 h-8 text-accent/50 mb-4" />
                <p className="text-sm md:text-base text-dark leading-relaxed mb-6">
                  &ldquo;Менторот за англиски ме подготви за IELTS за 2 месеци. Добив 7.5 и обезбедив стипендија! Препорака од срце.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center text-sm font-bold">
                  А
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm">Ана К.</h4>
                  <p className="text-xs text-muted-foreground">Студентка, 2-ра година</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Guarantee Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-dark/80 pt-4">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green" />
              Сите ментори се верифицирани
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green" />
              Победници на државни натпревари
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green" />
              100% гаранција за задоволство
            </span>
          </div>
        </div>
      </section>

      {/* 3. MENTOR OF THE WEEK */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green/15 text-green text-sm font-semibold mb-3 border border-green/30">
              <Award className="w-4 h-4" />
              <span>Ментор на неделата</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-3">
              Запознај ја <span className="text-gradient">{motwMentor.name}</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Најуспешниот ментор оваа недела со највисока оценка и најмногу закажани часови.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Card: Profile & Stats */}
            <div className="bg-card rounded-3xl shadow-card p-6 sm:p-8 border border-border flex flex-col justify-between">
              <div>
                <Link
                  to={`/mentor/${motwMentor.slug}`}
                  className="flex items-center gap-5 mb-6 group cursor-pointer"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl gradient-primary flex items-center justify-center text-5xl shadow-md group-hover:scale-105 transition-transform shrink-0">
                    {motwMentor.avatar}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors">
                      {motwMentor.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-bold text-dark text-sm">{motwMentor.rating}</span>
                      <span className="text-xs text-muted-foreground">({motwMentor.reviews} оценки)</span>
                    </div>
                    <span className="inline-block mt-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      {motwMentor.badge}
                    </span>
                  </div>
                </Link>

                <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-muted rounded-2xl text-center border border-border">
                  <div>
                    <div className="text-xl font-bold text-dark">234</div>
                    <div className="text-xs text-muted-foreground">одржани часови</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-dark">67</div>
                    <div className="text-xs text-muted-foreground">задоволни ученици</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">€{motwMentor.price}</div>
                    <div className="text-xs text-muted-foreground">цена по час</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {motwMentor.subjects?.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-muted text-xs font-medium text-dark border border-border/50">
                      {s}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-lg bg-accent/20 text-dark text-xs font-semibold border border-accent/40">
                    Олимпијада
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-green/15 text-green text-xs font-semibold border border-green/30">
                    Матура
                  </span>
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                className="w-full shadow-md"
                onClick={() => setBookingMentor(motwMentor)}
              >
                Закажи час со {motwMentor.name}
              </Button>
            </div>

            {/* Right Card: Message & CV */}
            <div className="bg-card rounded-3xl shadow-card p-6 sm:p-8 border border-border flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-dark text-lg mb-3 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />
                  Порака од менторот
                </h3>
                <p className="text-sm text-dark/80 leading-relaxed mb-6 bg-muted p-4 rounded-2xl border border-border">
                  &ldquo;Математиката не мора да биде тешка! Со правилен пристап и трпение, секој може да ја совлада. Верувам во индивидуален пристап — секој ученик е различен и заслужува персонализирано внимание. Ајде заедно да ги постигнеме твоите академски цели!&rdquo;
                </p>

                <h3 className="font-bold text-dark text-base mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-green" />
                  Биографија и достигнувања
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-dark/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span>Прво место на Државна Олимпијада по Математика 2023</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span>Студент на ФЕИТ - Електротехнички факултет Скопје</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span>3+ години активно искуство со приватни часови</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span>Подготвила 50+ ученици за натпревари и државна матура</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-border mt-6">
                <Link to={`/mentor/${motwMentor.slug}`} className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                  Види го целиот профил на {motwMentor.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS PREVIEW */}
      <section className="py-20 container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
            Како функционира?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Едноставен процес за да најдеш совршен ментор за твоите потреби
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {HOW_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-card rounded-3xl p-6 shadow-soft border border-border hover:shadow-hover transition-all duration-300 relative group"
            >
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white font-black text-lg mb-4 shadow-sm group-hover:scale-105 transition-transform">
                {step.step}
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/kako-raboti">
            <Button variant="heroOutline" size="lg">
              Дознај повеќе за процесот
              <ArrowRight className="w-4 h-4 ml-2 text-primary" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. SUBJECTS PREVIEW */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
              Предмети и области
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Од математика до јазици — најди ментор за секој училишен предмет
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
                  <p className="text-xs text-muted-foreground">
                    {item.count}+ ментори
                  </p>
                </button>
              )
            })}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Не го гледаш твојот предмет? Имаме ментори за сите училишни предмети!
            </p>
            <Link to="/predmeti" className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1">
              Види ги сите предмети <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. MENTORS DIRECTORY PREVIEW */}
      <section className="py-20 container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
            Запознај ги нашите <span className="text-gradient">верифицирани ментори</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Сите ментори се селектирани врз основа на академски достигнувања и натпреварски успеси
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
              <span className="text-xs text-muted-foreground">Цена:</span>
              {[
                { v: 'all', l: 'Сите' },
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
              Само достапни
            </button>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {homeMentors.map((mentor) => (
            <MentorCard
              key={mentor.id || mentor.slug}
              mentor={mentor}
              onBook={(m) => setBookingMentor(m)}
            />
          ))}
        </div>

        <div className="text-center">
          <Link to="/mentori">
            <Button variant="heroOutline" size="lg">
              Види ги сите {ALL_MENTORS.length} ментори
              <ArrowRight className="w-4 h-4 ml-2 text-primary" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
              Транспарентни и <span className="text-gradient">достапни цени</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Избери план кој најмногу ти одговара. Без скриени трошоци.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
            {PRICING_PLANS.map((plan, idx) => (
              <div
                key={idx}
                className={`bg-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border ${
                  plan.popular
                    ? 'border-primary ring-2 ring-primary/20 shadow-hover'
                    : 'border-border shadow-soft'
                }`}
              >
                <div>
                  {plan.popular && (
                    <span className="inline-block gradient-primary text-white text-[11px] font-bold px-3 py-0.5 rounded-full mb-3">
                      Најпопуларен
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-dark">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-extrabold text-dark">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.discount ? (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-green/15 text-green text-xs font-semibold mb-5 border border-green/30">
                      {plan.discount}
                    </span>
                  ) : (
                    <div className="h-6 mb-5" />
                  )}

                  <ul className="space-y-2.5 mb-6 border-t border-border pt-4 text-xs">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-dark">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/ceni" className="w-full">
                  <Button variant={plan.popular ? 'default' : 'outline'} size="sm" className="w-full">
                    Погледни детали
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/ceni" className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1">
              Целосна споредба на пакетите и условите <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Прашања и одговори</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-3">
            Често поставувани прашања
          </h2>
          <p className="text-muted-foreground text-base">
            Сè што треба да знаеш пред да го закажеш твојот прв час
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
      <section className="py-20 gradient-primary relative overflow-hidden text-white">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-sm">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span>Придружи се на заедницата</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                Сакаш да станеш ментор?
              </h2>
              <p className="text-white/95 text-base md:text-lg mb-8 leading-relaxed">
                Искористи го твоето знаење и помогни им на помладите ученици. Заработи додека правиш позитивна промена во нивниот успех.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8 text-center">
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/20">
                  <div className="text-xl font-bold">€6-12</div>
                  <div className="text-xs text-white/80">по час</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/20">
                  <div className="text-xl font-bold">Флексибилен</div>
                  <div className="text-xs text-white/80">распоред</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/20">
                  <div className="text-xl font-bold">CV</div>
                  <div className="text-xs text-white/80">искуство</div>
                </div>
              </div>

              <Link to="/stani-mentor">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-white text-dark hover:bg-white/90 shadow-lg font-bold"
                >
                  Аплицирај како ментор
                  <ArrowRight className="w-5 h-5 ml-2 text-primary" />
                </Button>
              </Link>
            </div>

            {/* What we look for checklist */}
            <div className="bg-dark/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20">
              <h3 className="font-bold text-xl mb-4 text-white">
                Што бараме?
              </h3>
              <ul className="space-y-3.5 text-sm text-white/95">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>Средношколец или студент со одличен успех и оценки</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>Учество на државни или меѓународни натпревари / олимпијади</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>Комуникативност, стрпливост и желба за пренесување знаење</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>Минимум 4 часа неделна достапност за онлајн часови</span>
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
