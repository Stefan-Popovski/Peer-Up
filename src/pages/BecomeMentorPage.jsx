import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, DollarSign, Calendar, Award, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'

export function BecomeMentorPage() {
  const { language } = useLanguage()
  const isMk = language !== 'en'

  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [fields, setFields] = useState({
    firstName: '', lastName: '', birthDate: '',
    email: '', phone: '', education: '',
    achievements: '', availability: '',
  })

  const setField = (name, value) =>
    setFields((prev) => ({ ...prev, [name]: value }))

  const isFormValid =
    Object.values(fields).every((v) => v.trim() !== '') &&
    selectedSubjects.length > 0

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Subject options always stored in Macedonian (DB values), displayed in active language
  const SUBJECT_OPTIONS = useMemo(() => [
    { value: 'Математика',   label: isMk ? 'Математика'   : 'Mathematics'     },
    { value: 'Физика',       label: isMk ? 'Физика'       : 'Physics'         },
    { value: 'Хемија',       label: isMk ? 'Хемија'       : 'Chemistry'       },
    { value: 'Биологија',    label: isMk ? 'Биологија'    : 'Biology'         },
    { value: 'Англиски',     label: isMk ? 'Англиски'     : 'English'         },
    { value: 'Германски',    label: isMk ? 'Германски'    : 'German'          },
    { value: 'Програмирање', label: isMk ? 'Програмирање' : 'Programming'     },
    { value: 'Историја',     label: isMk ? 'Историја'     : 'History'         },
    { value: 'Останато',     label: isMk ? 'Останато'     : 'Other'           },
  ], [isMk])

  const toggleSubject = (value) => {
    setSelectedSubjects((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    if (selectedSubjects.length === 0) {
      setErrorMsg(
        isMk
          ? 'Ве молиме изберете барем еден предмет што сакате да го предавате.'
          : 'Please select at least one subject you would like to teach.'
      )
      return
    }

    const payload = {
      firstName:    formData.get('firstName')?.toString().trim(),
      lastName:     formData.get('lastName')?.toString().trim(),
      birthDate:    formData.get('birthDate')?.toString().trim(),
      email:        formData.get('email')?.toString().trim(),
      phone:        formData.get('phone')?.toString().trim(),
      education:    formData.get('education')?.toString().trim(),
      achievements: formData.get('achievements')?.toString().trim(),
      motivation:   formData.get('motivation')?.toString().trim() || '',
      availability: formData.get('availability')?.toString().trim(),
      subjects:     selectedSubjects,
    }

    if (
      !payload.firstName || !payload.lastName || !payload.birthDate ||
      !payload.email || !payload.phone || !payload.education ||
      !payload.achievements || !payload.availability
    ) {
      setErrorMsg(
        isMk
          ? 'Ве молиме пополнете ги сите задолжителни полиња.'
          : 'Please fill in all required fields.'
      )
      return
    }

    setErrorMsg('')
    setSubmitting(true)

    try {
      if (supabase) {
        await supabase.from('mentor_applications').insert({
          first_name:   payload.firstName,
          last_name:    payload.lastName,
          birth_date:   payload.birthDate,
          email:        payload.email,
          phone:        payload.phone,
          education:    payload.education,
          achievements: payload.achievements,
          motivation:   payload.motivation || null,
          availability: payload.availability,
          subjects:     payload.subjects,
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
        setFields({ firstName: '', lastName: '', birthDate: '', email: '', phone: '', education: '', achievements: '', availability: '' })
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
              <img src="/logo.svg" alt="PeerUp Logo" className="h-20 w-auto object-contain" />
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {isMk ? 'Назад' : 'Back'}
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
                <span>{isMk ? 'Придружи се на тимот' : 'Join the team'}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
                {isMk ? (
                  <>Стани <span className="text-gradient">ментор</span>!</>
                ) : (
                  <>Become a <span className="text-gradient">mentor</span>!</>
                )}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                {isMk
                  ? 'Споделете го Вашето знаење и заработете додека им помагате на помладите ученици да ги постигнат своите цели.'
                  : 'Share your knowledge and earn while helping younger students achieve their academic goals.'}
              </p>
            </div>

            {/* Benefits Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-card rounded-2xl p-5 text-center shadow-soft border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6" />
                </div>
                <p className="text-xl font-bold text-dark">
                  {isMk ? '300-600 ден./час' : '€8-12 / hr'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isMk ? 'Заработка' : 'Earnings'}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-5 text-center shadow-soft border border-border">
                <div className="w-12 h-12 rounded-xl bg-accent/20 text-dark flex items-center justify-center mx-auto mb-3 border border-accent/40">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xl font-bold text-dark">
                  {isMk ? 'Флексибилно' : 'Flexible'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isMk ? 'Распоред' : 'Schedule'}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-5 text-center shadow-soft border border-border">
                <div className="w-12 h-12 rounded-xl bg-green/15 text-green flex items-center justify-center mx-auto mb-3 border border-green/30">
                  <Award className="w-6 h-6" />
                </div>
                <p className="text-xl font-bold text-dark">
                  {isMk ? 'CV Искуство' : 'CV Experience'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isMk ? 'За Вашата кариера' : 'For your career'}
                </p>
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
                    {isMk ? 'Апликацијата е успешно испратена!' : 'Application submitted successfully!'}
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
                    {isMk
                      ? 'Ти благодариме за интересот. Нашиот тим ќе ги разгледа твоите информации и ќе те контактира во најкраток можен рок за следните чекори.'
                      : 'Thank you for your interest. Our team will review your details and contact you as soon as possible about the next steps.'}
                  </p>
                  <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="default" onClick={() => setSuccess(false)}>
                      {isMk ? 'Испрати нова апликација' : 'Submit another application'}
                    </Button>
                    <Link to="/">
                      <Button variant="outline">
                        {isMk ? 'Назад на почетна' : 'Back to home'}
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-2">
                    {isMk ? 'Пополни ја апликацијата' : 'Fill out the application'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-8">
                    {isMk
                      ? 'Сите полиња означени со ѕвездичка (*) се задолжителни.'
                      : 'All fields marked with an asterisk (*) are required.'}
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
                          {isMk ? 'Име' : 'First name'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          maxLength={50}
                          placeholder={isMk ? 'Внесете го Вашето име' : 'Enter your first name'}
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="lastName" className="block text-xs font-semibold text-dark">
                          {isMk ? 'Презиме' : 'Last name'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          maxLength={50}
                          placeholder={isMk ? 'Внесете го Вашето презиме' : 'Enter your last name'}
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Date of Birth & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="birthDate" className="block text-xs font-semibold text-dark">
                          {isMk ? 'Датум на раѓање' : 'Date of birth'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="birthDate"
                          name="birthDate"
                          type="text"
                          required
                          maxLength={10}
                          placeholder={isMk ? 'дд/мм/гг' : 'dd/mm/yy'}
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block text-xs font-semibold text-dark">
                          {isMk ? 'Телефонски број' : 'Phone number'} <span className="text-red-500">*</span>
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

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-semibold text-dark">
                        {isMk ? 'Емаил адреса' : 'Email address'} <span className="text-red-500">*</span>
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

                    {/* Education */}
                    <div className="space-y-1.5">
                      <label htmlFor="education" className="block text-xs font-semibold text-dark">
                        {isMk
                          ? 'Образование и факултет/училиште'
                          : 'Education & faculty / school'}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="education"
                        name="education"
                        type="text"
                        required
                        maxLength={120}
                        placeholder={
                          isMk
                            ? 'пр. Студент на ФИНКИ, 2ра година / ПСУ Јахја Кемал'
                            : 'e.g. FINKI student, 2nd year / Yahya Kemal High School'
                        }
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      />
                    </div>

                    {/* Subjects Checklist */}
                    <div className="space-y-2.5">
                      <label className="block text-xs font-semibold text-dark">
                        {isMk
                          ? 'Предмети што сакате да ги предавате'
                          : 'Subjects you would like to teach'}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {SUBJECT_OPTIONS.map(({ value, label }) => {
                          const isChecked = selectedSubjects.includes(value)
                          return (
                            <button
                              type="button"
                              key={value}
                              onClick={() => toggleSubject(value)}
                              className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all text-left cursor-pointer ${
                                isChecked
                                  ? 'border-primary bg-primary/10 text-primary font-bold ring-1 ring-primary'
                                  : 'border-border bg-background text-dark hover:border-primary/50'
                              } ${value === 'Останато' ? 'col-span-2 sm:col-span-1' : ''}`}
                            >
                              <span>{label}</span>
                              <span
                                className={`w-4 h-4 rounded-md border flex items-center justify-center text-xs ${
                                  isChecked ? 'border-primary bg-primary text-white' : 'border-border'
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
                          {isMk ? '* Избери барем еден предмет' : '* Select at least one subject'}
                        </p>
                      )}
                    </div>

                    {/* Achievements */}
                    <div className="space-y-1.5">
                      <label htmlFor="achievements" className="block text-xs font-semibold text-dark">
                        {isMk
                          ? 'Достигнувања, натпревари и искуство'
                          : 'Achievements, competitions & experience'}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="achievements"
                        name="achievements"
                        rows={4}
                        required
                        maxLength={1000}
                        placeholder={
                          isMk
                            ? 'Опиши ги твоите академски достигнувања, учества на државни/меѓународни натпревари, олимпијади, сертификати или претходно искуство со предавање...'
                            : 'Describe your academic achievements, participation in national/international competitions, olympiads, certifications, or previous teaching experience...'
                        }
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Motivation */}
                    <div className="space-y-1.5">
                      <label htmlFor="motivation" className="block text-xs font-semibold text-dark">
                        {isMk ? 'Зошто сакате да бидете ментор?' : 'Why do you want to be a mentor?'}
                      </label>
                      <textarea
                        id="motivation"
                        name="motivation"
                        rows={3}
                        maxLength={500}
                        placeholder={
                          isMk
                            ? 'Кажи ни повеќе за Вашата мотивација и Вашиот пристап кон учењето...'
                            : 'Tell us more about your motivation and your approach to learning...'
                        }
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-dark placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Availability */}
                    <div className="space-y-1.5">
                      <label htmlFor="availability" className="block text-xs font-semibold text-dark">
                        {isMk ? 'Неделна достапност' : 'Weekly availability'}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="availability"
                        name="availability"
                        type="text"
                        required
                        maxLength={100}
                        placeholder={
                          isMk
                            ? 'пр. 8-12 часа неделно, попладне и викенди'
                            : 'e.g. 8-12 hours per week, afternoons and weekends'
                        }
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
                        {submitting
                          ? (isMk ? 'Се испраќа...' : 'Sending…')
                          : (isMk ? 'Испрати апликација' : 'Submit application')}
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
