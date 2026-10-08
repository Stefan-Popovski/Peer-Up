import { Link } from 'react-router-dom'
import { Search, Calendar, Video, Trophy, CheckCircle, ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      icon: Search,
      title: 'Пребарај и избери ментор',
      description:
        'Избери го предметот што ти задава потешкотии (Математика, Физика, Хемија, Јазици, Програмирање итн.). Прегледај ги верификуваните ментори, нивните натпреварувачки успеси, оценки од други ученици и цената по час.',
      highlights: ['Филтрирај според достапност и цена', 'Провери натпреварувачки достигнувања', 'Реални рецензии од врсници'],
    },
    {
      num: '02',
      icon: Calendar,
      title: 'Закажи термин според твој распоред',
      description:
        'Избери датум и време кои најмногу ти одговараат. Без фиксни неделни обврски — можеш да закажеш часови за подготовка за контролна, натпревар или редовно неделно вежбање.',
      highlights: ['Флексибилни сесии од 60 минути', 'Инстантна потврда на е-пошта', 'Лесно презакажување при потреба'],
    },
    {
      num: '03',
      icon: Video,
      title: 'Учи онлајн од удобноста на твојот дом',
      description:
        'Часовите се одвиваат 100% онлајн преку Zoom или Google Meet. Користете споделување екран, интерактивна дигитална табла и решавајте задачи рамо до рамо, без губење време и пари на патување низ градот.',
      highlights: ['Без патување и гужви', 'Интерактивна виртуелна табла', 'Директно прашување без срам'],
    },
    {
      num: '04',
      icon: Trophy,
      title: 'Постигни ги твоите академски цели',
      description:
        'Гледај како твоите оценки и самодоверба растат! Твојот ментор ќе ти помогне не само со моменталните задачи, туку и ќе те научи како поефикасно да учиш и да размислуваш самостојно.',
      highlights: ['Повисоки оценки и петки', 'Подготовка за натпревари и матура', 'Развивање критичко размислување'],
    },
  ]

  const comparisons = [
    {
      feature: 'Пристап на предавање',
      peerUp: 'Другарски и разбирлив јазик, без страв од погрешни одговори',
      traditional: 'Често строг, авторитетен и формален пристап',
    },
    {
      feature: 'Локација',
      peerUp: '100% онлајн, учи од твојата соба или каде и да си',
      traditional: 'Патување до наставникот, губење време во сообраќај',
    },
    {
      feature: 'Цена',
      peerUp: 'Достапни цени од €8 до €12 по час',
      traditional: 'Често над €20-€30 по час без транспарентност',
    },
    {
      feature: 'Флексибилност',
      peerUp: 'Закажуваш кога тебе ти одговара, менуваш ментор во секое време',
      traditional: 'Фиксни термини кои тешко се менуваат',
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Како функционира PeerUp</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-6 leading-tight max-w-4xl mx-auto">
            Едноставен пат од прашање до{' '}
            <span className="text-gradient">одличен успех</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Платформа создадена за ученици од млади талентирани ментори. Без стрес, без комплицирани процедури, со максимална посветеност.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/mentori">
              <Button variant="hero" size="lg" className="shadow-lg shadow-primary/25">
                Најди ментор сега
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/predmeti">
              <Button variant="heroOutline" size="lg">
                Истражи предмети
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-20 container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Четири чекори до твојот прв час
          </h2>
          <p className="text-muted-foreground text-lg">
            Сè е дизајнирано да биде брзо, интуитивно и целосно прилагодено на твоето темпо.
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
              <span>Зошто врсничко менторство?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              PeerUp vs Традиционални приватни часови
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Зошто младите ментори постигнуваат подобри резултати кај учениците:
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-muted p-4 md:p-6 text-sm font-bold text-dark border-b border-border">
              <div className="hidden md:block">Карактеристика</div>
              <div className="text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>PeerUp Академија</span>
              </div>
              <div className="text-muted-foreground hidden md:block">Традиционални часови</div>
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
                    <span className="md:hidden text-xs font-bold text-muted-foreground block mb-1">Традиционално:</span>
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
            100% Гаранција за задоволство и безбедност
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Сите ментори се внимателно селектирани врз основа на вистински натпреварувачки успеси и академски достигнувања. Доколку не си задоволен од твојот прв час, ти нудиме бесплатен час со друг ментор или целосно рефундирање.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/mentori">
              <Button variant="default" size="lg">
                Избери ментор
              </Button>
            </Link>
            <Link to="/ceni">
              <Button variant="outline" size="lg">
                Погледни цени
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
