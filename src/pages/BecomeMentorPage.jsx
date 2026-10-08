import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, DollarSign, Calendar, Award, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { supabase } from '../lib/supabase'

const SUBJECT_OPTIONS = [
  'Математика',
  'Физика',
  'Хемија',
  'Биологија',
  'Англиски',
  'Германски',
  'Програмирање',
  'Историја',
]

export function BecomeMentorPage() {
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    if (selectedSubjects.length === 0) {
      setErrorMsg('Ве молиме изберете барем еден предмет што сакате да го предавате.')
      return
    }

    const payload = {
      firstName: formData.get('firstName')?.toString().trim(),
      lastName: formData.get('lastName')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      education: formData.get('education')?.toString().trim(),
      achievements: formData.get('achievements')?.toString().trim(),
      motivation: formData.get('motivation')?.toString().trim() || '',
      availability: formData.get('availability')?.toString().trim(),
      subjects: selectedSubjects,
    }

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone || !payload.education || !payload.achievements || !payload.availability) {
      setErrorMsg('Ве молиме пополнете ги сите задолжителни полиња.')
      return
    }

    setErrorMsg('')
    setSubmitting(true)

    try {
      if (supabase) {
        await supabase.from('mentor_applications').insert({
          first_name: payload.firstName,
          last_name: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          education: payload.education,
          achievements: payload.achievements,
          motivation: payload.motivation || null,
          availability: payload.availability,
          subjects: payload.subjects,
        })
      }
    } catch (err) {
      console.warn('Backend warning:', err)
    } finally {
      setTimeout(() => {
        setSubmitting(false)
        setSuccess(true)
        form.reset()
        setSelectedSubjects([])
      }, 500)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2" aria-label="PeerUp">
              <img src="/logo.svg" alt="PeerUp Logo" className="h-10 w-auto object-contain" />
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
                <Award className="w-4 h-4" />
                <span>Придружи се на тимот</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
                Стани <span className="text-gradient">ментор</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                Сподели го твоето знаење и заработи додека им помагаш на помладите ученици да ги постигнат своите цели.
              </p>
            </div>

            {/* Benefits Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-card rounded-2xl p-5 text-center shadow-soft border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6" />
                </div>
                <p className="text-xl font-bold text-dark">€6-12/час</p>
                <p className="text-xs text-muted-foreground mt-0.5">Конкурентна заработка</p>
              </div>

              <div className="bg-card rounded-2xl p-5 text-center shadow-soft border border-border">
                <div className="w-12 h-12 rounded-xl bg-accent/20 text-dark flex items-center justify-center mx-auto mb-3 border border-accent/40">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xl font-bold text-dark">Флексибилно</p>
                <p className="text-xs text-muted-foreground mt-0.5">Твој сопствен распоред</p>
              </div>

              <div className="bg-card rounded-2xl p-5 text-center shadow-soft border border-border">
                <div className="w-12 h-12 rounded-xl bg-green/15 text-green flex items-center justify-center mx-auto mb-3 border border-green/30">
                  <Award className="w-6 h-6" />
                </div>
                <p className="text-xl font-bold text-dark">CV Искуство</p>
                <p className="text-xs text-muted-foreground mt-0.5">Вредно за твојата кариера</p>
              </div>
            </div>

            {/* Application Form Card */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-card border border-border">
              {success ? (
                <div className="py-12 text-center space-y-5 animate-fade-in-up">
                  <div className="w-20 h-20 rounded-full bg-green/15 text-green flex items-center justify-center mx-auto border border-green/30">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-dark">
                    Апликацијата е успешно испратена!
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
                    Ти благодариме за интересот. Нашиот тим ќе ги разгледа твоите информации и ќе те контактира во најкраток можен рок за следните чекори.
                  </p>
                  <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="default" onClick={() => setSuccess(false)}>
                      Испрати нова апликација
                    </Button>
                    <Link to="/">
                      <Button variant="outline">
                        Назад на почетна
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-2">
                    Пополни ја апликацијата
                  </h2>
                  <p className="text-sm text-muted-foreground mb-8">
                    Сите полиња означени со ѕвездичка (*) се задолжителни.
                  </p>

                  {errorMsg && (
                    <div className="p-4 mb-6 rounded-xl bg-dark/10 text-dark border border-dark/20 text-sm flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="firstName" className="block text-xs font-semibold text-dark">
                          Име *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          maxLength={50}
                          placeholder="Внеси го твоето име"
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="lastName" className="block text-xs font-semibold text-dark">
                          Презиме *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          maxLength={50}
                          placeholder="Внеси го твоето презиме"
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-xs font-semibold text-dark">
                          Емаил адреса *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          maxLength={100}
                          placeholder="example@email.com"
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block text-xs font-semibold text-dark">
                          Телефонски број *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          maxLength={20}
                          placeholder="+389 XX XXX XXX"
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Education */}
                    <div className="space-y-1.5">
                      <label htmlFor="education" className="block text-xs font-semibold text-dark">
                        Образование и факултет/училиште *
                      </label>
                      <input
                        id="education"
                        name="education"
                        type="text"
                        required
                        maxLength={120}
                        placeholder="пр. Студент на ФИНКИ, 2ра година / ПСУ Јахја Кемал"
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      />
                    </div>

                    {/* Subjects Checklist */}
                    <div className="space-y-2.5">
                      <label className="block text-xs font-semibold text-dark">
                        Предмети што сакаш да ги предаваш *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {SUBJECT_OPTIONS.map((subj) => {
                          const isChecked = selectedSubjects.includes(subj)
                          return (
                            <button
                              type="button"
                              key={subj}
                              onClick={() => toggleSubject(subj)}
                              className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all text-left cursor-pointer ${
                                isChecked
                                  ? 'border-primary bg-primary/10 text-primary font-bold ring-1 ring-primary'
                                  : 'border-border bg-background text-dark hover:border-primary/50'
                              }`}
                            >
                              <span>{subj}</span>
                              <span
                                className={`w-4 h-4 rounded-md border flex items-center justify-center text-xs ${
                                  isChecked
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-border'
                                }`}
                              >
                                {isChecked ? '✓' : ''}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                      {selectedSubjects.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          * Избери барем еден предмет
                        </p>
                      )}
                    </div>

                    {/* Achievements */}
                    <div className="space-y-1.5">
                      <label htmlFor="achievements" className="block text-xs font-semibold text-dark">
                        Достигнувања, натпревари и искуство *
                      </label>
                      <textarea
                        id="achievements"
                        name="achievements"
                        rows={4}
                        required
                        maxLength={1000}
                        placeholder="Опиши ги твоите академски достигнувања, учества на државни/меѓународни натпревари, олимпијади, сертификати или претходно искуство со предавање..."
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Motivation */}
                    <div className="space-y-1.5">
                      <label htmlFor="motivation" className="block text-xs font-semibold text-dark">
                        Зошто сакаш да бидеш ментор? (опционално)
                      </label>
                      <textarea
                        id="motivation"
                        name="motivation"
                        rows={3}
                        maxLength={500}
                        placeholder="Кажи ни повеќе за твојата мотивација и твојот пристап кон учењето..."
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Availability */}
                    <div className="space-y-1.5">
                      <label htmlFor="availability" className="block text-xs font-semibold text-dark">
                        Неделна достапност *
                      </label>
                      <input
                        id="availability"
                        name="availability"
                        type="text"
                        required
                        maxLength={100}
                        placeholder="пр. 8-12 часа неделно, попладне и викенди"
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        className="w-full gap-2 text-base shadow-soft"
                        disabled={submitting || selectedSubjects.length === 0}
                        loading={submitting}
                      >
                        {submitting ? 'Се испраќа...' : 'Испрати апликација'}
                        {!submitting && <Send className="w-5 h-5 ml-1" />}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
