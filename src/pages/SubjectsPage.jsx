import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, Atom, FlaskConical, Dna, Globe, Languages, Code, BookOpen, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'

export function SubjectsPage() {
  const { t, language } = useLanguage()
  const isMk = language !== 'en'

  const subjects = useMemo(() => [
    {
      key: 'math',
      name: isMk ? 'Математика' : 'Mathematics',
      filterName: 'Математика',
      icon: Calculator,
      count: 45,
      color: 'bg-primary/10 text-primary border-primary/20',
      description: isMk
        ? 'Од основни аритметички операции до виша математика, алгебра, геометрија, тригонометрија и диференцијални равенки.'
        : 'From basic arithmetic to advanced mathematics, algebra, geometry, trigonometry, and differential equations.',
      topics: isMk
        ? ['Алгебра и функции', 'Планиметрија и стереометрија', 'Тригонометрија', 'Државна матура', 'Олимпијади и натпревари']
        : ['Algebra & functions', 'Geometry & trigonometry', 'Calculus basics', 'State matriculation', 'Olympiads & competitions'],
    },
    {
      key: 'physics',
      name: isMk ? 'Физика' : 'Physics',
      filterName: 'Физика',
      icon: Atom,
      count: 32,
      color: 'bg-accent/20 text-dark border-accent/40',
      description: isMk
        ? 'Разбирање на природните закони низ практични експерименти, решавање сложени физички проблеми и припрема за натпревари.'
        : 'Understanding laws of nature through experiments, complex physics problem solving, and competition preparation.',
      topics: isMk
        ? ['Класична механика', 'Електромагнетизам', 'Термодинамика', 'Оптика и бранови', 'Решавање задачи за натпревар']
        : ['Classical mechanics', 'Electromagnetism', 'Thermodynamics', 'Optics & waves', 'Competition problem solving'],
    },
    {
      key: 'chemistry',
      name: isMk ? 'Хемија' : 'Chemistry',
      filterName: 'Хемија',
      icon: FlaskConical,
      count: 28,
      color: 'bg-green/15 text-green border-green/30',
      description: isMk
        ? 'Органска и неорганска хемија, хемиски равенки, стехиометрија, периодниот систем и подготовка за училишни тестови.'
        : 'Organic and inorganic chemistry, chemical equations, stoichiometry, periodic table, and school exam preparation.',
      topics: isMk
        ? ['Општа и неорганска хемија', 'Органска хемија и реакции', 'Стехиометрија', 'Хемиско рамнотежа', 'Лабораториски концепти']
        : ['General & inorganic chemistry', 'Organic reactions', 'Stoichiometry', 'Chemical equilibrium', 'Lab concepts'],
    },
    {
      key: 'biology',
      name: isMk ? 'Биологија' : 'Biology',
      filterName: 'Биологија',
      icon: Dna,
      count: 25,
      color: 'bg-primary/10 text-primary border-primary/20',
      description: isMk
        ? 'Клеточна биологија, анатомија на човекот, генетика, екологија и еволуција со фокус на разбирање на животните процеси.'
        : 'Cell biology, human anatomy, genetics, ecology, and evolution focusing on deep understanding of life processes.',
      topics: isMk
        ? ['Цитологија и генетика', 'Човечка анатомија и физиологија', 'Ботаника и зоологија', 'Екологија', 'Подготовка за матура']
        : ['Cytology & genetics', 'Human anatomy & physiology', 'Botany & zoology', 'Ecology', 'Matriculation exam prep'],
    },
    {
      key: 'english',
      name: isMk ? 'Англиски јазик' : 'English Language',
      filterName: 'Англиски',
      icon: Globe,
      count: 50,
      color: 'bg-accent/20 text-dark border-accent/40',
      description: isMk
        ? 'Граматика, пишување есеи, разговорна течност, проширување на вокабулар и подготовка за меѓународни испити како IELTS и TOEFL.'
        : 'Grammar, essay writing, conversational fluency, vocabulary expansion, and international exam prep (IELTS / TOEFL).',
      topics: isMk
        ? ['Конверзација и изговор', 'Граматички структури', 'Пишување академски есеи', 'Подготовка за IELTS / TOEFL', 'Училишна програма']
        : ['Conversation & pronunciation', 'Grammar structures', 'Academic essay writing', 'IELTS / TOEFL preparation', 'School curriculum'],
    },
    {
      key: 'german',
      name: isMk ? 'Германски јазик' : 'German Language',
      filterName: 'Германски',
      icon: Languages,
      count: 20,
      color: 'bg-green/15 text-green border-green/30',
      description: isMk
        ? 'Изучување на германски јазик од почетно ниво (A1) до напредно (B2/C1) со интерактивни разговори и граматички вежби.'
        : 'Learning German from beginner level (A1) to advanced (B2/C1) with interactive conversation and grammar practice.',
      topics: isMk
        ? ['Почетни нивоа A1-A2', 'Средни нивоа B1-B2', 'Германска граматика', 'Конверзациски часови', 'Goethe испити']
        : ['Beginner levels A1-A2', 'Intermediate levels B1-B2', 'German grammar', 'Conversation sessions', 'Goethe exams'],
    },
    {
      key: 'programming',
      name: isMk ? 'Програмирање' : 'Programming',
      filterName: 'Програмирање',
      icon: Code,
      count: 35,
      color: 'bg-primary/10 text-primary border-primary/20',
      description: isMk
        ? 'Основи на програмирање, алгоритми, структури на податоци, веб технологии и подготовка за натпревари по информатика.'
        : 'Programming fundamentals, algorithms, data structures, web technologies, and computer science competitions.',
      topics: isMk
        ? ['Python за почетници', 'C++ и алгоритми', 'Веб програмирање (HTML, CSS, JS)', 'Структури на податоци', 'Олимпијади по информатика']
        : ['Python for beginners', 'C++ & algorithms', 'Web dev (HTML, CSS, JS)', 'Data structures', 'Informatics olympiads'],
    },
    {
      key: 'history',
      name: isMk ? 'Историја' : 'History',
      filterName: 'Историја',
      icon: BookOpen,
      count: 18,
      color: 'bg-dark/10 text-dark border-dark/20',
      description: isMk
        ? 'Македонска и општа светска историја низ фасцинантни приказни, хронологија, историски извори и припрема за матура.'
        : 'Macedonian and world history through fascinating narratives, chronology, primary sources, and matriculation exam prep.',
      topics: isMk
        ? ['Античка и средновековна историја', 'Нов век и современа историја', 'Македонска национална историја', 'Подготовка за матура', 'Анализа на историски настани']
        : ['Ancient & medieval history', 'Modern & contemporary history', 'Macedonian national history', 'Matriculation prep', 'Historical analysis'],
    },
  ], [isMk])

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>{t('subjectsBadge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-6 leading-tight max-w-4xl mx-auto">
            {t('subjectsTitle')} <span className="text-gradient">{t('subjectsTitleHighlight')}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('subjectsSubtitle')}
          </p>
          <div className="flex justify-center">
            <Link to="/mentori">
              <Button variant="hero" size="lg">
                {t('subjectsBrowseAll')}
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon

            return (
              <div
                key={subject.key}
                className="bg-card rounded-3xl p-6 shadow-soft hover:shadow-hover border border-border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${subject.color} flex items-center justify-center mb-5 border shadow-sm`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-dark">
                      {subject.name}
                    </h3>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                      {subject.count}{t('subjectsMentors')}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                    {subject.description}
                  </p>
                  <div className="space-y-1.5 mb-6">
                    {subject.topics.slice(0, 3).map((tTopic, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-dark/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green shrink-0" />
                        <span className="truncate">{tTopic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to={`/mentori?subject=${encodeURIComponent(subject.filterName)}`}>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    {t('subjectsSeeMentors')} {subject.name}
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Custom Subject Request */}
        <div className="mt-16 bg-muted/50 rounded-3xl p-8 border border-border text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-dark mb-2">
            {t('subjectsNotFound')}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {t('subjectsNotFoundDesc')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button variant="default">
                {t('subjectsRequest')}
              </Button>
            </Link>
            <Link to="/stani-mentor-info">
              <Button variant="outline">
                {t('subjectsApplyMentor')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
