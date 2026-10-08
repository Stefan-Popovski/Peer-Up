import { cn, getInitials, getAvatarColor } from '../../lib/utils'

const sizeClasses = {
  sm:  'h-8 w-8 text-xs',
  md:  'h-10 w-10 text-sm',
  lg:  'h-16 w-16 text-xl',
  xl:  'h-24 w-24 text-3xl',
}

export function Avatar({ name, photoUrl, size = 'md', className }) {
  const initials = getInitials(name)
  const colorClass = getAvatarColor(name)

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className={cn('rounded-full object-cover', sizeClasses[size], className)}
      />
    )
  }

  return (
    <div
      aria-label={name}
      className={cn(
        'flex items-center justify-center rounded-full font-semibold select-none',
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {initials}
    </div>
  )
}
