import { Link } from 'react-router-dom'
import { Star, Award, Clock, ArrowUpRight } from 'lucide-react'
import { Button } from '../ui/Button'

export function MentorCard({ mentor, onBook, className = '' }) {
  if (!mentor) return null

  return (
    <div
      className={`bg-card rounded-2xl p-6 shadow-soft hover:shadow-hover border border-border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Mentor Header */}
        <Link
          to={`/mentor/${mentor.slug}`}
          className="flex items-center gap-4 mb-4 group cursor-pointer"
          aria-label={mentor.name}
        >
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform shadow-sm">
            {mentor.avatar || '🧑‍🎓'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-dark text-base group-hover:text-primary transition-colors flex items-center gap-1">
              <span className="truncate">{mentor.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="w-4 h-4 text-accent fill-accent shrink-0" />
              <span className="text-sm font-bold text-dark">{mentor.rating}</span>
              <span className="text-xs text-muted-foreground">({mentor.reviews})</span>
            </div>
          </div>
        </Link>

        {/* Badge */}
        {mentor.badge && (
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs text-primary font-medium line-clamp-1">
              {mentor.badge}
            </span>
          </div>
        )}

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {mentor.subjects?.map((subj, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-muted text-dark text-xs rounded-full font-medium border border-border/50"
            >
              {subj}
            </span>
          ))}
        </div>
      </div>

      <div>
        {/* Price & Availability */}
        <div className="flex items-center justify-between mb-4 pt-3 border-t border-border/60">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span
              className={`text-xs font-semibold ${
                mentor.available ? 'text-green' : 'text-muted-foreground'
              }`}
            >
              {mentor.available ? 'Достапен' : 'Зафатен'}
            </span>
          </div>
          <p className="text-lg font-bold text-dark">
            €{mentor.price}
            <span className="text-xs text-muted-foreground font-normal">/час</span>
          </p>
        </div>

        {/* Action Button */}
        <Button
          variant={mentor.available ? 'default' : 'outline'}
          size="default"
          className="w-full"
          disabled={!mentor.available}
          onClick={() => onBook && onBook(mentor)}
        >
          {mentor.available ? 'Закажи час' : 'Зафатен'}
        </Button>
      </div>
    </div>
  )
}
