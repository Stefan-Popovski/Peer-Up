import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function Modal({ isOpen, onClose, title, children, size = 'md', className }) {
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement
      setTimeout(() => dialogRef.current?.focus(), 10)
    } else {
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'Tab' && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault()
        ;(e.shiftKey ? last : first)?.focus()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4" role="presentation">
      <div className="absolute inset-0 bg-[#071b3a]/70 dark:bg-slate-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative z-10 w-full rounded-2xl bg-card border border-border shadow-card focus:outline-none',
          sizeClasses[size],
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 id="modal-title" className="text-lg font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Затвори"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="px-6 py-5 text-foreground">{children}</div>
      </div>
    </div>
  )
}
