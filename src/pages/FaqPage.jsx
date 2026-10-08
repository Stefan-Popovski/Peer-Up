import { useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FAQ_CATEGORIES } from '../data/faq'
import { Button } from '../components/ui/Button'

export function FaqPage() {
  const [openMap, setOpenMap] = useState({})

  const toggle = (catId, idx) => {
    const key = `${catId}-${idx}`
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Помош и поддршка</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-4 leading-tight max-w-3xl mx-auto">
            Често поставувани <span className="text-gradient">прашања</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Сè што треба да знаеш за PeerUp платформата, менторите, часовите и безбедноста.
          </p>
        </div>
      </section>

      {/* Categories */}
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl space-y-10">
        {FAQ_CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-soft">
            <h2 className="text-xl font-bold text-dark mb-6 pb-3 border-b border-border">
              {cat.title}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item, idx) => {
                const key = `${cat.id}-${idx}`
                const isOpen = !!openMap[key]
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border overflow-hidden bg-background"
                  >
                    <button
                      onClick={() => toggle(cat.id, idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-dark text-sm sm:text-base hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-dark/80 leading-relaxed border-t border-border bg-muted/40 animate-fade-in-up">
                        {item.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Contact banner */}
        <div className="rounded-3xl bg-primary/10 border border-primary/20 p-8 text-center max-w-2xl mx-auto shadow-sm">
          <h3 className="text-lg font-bold text-dark mb-2">Не го најде твојот одговор?</h3>
          <p className="text-sm text-muted-foreground mb-5">
            Нашиот тим е тука за тебе. Пиши ни и ќе ти одговориме наскоро!
          </p>
          <Link to="/contact">
            <Button variant="default">
              Контактирај нè
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
