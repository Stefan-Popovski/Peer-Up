import { forwardRef, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export const Select = forwardRef(function Select(
  { label, options, error, placeholder, className, id: providedId, required, ...props },
  ref
) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-foreground">
          {label}
          {required && <span className="ml-1 text-primary" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={id}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'w-full appearance-none rounded-xl border px-4 py-2.5 pr-10 text-sm text-foreground transition-all outline-none bg-background cursor-pointer',
            'focus:ring-2 focus:ring-accent/30 focus:border-accent',
            error
              ? 'border-primary bg-primary/5 focus:ring-primary/20'
              : 'border-border hover:border-border/80',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        >
          {placeholder && <option value="" className="bg-card text-foreground">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card text-foreground">{opt.label}</option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-primary font-medium">{error}</p>
      )}
    </div>
  )
})
