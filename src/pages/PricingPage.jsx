import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Check, Sparkles, ShieldCheck } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'

export function PricingPage() {
  const { t, language } = useLanguage()
  const isMk = language !== 'en'

  const plans = useMemo(() => [
    {
      name: isMk ? 'Еден час' : 'Single Session',
      description: isMk
        ? 'За повремена помош пред тест или контролна'
        : 'For occasional help before an exam or quiz',
      price: '€10',
      period: isMk ? '/час' : '/hour',
      discount: null,
      popular: false,
      features: isMk
        ? [
            'Избери било кој верификуван ментор',
            '60 минути интензивна 1-на-1 сесија',
            'Онлајн преку Google Meet',
            'Флексибилно закажување според твој термин',
            'Заедничка дигитална табла',
          ]
        : [
            'Choose any verified mentor',
            '60-minute intensive 1-on-1 session',
            'Online via Google Meet',
            'Flexible scheduling to fit your calendar',
            'Shared interactive whiteboard',
          ],
      ctaText: isMk ? 'Закажи час' : 'Book a session',
      ctaLink: '/mentori',
      btnVariant: 'outline',
    },
    {
      name: isMk ? 'Месечен пакет' : 'Monthly Package',
      description: isMk
        ? 'Најпопуларен избор за редовно учење и вежбање'
        : 'Most popular choice for regular study and practice',
      price: '€72',
      period: isMk ? '/8 часа' : '/8 sessions',
      discount: isMk ? '10% заштеда (€9/час)' : '10% savings (€9/hr)',
      popular: true,
      features: isMk
        ? [
            '8 часа месечно со Вашиот ментор',
            'Постојан редовен ментор',
            'Приоритетно закажување термини',
            'Следење на неделен напредок',
            'Бесплатни материјали и задачи за вежбање',
            'Директна комуникација со менторот',
          ]
        : [
            '8 hours per month with your mentor',
            'Dedicated regular mentor',
            'Priority slot booking',
            'Weekly progress tracking',
            'Free study materials & practice exercises',
            'Direct communication with mentor',
          ],
      ctaText: isMk ? 'Избери пакет' : 'Choose package',
      ctaLink: '/mentori',
      btnVariant: 'default',
    },
    {
      name: isMk ? 'Стандард претплата' : 'Standard Membership',
      description: isMk
        ? 'За долгорочна подготовка и континуитет'
        : 'For long-term preparation and continuous progress',
      price: '€10',
      period: isMk ? '/месечно + €7.50/час' : '/month + €7.50/hr',
      discount: isMk ? '25% попуст на час' : '25% hourly discount',
      popular: false,
      features: isMk
        ? [
            'Членска претплата со 25% попуст',
            'Секој час по повластена цена од €7.50',
            'Пристап до архива на материјали',
            'Месечни групни сесии за прашања',
            'Приоритетна е-пошта поддршка',
          ]
        : [
            'Membership with 25% discount',
            'Every lesson at preferred rate of €7.50',
            'Access to study materials library',
            'Monthly group Q&A sessions',
            'Priority email support',
          ],
      ctaText: isMk ? 'Започни стандард' : 'Start standard',
      ctaLink: '/mentori',
      btnVariant: 'outline',
    },
    {
      name: isMk ? 'Премиум подготовка' : 'Premium Prep',
      description: isMk
        ? 'За интензивна подготовка за олимпијади и матура'
        : 'For intensive olympiad & matriculation preparation',
      price: '€25',
      period: isMk ? '/месечно + €6/час' : '/month + €6/hr',
      discount: isMk ? '40% попуст на час' : '40% hourly discount',
      popular: false,
      features: isMk
        ? [
            'Максимален попуст од 40% (€6/час)',
            'Избор од топ 5% најуспешни ментори',
            'Неограничен пристап до сите материјали',
            'Персонализиран 1-на-1 менторски план',
            '24/7 директна менторска поддршка',
          ]
        : [
            'Maximum discount of 40% (€6/hr)',
            'Choice of top 5% highest-ranked mentors',
            'Unlimited access to all materials',
            'Personalized 1-on-1 mentorship plan',
            '24/7 direct mentor support',
          ],
      ctaText: isMk ? 'Започни премиум' : 'Start premium',
      ctaLink: '/mentori',
      btnVariant: 'outline',
    },
  ], [isMk])

  const pricingFaqs = useMemo(() => [
    {
      q: isMk ? 'Како се врши плаќањето?' : 'How does payment work?',
      a: isMk
        ? 'Плаќањето се врши безбедно онлајн по потврдувањето на часот или при избор на месечен пакет. Податоците се заштитени со највисоко ниво на безбедност.'
        : 'Payment is processed securely online upon confirming the session or choosing a monthly package. Your payment details are encrypted and fully protected.',
    },
    {
      q: isMk ? 'Што доколку менторот не ми одговара?' : 'What if the mentor is not the right fit?',
      a: isMk
        ? 'Вашето задоволство е наш главен приоритет. Доколку по првиот час не сте задоволни, веднаш Ви овозможуваме бесплатен час со друг ментор или 100% рефундирање.'
        : 'Your satisfaction is our top priority. If you are not satisfied after your first session, we immediately offer a free session with another mentor or a 100% refund.',
    },
    {
      q: isMk ? 'Дали можам да го откажам пакетот?' : 'Can I cancel my package or membership?',
      a: isMk
        ? 'Да, пакетите немаат договорна обврска и може да се откажат во било кое време пред следниот месечен циклус.'
        : 'Yes, packages have no contractual lock-in and can be cancelled at any time before the next billing cycle.',
    },
  ], [isMk])

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>{t('pricingBadge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-6 leading-tight max-w-4xl mx-auto">
            {t('pricingTitle')}{' '}
            <span className="text-gradient">{t('pricingTitleHighlight')}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('pricingSubtitle')}
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
                  {t('pricingPopular')}
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
              {t('pricingGuaranteeTitle')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('pricingGuaranteeDesc')}
            </p>
          </div>
          <Link to="/mentori" className="shrink-0">
            <Button variant="default">
              {t('pricingGuaranteeBtn')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-16 container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">
            {t('pricingFaqTitle')}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t('pricingFaqSubtitle')}
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
