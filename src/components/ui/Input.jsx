import { forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef(function Input(
  { label, error, hint, className, id: providedId, required, ...props },
  ref
) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-dark">
          {label}
          {required && <span className="ml-1 text-primary" aria-hidden="true">*</span>}
        </label>
      )}

      {hint && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}

      <input
        ref={ref}
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={[error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined}
        className={cn(
          'w-full rounded-xl border px-4 py-2.5 text-sm text-dark transition-all outline-none',
          'focus:ring-2 focus:ring-accent/30 focus:border-accent',
          'placeholder:text-muted-foreground',
          error
            ? 'border-primary bg-primary/5 focus:ring-primary/20'
            : 'border-border bg-background hover:border-border/80',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />

      {error && (
        <p id={errorId} role="alert" className="text-xs text-primary font-medium">{error}</p>
      )}
    </div>
  )
})
