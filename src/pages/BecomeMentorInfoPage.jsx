import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import {
  Award,
  DollarSign,
  Calendar,
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '../components/ui/Button'

export function BecomeMentorInfoPage() {
  const { language } = useLanguage()
  const isMk = language !== 'en'

  const BENEFITS_LIST = [
    {
      title: isMk ? 'Флексибилен распоред' : 'Flexible Schedule',
      desc: isMk
        ? 'Самите го одредувате вашето неделно време и одбирате кога сте слободни за часови.'
        : 'Set your own weekly availability and choose when you are free to teach.',
    },
    {
      title: isMk ? 'Атрактивна заработка' : 'Competitive Earnings',
      desc: isMk
        ? 'Заработувајте од 300 до 600 денари по час со директни исплати за вашето знаење.'
        : 'Earn between 300 and 600 MKD per hour for your knowledge with prompt payouts.',
    },
    {
      title: isMk ? 'Вредно CV искуство' : 'Valuable CV Experience',
      desc: isMk
        ? 'Добијте официјална потврда за менторство и истакнете се при аплицирање за факултет или работа.'
        : 'Receive official mentorship certification to boost your resume for university or job applications.',
    },
    {
      title: isMk ? 'Развој на меки вештини' : 'Soft Skills Development',
      desc: isMk
        ? 'Усовршете ги вашите вештини за комуникација, лидерство, презентирање и педагогија.'
        : 'Sharpen your communication, leadership, presentation, and teaching skills.',
    },
    {
      title: isMk ? 'Работа од дома (100% онлајн)' : '100% Online Work',
      desc: isMk
        ? 'Сите часови се одржуваат онлајн преку Google Meet – без губење време во патување.'
        : 'All sessions take place online via Google Meet — zero commuting time needed.',
    },
  ]

  const REQUIREMENTS_LIST = [
    {
      title: isMk ? 'Одлично познавање на предметот' : 'Strong Subject Mastery',
      desc: isMk
        ? 'Високи академски постигнувања, учество на натпревари или сертификати во соодветната област.'
        : 'Top grades, competition awards, or certifications in the subject you wish to teach.',
    },
    {
      title: isMk ? 'Статус на ученик или студент' : 'Student Status',
      desc: isMk
        ? 'Да бидете активен средношколец или студент со страст за споделување знаење.'
        : 'Be an active high school or university student eager to share knowledge.',
    },
    {
      title: isMk ? 'Возраст од најмалку 16 години' : 'Minimum Age of 16 Years',
      desc: isMk
        ? 'Задолжителна возраст од најмалку 16 години за можност за потпишување договор за менторство.'
        : 'Must be at least 16 years old to sign a mentorship contract.',
    },
    {
      title: isMk ? 'Одлични комуникациски вештини' : 'Good Communication Skills',
      desc: isMk
        ? 'Трпение, емпатија и способност да ги објасните сложените концепти на едноставен начин.'
        : 'Patience, empathy, and the ability to explain complex concepts clearly.',
    },
    {
      title: isMk ? 'Стабилна интернет врска и опрема' : 'Reliable Tech Setup',
      desc: isMk
        ? 'Компјутер со функционален микрофон, веб камера и стабилен интернет за одржување часови.'
        : 'Computer with a working mic, webcam, and stable internet for online lessons.',
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
              <Award className="w-4 h-4" />
              <span>{isMk ? 'Придружи се на тимот' : 'Join the team'}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-4 tracking-tight">
              {isMk ? (
                <>Зошто да станеш <span className="text-gradient">ментор</span> на PeerUp?</>
              ) : (
                <>Why become a <span className="text-gradient">mentor</span> on PeerUp?</>
              )}
            </h1>
            <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
              {isMk
                ? 'Споделете го Вашето знаење, заработувајте според сопствен распоред и помогнете им на помладите ученици да ги постигнат своите цели.'
                : 'Share your knowledge, earn on your own schedule, and help younger students achieve their academic goals.'}
            </p>
          </div>

          {/* Side-by-Side Lists: Benefits vs Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

            {/* Left Card: Benefits */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dark">
                    {isMk ? 'Вашите придобивки' : 'Your Benefits'}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {isMk ? 'Што добивате како дел од PeerUp' : 'What you gain as part of PeerUp'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {BENEFITS_LIST.map((b, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-muted/40 border border-border/50">
                    <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-dark mb-0.5">{b.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Requirements */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-xl bg-accent/20 text-dark flex items-center justify-center font-bold border border-accent/40">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dark">
                    {isMk ? 'Што е потребно да поседувате' : 'What You Need to Possess'}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {isMk ? 'Услови и квалификации за ментори' : 'Requirements & qualifications for mentors'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {REQUIREMENTS_LIST.map((r, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-muted/40 border border-border/50">
                    <div className="w-6 h-6 rounded-full bg-accent/20 text-dark flex items-center justify-center shrink-0 mt-0.5 border border-accent/40">
                      <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-dark mb-0.5">{r.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Three Benefit Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="bg-card rounded-2xl p-6 text-center shadow-soft border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6" />
              </div>
              <p className="text-2xl font-extrabold text-dark">
                {isMk ? '300-500 ден./час' : '300-500 MKD / hr'}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                {isMk ? 'Атрактивна заработка' : 'Competitive earnings'}
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 text-center shadow-soft border border-border">
              <div className="w-12 h-12 rounded-xl bg-accent/20 text-dark flex items-center justify-center mx-auto mb-3 border border-accent/40">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-extrabold text-dark">
                {isMk ? 'Флексибилен' : 'Flexible'}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                {isMk ? 'Работен распоред' : 'Work schedule'}
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 text-center shadow-soft border border-border">
              <div className="w-12 h-12 rounded-xl bg-green/15 text-green flex items-center justify-center mx-auto mb-3 border border-green/30">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-2xl font-extrabold text-dark">
                {isMk ? 'CV Искуство' : 'CV Experience'}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                {isMk ? 'За Вашата кариера' : 'For your career'}
              </p>
            </div>
          </div>

          {/* Big Visible Eye-Catching Call to Action Button */}
          <div className="text-center bg-card rounded-3xl p-8 sm:p-12 border border-border shadow-soft">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-dark mb-3">
              {isMk ? 'Подготвени сте да станете ментор?' : 'Ready to become a mentor?'}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8">
              {isMk
                ? 'Пополнете ја апликацијата во неколку едноставни чекори и станете дел од нашата заедница.'
                : 'Fill out the application in a few simple steps and join our mentor network.'}
            </p>
            <Link to="/stani-mentor">
              <Button
                variant="default"
                size="lg"
                className="text-lg px-10 py-5 h-auto rounded-2xl shadow-none hover:scale-105 transition-transform font-extrabold inline-flex items-center gap-3 bg-primary hover:bg-primary-600 text-white"
              >
                <span>{isMk ? 'Аплицирај за ментор' : 'Apply to Become a Mentor'}</span>
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
