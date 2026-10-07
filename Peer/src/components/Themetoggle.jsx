import { useTheme } from '../context/Themecontext.jsx'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light/dark mode"
      className="rounded border border-line w-9 h-9 flex items-center justify-center text-sm hover:bg-paperDim"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}