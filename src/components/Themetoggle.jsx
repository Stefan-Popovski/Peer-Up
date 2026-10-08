import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/Themecontext'

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Префрли на светла тема' : 'Префрли на темна тема'}
      title={isDark ? 'Префрли на светла тема' : 'Префрли на темна тема'}
      className={`relative p-2 rounded-xl border border-border bg-card/90 hover:bg-muted text-foreground transition-all duration-200 cursor-pointer shadow-soft hover:shadow-hover flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 text-accent absolute inset-0 transition-all duration-300 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100 drop-shadow-[0_0_6px_rgba(0,217,208,0.5)]'
              : '-rotate-90 scale-0 opacity-0'
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`w-4 h-4 text-primary absolute inset-0 transition-all duration-300 transform ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100 drop-shadow-[0_0_4px_rgba(9,104,130,0.3)]'
          }`}
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">
        {isDark ? 'Тековно темна тема, кликни за светла' : 'Тековно светла тема, кликни за темна'}
      </span>
    </button>
  )
}

export default ThemeToggle