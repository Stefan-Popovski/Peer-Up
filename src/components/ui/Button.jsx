import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

const sizeClasses = {
  sm: 'h-9 rounded-lg px-4 text-xs font-semibold',
  default: 'h-11 rounded-xl px-6 py-2 text-sm font-semibold',
  md: 'h-11 rounded-xl px-6 py-2 text-sm font-semibold',
  lg: 'h-14 rounded-2xl px-8 text-base font-semibold',
  icon: 'h-10 w-10 rounded-xl p-0',
}

const variantClasses = {
  default:
    'bg-primary text-white hover:bg-primary-600 shadow-soft hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0',
  primary:
    'bg-primary text-white hover:bg-primary-600 shadow-soft hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0',
  hero:
    'gradient-primary text-white shadow-soft hover:shadow-hover hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0',
  heroOutline:
    'border-2 border-primary/30 bg-card text-foreground hover:border-primary hover:bg-primary/10 active:bg-primary/15',
  secondary:
    'bg-green text-white hover:bg-green-600 shadow-soft hover:shadow-hover hover:-translate-y-0.5',
  outline:
    'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white',
  accent:
    'bg-accent text-[#071b3a] hover:bg-accent-600 font-semibold shadow-soft hover:shadow-hover',
  ghost:
    'hover:bg-muted text-foreground hover:text-primary',
  link:
    'text-primary underline-offset-4 hover:underline p-0 h-auto',
  destructive:
    'bg-[#071b3a] dark:bg-slate-800 text-white hover:bg-[#06162f] dark:hover:bg-slate-700',
}

export const Button = forwardRef(function Button(
  {
    variant = 'default',
    size = 'default',
    loading = false,
    fullWidth = false,
    asChild = false,
    disabled,
    className,
    children,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading
  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size] || sizeClasses.default,
        variantClasses[variant] || variantClasses.default,
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />}
      {children}
    </button>
  )
})
