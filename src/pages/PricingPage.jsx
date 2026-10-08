import { Link } from 'react-router-dom'
import { Check, Sparkles, ShieldCheck } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function PricingPage() {
  const plans = [
    {
      name: 'Еден час',
      description: 'За повремена помош пред тест или контролна',
      price: '€10',
      period: '/час',
      discount: null,
      popular: false,
      features: [
        'Избери било кој верификуван ментор',
        '60 минути интензивна 1-на-1 сесија',
        'Онлајн преку Zoom или Google Meet',
        'Флексибилно закажување според твој термин',
        'Заедничка дигитална табла',
      ],
      ctaText: 'Закажи час',
      ctaLink: '/mentori',
      btnVariant: 'outline',
    },
    {
      name: 'Месечен пакет',
      description: 'Најпопуларен избор за редовно учење и вежбање',
      price: '€72',
      period: '/8 часа',
      discount: '10% заштеда (€9/час)',
      popular: true,
      features: [
        '8 часа месечно со твојот ментор',
        'Постојан редовен ментор',
        'Приоритетно закажување термини',
        'Следење на неделен напредок',
        'Бесплатни материјали и задачи за вежбање',
        'Директна комуникација со менторот',
      ],
      ctaText: 'Избери пакет',
      ctaLink: '/mentori',
      btnVariant: 'default',
    },
    {
      name: 'Стандард претплата',
      description: 'За долгорочна подготовка и континуитет',
      price: '€10',
      period: '/месечно + €7.50/час',
      discount: '25% попуст на час',
      popular: false,
      features: [
        'Членска претплата со 25% попуст',
        'Секој час по повластена цена од €7.50',
        'Пристап до архива на материјали',
        'Месечни групни сесии за прашања',
        'Приоритетна е-пошта поддршка',
      ],
      ctaText: 'Започни стандард',
      ctaLink: '/mentori',
      btnVariant: 'outline',
    },
    {
      name: 'Премиум подготовка',
      description: 'За интензивна подготовка за олимпијади и матура',
      price: '€25',
      period: '/месечно + €6/час',
      discount: '40% попуст на час',
      popular: false,
      features: [
        'Максимален попуст од 40% (€6/час)',
        'Избор од топ 5% најуспешни ментори',
        'Неограничен пристап до сите материјали',
        'Персонализиран 1-на-1 менторски план',
        '24/7 директна менторска поддршка',
      ],
      ctaText: 'Започни премиум',
      ctaLink: '/mentori',
      btnVariant: 'outline',
    },
  ]

  const pricingFaqs = [
    {
      q: 'Како се врши плаќањето?',
      a: 'Плаќањето се врши безбедно онлајн по потврдувањето на часот или при избор на месечен пакет. Податоците се заштитени со највисоко ниво на безбедност.',
    },
    {
      q: 'Што доколку менторот не ми одговара?',
      a: 'Твоето задоволство е наш главен приоритет. Доколку по првиот час не си задоволен/а, веднаш ти овозможуваме бесплатен час со друг ментор или 100% рефундирање.',
    },
    {
      q: 'Дали можам да го откажам пакетот?',
      a: 'Да, пакетите немаат договорна обврска и може да се откажат во било кое време пред следниот месечен циклус.',
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Транспарентен ценовник</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-6 leading-tight max-w-4xl mx-auto">
            Инвестиција во твоето знаење{' '}
            <span className="text-gradient">без скриени трошоци</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Избери поединечен час или заштеди со пакет. Сите опции се со загарантиран квалитет и поддршка.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                plan.popular
                  ? 'border-primary ring-2 ring-primary/20 shadow-hover -translate-y-2'
                  : 'border-border shadow-soft hover:shadow-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                  Најпопуларен избор
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-dark mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-5 min-h-[32px]">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-dark">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {plan.period}
                  </span>
                </div>

                {plan.discount ? (
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-green/15 text-green text-xs font-semibold mb-6 border border-green/30">
                    {plan.discount}
                  </div>
                ) : (
                  <div className="h-6 mb-6" />
                )}

                <ul className="space-y-3 mb-8 border-t border-border pt-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-dark">
                      <div className="w-4 h-4 rounded-full bg-green/15 text-green flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={plan.ctaLink} className="w-full">
                <Button
                  variant={plan.btnVariant}
                  size="default"
                  className="w-full font-semibold"
                >
                  {plan.ctaText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee banner */}
      <section className="py-12 container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="bg-gradient-to-r from-primary/10 via-card to-accent/10 border border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left shadow-card">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white shrink-0 shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-dark mb-1">
              100% Гаранција за враќање на средствата
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ако не си 100% задоволен/а од искуството со менторот на твојот прв час, веднаш ќе ти доделиме друг ментор бесплатно или ќе ти ги рефундираме уплатените средства без дополнителни прашања.
            </p>
          </div>
          <Link to="/mentori" className="shrink-0">
            <Button variant="default">
              Најди ментор
            </Button>
          </Link>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-16 container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">
            Често поставувани прашања за цените
          </h2>
          <p className="text-muted-foreground text-sm">
            Сè што сакаш да знаеш за плаќањата и пакетите
          </p>
        </div>

        <div className="space-y-4">
          {pricingFaqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <h4 className="font-bold text-dark text-base mb-2">
                {faq.q}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
