import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, Atom, FlaskConical, Dna, Globe, Languages, Code, BookOpen, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ALL_MENTORS } from '../data/mentors'

const SUBJECTS_DATA = [
  {
    key: 'math',
    name: 'Математика',
    icon: Calculator,
    count: 45,
    color: 'bg-primary/10 text-primary border-primary/20',
    description: 'Од основни аритметички операции до виша математика, алгебра, геометрија, тригонометрија и диференцијални равенки.',
    topics: ['Алгебра и функции', 'Планиметрија и стереометрија', 'Тригонометрија', 'Државна матура', 'Олимпијади и натпревари'],
  },
  {
    key: 'physics',
    name: 'Физика',
    icon: Atom,
    count: 32,
    color: 'bg-accent/20 text-dark border-accent/40',
    description: 'Разбирање на природните закони низ практични експерименти, решавање сложени физички проблеми и припрема за натпревари.',
    topics: ['Класична механика', 'Електромагнетизам', 'Термодинамика', 'Оптика и бранови', 'Решавање задачи за натпревар'],
  },
  {
    key: 'chemistry',
    name: 'Хемија',
    icon: FlaskConical,
    count: 28,
    color: 'bg-green/15 text-green border-green/30',
    description: 'Органска и неорганска хемија, хемиски равенки, стехиометрија, периодниот систем и подготовка за училишни тестови.',
    topics: ['Општа и неорганска хемија', 'Органска хемија и реакции', 'Стехиометрија', 'Хемиско рамнотежа', 'Лабораториски концепти'],
  },
  {
    key: 'biology',
    name: 'Биологија',
    icon: Dna,
    count: 25,
    color: 'bg-primary/10 text-primary border-primary/20',
    description: 'Клеточна биологија, анатомија на човекот, генетика, екологија и еволуција со фокус на разбирање на животните процеси.',
    topics: ['Цитологија и генетика', 'Човечка анатомија и физиологија', 'Ботаника и зоологија', 'Екологија', 'Подготовка за матура'],
  },
  {
    key: 'english',
    name: 'Англиски јазик',
    icon: Globe,
    count: 50,
    color: 'bg-accent/20 text-dark border-accent/40',
    description: 'Граматика, пишување есеи, разговорна течност, проширување на вокабулар и подготовка за меѓународни испити како IELTS и TOEFL.',
    topics: ['Конверзација и изговор', 'Граматички структури', 'Пишување академски есеи', 'Подготовка за IELTS / TOEFL', 'Училишна програма'],
  },
  {
    key: 'german',
    name: 'Германски јазик',
    icon: Languages,
    count: 20,
    color: 'bg-green/15 text-green border-green/30',
    description: 'Изучување на германски јазик од почетно ниво (A1) до напредно (B2/C1) со интерактивни разговори и граматички вежби.',
    topics: ['Почетни нивоа A1-A2', 'Средни нивоа B1-B2', 'Германска граматика', 'Конверзациски часови', 'Goethe испити'],
  },
  {
    key: 'programming',
    name: 'Програмирање',
    icon: Code,
    count: 35,
    color: 'bg-primary/10 text-primary border-primary/20',
    description: 'Основи на програмирање, алгоритми, структури на податоци, веб технологии и подготовка за натпревари по информатика.',
    topics: ['Python за почетници', 'C++ и алгоритми', 'Веб програмирање (HTML, CSS, JS)', 'Структури на податоци', 'Олимпијади по информатика'],
  },
  {
    key: 'history',
    name: 'Историја',
    icon: BookOpen,
    count: 18,
    color: 'bg-dark/10 text-dark border-dark/20',
    description: 'Македонска и општа светска историја низ фасцинантни приказни, хронологија, историски извори и припрема за матура.',
    topics: ['Античка и средновековна историја', 'Нов век и современа историја', 'Македонска национална историја', 'Подготовка за матура', 'Анализа на историски настани'],
  },
]

export function SubjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Предмети и наставни области</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-6 leading-tight max-w-4xl mx-auto">
            Најди ментор за <span className="text-gradient">секој училиштен предмет</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Сите предмети се покриени од ментори кои ги совладале истите со максимални оценки и олимписки признанија.
          </p>
          <div className="flex justify-center">
            <Link to="/mentori">
              <Button variant="hero" size="lg">
                Прегледај ги сите ментори
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUBJECTS_DATA.map((subject) => {
            const Icon = subject.icon
            const actualCount = ALL_MENTORS.filter((m) =>
              m.subjects.some((s) => s.toLowerCase().includes(subject.name.toLowerCase()))
            ).length

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
                      {actualCount || subject.count}+ ментори
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                    {subject.description}
                  </p>
                  <div className="space-y-1.5 mb-6">
                    {subject.topics.slice(0, 3).map((t, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-dark/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green shrink-0" />
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to={`/mentori?subject=${encodeURIComponent(subject.name)}`}>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Види ментори за {subject.name}
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Custom Subject Request */}
        <div className="mt-16 bg-muted/50 rounded-3xl p-8 border border-border text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-dark mb-2">
            Не го гледаш предметот што ти треба?
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Имаме мрежа на одлични ментори и можеме да најдеме специјализиран ментор за било кој училишен или факултетски предмет.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button variant="default">
                Побарај предмет
              </Button>
            </Link>
            <Link to="/stani-mentor">
              <Button variant="outline">
                Пријави се за ментор
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
