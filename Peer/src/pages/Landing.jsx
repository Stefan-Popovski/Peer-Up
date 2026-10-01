import { Link } from 'react-router-dom'
import Brand from '../components/Brand.jsx'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto w-full px-5 py-6">
        <Brand />
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 py-10 flex flex-col justify-center">
        <div className="max-w-lg">
          <h1 className="font-display font-semibold text-4xl sm:text-5xl leading-[1.08] tracking-tight">
            Level up together.
            <br />
            <span className="gradient-text">Peer to peer.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-inkSoft">
            PeerUp pairs people who want to learn a skill with people who already know it —
            no tuition, no middleman.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-xl">
          <Link
            to="/auth"
            className="flex-1 inline-flex flex-col rounded-xl p-6 gradient-btn shadow-sm"
          >
            <span className="font-display font-semibold text-xl">Sign in / Sign up</span>
            <span className="text-sm mt-2" style={{ color: '#04252bcc' }}>
              Create an account to browse mentors and request sessions.
            </span>
          </Link>

          <Link
            to="/mentor-application"
            className="flex-1 inline-flex flex-col rounded-xl border border-line bg-paperDim p-6 hover:border-tealMid transition-colors"
          >
            <span className="font-display font-semibold text-xl">Want to be a mentor?</span>
            <span className="text-sm text-inkSoft mt-2">
              Tell us about yourself — we review every mentor request before it goes live.
            </span>
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs text-inkSoft py-8">PeerUp — built on Supabase</footer>
    </div>
  )
}