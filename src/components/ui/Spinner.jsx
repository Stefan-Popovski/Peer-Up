import { cn } from '../../lib/utils'

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-[3px]',
}

export function Spinner({ size = 'md', className, label = 'Се вчитува…' }) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'animate-spin rounded-full border-current border-r-transparent',
        sizeClasses[size],
        className
      )}
    />
  )
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size="lg" className="text-primary" />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 shadow-card" aria-hidden="true">
      <div className="flex items-start gap-4">
        <div className="skeleton h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-5 w-32 rounded" />
          <div className="skeleton h-4 w-24 rounded" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="mt-4">
        <div className="skeleton h-10 w-full rounded-xl" />
      </div>
    </div>
  )
}
