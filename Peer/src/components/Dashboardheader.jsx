import { useAuth } from '../context/AuthContext.jsx'
import Brand from './Brand.jsx'

export default function DashboardHeader({ roleLabel, name }) {
  const { signOut } = useAuth()
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Brand size={24} />
        <div className="flex items-center gap-3 text-sm">
          <span className="text-inkSoft hidden sm:inline">
            {name || 'You'} · {roleLabel}
          </span>
          <button onClick={signOut} className="rounded border border-line px-4 py-2 text-sm hover:bg-paperDim">
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}