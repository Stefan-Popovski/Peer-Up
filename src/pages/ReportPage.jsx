import { useState } from 'react'
import { ShieldAlert, CheckCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Card, Input, Select, Button } from '../components/ui'

export function ReportPage() {
  usePageMeta({ 
    title: 'Пријави проблем', 
    description: 'Доверливо пријавување на проблеми и несоодветно однесување.' 
  })

  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', type: '', description: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 600))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Dark Navy Header */}
      <div className="bg-[#071b3a] dark:bg-slate-900 py-14 border-b border-border">
        <div className="container-base text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-accent mb-4 border border-accent/30">
            <ShieldAlert className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-extrabold text-white md:text-4xl">Пријави проблем</h1>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Сите пријави ги сфаќаме сериозно. Вашата пријава е строго доверлива и ќе биде итно разгледана од нашиот тим за безбедност.
          </p>
        </div>
      </div>

      <div className="container-base py-12 max-w-2xl">
        <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Назад кон Контакт
        </Link>

        <Card padding="lg" className="border border-border shadow-card">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8">
              <CheckCircle className="h-16 w-16 text-green mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Пријавата е успешно испратена</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md text-sm">
                Ви благодариме што ни помогнавте да ја одржиме платформата безбедна. Нашиот тим ќе ве контактира наскоро доколку се потребни дополнителни информации.
              </p>
              <Button variant="default" onClick={() => setSubmitted(false)}>
                Пријави друг проблем
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Име и презиме (Опционално)"
                placeholder="Вашето име"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Е-пошта"
                type="email"
                required
                placeholder="ana@primer.mk"
                hint="Задолжително, за да можеме да ве известиме за статусот на пријавата."
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Select
                label="Тип на проблем"
                required
                options={[
                  { value: 'behavior', label: 'Несоодветно однесување од ментор/ученик' },
                  { value: 'safety',   label: 'Безбедносна закана' },
                  { value: 'payment',  label: 'Проблем со плаќање' },
                  { value: 'other',    label: 'Друго' },
                ]}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="Избери категорија..."
              />
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-semibold text-foreground">
                  Детален опис <span className="text-primary" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  rows={5}
                  placeholder="Опишете што точно се случи..."
                  className="rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none placeholder:text-muted-foreground"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              
              <div className="pt-2 border-t border-border">
                <Button 
                  type="submit" 
                  variant="default" 
                  fullWidth 
                  loading={sending} 
                  disabled={!formData.email || !formData.type || !formData.description}
                >
                  Испрати пријава
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Со испраќањето потврдувате дека наведените информации се точни.
                </p>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
