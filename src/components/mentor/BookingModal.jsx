import { useState } from 'react'
import { X, CheckCircle, Calendar, Clock } from 'lucide-react'
import { Button } from '../ui/Button'

export function BookingModal({ isOpen, mentor, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen || !mentor) return null

  const handleClose = () => {
    setIsSuccess(false)
    setErrorMsg('')
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim() || !subject) {
      setErrorMsg('Ве молиме пополнете ги сите задолжителни полиња.')
      return
    }

    setIsSubmitting(true)
    setErrorMsg('')

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071b3a]/70 dark:bg-slate-950/80 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-card border border-border rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
          aria-label="Затвори"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green/15 text-green flex items-center justify-center mx-auto mb-2 border border-green/30">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Успешно резервирано!</h3>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
              Резервацијата за час со <strong className="text-foreground">{mentor.name}</strong> е примена. Наскоро ќе ве контактираме на <strong className="text-foreground">{email}</strong> со детали за пристап и плаќање.
            </p>
            <div className="pt-4">
              <Button variant="default" onClick={handleClose} className="w-full">
                Во ред
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Закажи час со {mentor.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-xl">{mentor.avatar}</span>
                <span className="text-primary font-medium">{mentor.badge || 'Верификуван ментор'}</span>
                <span>•</span>
                <span className="font-bold text-foreground">€{mentor.price}/час</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-muted text-foreground border border-border text-sm font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Info */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Твои податоци
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Име и презиме *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Внеси име и презиме"
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tvojo@email.com"
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+389 7X XXX XXX"
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Lesson Details */}
              <div className="space-y-3 pt-2 border-t border-border">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Детали за часот
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Предмет *
                  </label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all cursor-pointer"
                  >
                    <option value="" className="bg-card text-foreground">Избери предмет</option>
                    {mentor.subjects?.map((s, idx) => (
                      <option key={idx} value={s} className="bg-card text-foreground">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Датум (по избор)
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Време (по избор)
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Дополнителни белешки (опционално)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Наведи дали имаш специфични барања или прашања..."
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Price calculation */}
              <div className="bg-muted rounded-2xl p-4 flex items-center justify-between text-sm border border-border">
                <div>
                  <span className="text-muted-foreground">Времетраење: </span>
                  <span className="font-semibold text-foreground">60 минути</span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">Вкупно: </span>
                  <span className="text-lg font-bold text-primary">€{mentor.price}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                loading={isSubmitting}
              >
                Потврди резервација
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                По потврдата ќе добиеш email со детали за поврзување и плаќање
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
