import { cn } from '../../lib/utils'

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export function Card({ hover = false, padding = 'md', className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-3xl bg-card border border-border shadow-soft',
        hover && 'transition-all duration-300 hover:shadow-hover hover:-translate-y-1',
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
