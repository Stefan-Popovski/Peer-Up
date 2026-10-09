import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Video, Trophy, CheckCircle, ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'

export function HowItWorksPage() {
  const { t, language } = useLanguage()
  const isMk = language !== 'en'

  const steps = useMemo(() => [
    {
      num: '01',
      icon: Search,
      title: isMk ? 'Пребарај и избери ментор' : 'Search & choose a mentor',
      description: isMk
        ? 'Избери го предметот што ти задава потешкотии (Математика, Физика, Хемија, Јазици, Програмирање итн.). Прегледај ги верификуваните ментори, нивните натпреварувачки успеси, оценки од други ученици и цената по час.'
        : 'Choose the subject you need help with (Math, Physics, Chemistry, Languages, Programming, etc.). Browse verified mentors, their competition achievements, student ratings, and hourly rates.',
      highlights: isMk
        ? ['Филтрирај според достапност и цена', 'Провери натпреварувачки достигнувања', 'Реални рецензии од врсници']
        : ['Filter by availability & price', 'Check competition achievements', 'Real reviews from peers'],
    },
    {
      num: '02',
      icon: Calendar,
      title: isMk ? 'Закажи термин според твој распоред' : 'Schedule a time that fits your calendar',
      description: isMk
        ? 'Избери датум и време кои најмногу ти одговараат. Без фиксни неделни обврски — можеш да закажеш часови за подготовка за контролна, натпревар или редовно неделно вежбање.'
        : 'Choose the date and time that work best for you. No rigid weekly lock-in — schedule sessions for exam prep, competitions, or regular practice.',
      highlights: isMk
        ? ['Флексибилни сесии од 60 минути', 'Инстантна потврда на е-пошта', 'Лесно презакажување при потреба']
        : ['Flexible 60-minute sessions', 'Instant email confirmation', 'Easy rescheduling when needed'],
    },
    {
      num: '03',
      icon: Video,
      title: isMk ? 'Учете онлајн од удобноста на Вашиот дом' : 'Learn online from the comfort of home',
      description: isMk
        ? 'Часовите се одвиваат 100% онлајн преку Google Meet. Користете споделување екран, интерактивна дигитална табла и решавајте задачи рамо до рамо, без губење време и пари на патување низ градот.'
        : 'Lessons take place 100% online via Google Meet. Use screen sharing, interactive digital whiteboards, and solve problems side by side without commuting.',
      highlights: isMk
        ? ['Без патување и гужви', 'Интерактивна виртуелна табла', 'Директно прашување без срам']
        : ['No travel or commuting', 'Interactive virtual whiteboard', 'Direct questions without hesitation'],
    },
    {
      num: '04',
      icon: Trophy,
      title: isMk ? 'Постигнете ги Вашите академски цели' : 'Achieve your academic goals',
      description: isMk
        ? 'Гледајте како Вашите оценки и самодоверба растат! Вашиот ментор ќе ти помогне не само со моменталните задачи, туку и ќе те научи како поефикасно да учиш и да размислуваш самостојно.'
        : 'Watch your grades and confidence grow! Your mentor helps not only with current homework, but also teaches you how to study effectively and think independently.',
      highlights: isMk
        ? ['Повисоки оценки и петки', 'Подготовка за натпревари и матура', 'Развивање критичко размислување']
        : ['Higher grades & top marks', 'Preparation for competitions & finals', 'Developing critical thinking'],
    },
  ], [isMk])

  const comparisons = useMemo(() => [
    {
      feature: isMk ? 'Пристап на предавање' : 'Teaching approach',
      peerUp: isMk
        ? 'Другарски и разбирлив јазик, без страв од погрешни одговори'
        : 'Friendly, relatable language with zero fear of wrong answers',
      traditional: isMk
        ? 'Често строг, авторитетен и формален пристап'
        : 'Often strict, authoritative, and formal approach',
    },
    {
      feature: isMk ? 'Локација' : 'Location',
      peerUp: isMk
        ? '100% онлајн, учете од Вашата соба или каде и да сте'
        : '100% online, learn from your room or anywhere you are',
      traditional: isMk
        ? 'Патување до наставникот, губење време во сообраќај'
        : 'Commuting to the tutor, wasted time in traffic',
    },
    {
      feature: isMk ? 'Цена' : 'Price',
      peerUp: isMk
        ? 'Достапни цени од €8 до €12 по час'
        : 'Affordable rates from €8 to €12 per hour',
      traditional: isMk
        ? 'Често над €20-€30 по час без транспарентност'
        : 'Often over €20-€30 per hour with no transparency',
    },
    {
      feature: isMk ? 'Флексибилност' : 'Flexibility',
      peerUp: isMk
        ? 'Закажуваш кога тебе ти одговара, менуваш ментор во секое време'
        : 'Book whenever it fits you, switch mentors anytime',
      traditional: isMk
        ? 'Фиксни термини кои тешко се менуваат'
        : 'Rigid slots that are difficult to reschedule',
    },
  ], [isMk])

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>{t('howBadge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-6 leading-tight max-w-4xl mx-auto">
            {t('howTitle')}{' '}
            <span className="text-gradient">{t('howTitleHighlight')}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('howSubtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/mentori">
              <Button variant="hero" size="lg" className="shadow-lg shadow-primary/25">
                {t('howFindMentorBtn')}
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/predmeti">
              <Button variant="heroOutline" size="lg">
                {t('howExploreSubjectsBtn')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-20 container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t('howStepsTitle')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('howStepsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="bg-card rounded-3xl p-8 shadow-card border border-border hover:shadow-hover transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/30">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {step.description}
                </p>
                <ul className="space-y-2 border-t border-border pt-4">
                  {step.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-dark">
                      <CheckCircle className="w-4 h-4 text-green shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Peer Up Advantage Comparison */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green/15 text-green text-xs font-semibold mb-3 border border-green/30">
              <HeartHandshake className="w-4 h-4" />
              <span>{t('howAdvantageBadge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              {t('howAdvantageTitle')}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {t('howAdvantageSubtitle')}
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-muted p-4 md:p-6 text-sm font-bold text-dark border-b border-border">
              <div className="hidden md:block">{t('howColFeature')}</div>
              <div className="text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>{t('howColPeerUp')}</span>
              </div>
              <div className="text-muted-foreground hidden md:block">{t('howColTraditional')}</div>
            </div>

            <div className="divide-y divide-border">
              {comparisons.map((c, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 p-4 md:p-6 gap-2 md:gap-4 text-sm">
                  <div className="font-semibold text-dark md:font-medium">{c.feature}</div>
                  <div className="text-dark bg-primary/5 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none">
                    <span className="md:hidden text-xs font-bold text-primary block mb-1">PeerUp:</span>
                    <span className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green shrink-0 mt-0.5" />
                      <span>{c.peerUp}</span>
                    </span>
                  </div>
                  <div className="text-muted-foreground p-3 md:p-0 bg-muted/40 md:bg-transparent rounded-xl md:rounded-none">
                    <span className="md:hidden text-xs font-bold text-muted-foreground block mb-1">{isMk ? 'Традиционално:' : 'Traditional:'}</span>
                    {c.traditional}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Guarantee */}
      <section className="py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 rounded-3xl p-8 md:p-12 text-center shadow-card">
          <div className="w-16 h-16 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto mb-6 border border-primary/30">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">
            {t('howGuaranteeTitle')}
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('howGuaranteeDesc')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/mentori">
              <Button variant="default" size="lg">
                {t('howChooseMentorBtn')}
              </Button>
            </Link>
            <Link to="/ceni">
              <Button variant="outline" size="lg">
                {t('howViewPricingBtn')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
