import { cn } from '../../lib/utils'

const variantClasses = {
  primary: 'bg-primary/10 text-primary border border-primary/20',
  accent: 'bg-accent/20 text-[#071b3a] dark:text-accent dark:bg-accent/15 border border-accent/40 dark:border-accent/30 font-semibold',
  green: 'bg-green/15 text-green font-semibold border border-green/30',
  secondary: 'bg-green/15 text-green font-semibold border border-green/30',
  success: 'bg-green/15 text-green font-semibold border border-green/30',
  dark: 'bg-muted text-foreground border border-border font-semibold',
  outline: 'border border-border text-muted-foreground bg-transparent',
  subject: 'bg-primary/10 text-primary border border-primary/20',
}

export function Badge({ variant = 'primary', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
        variantClasses[variant] || variantClasses.primary,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
