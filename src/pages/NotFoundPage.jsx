import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Button } from '../components/ui'

export function NotFoundPage() {
  usePageMeta({ title: '404 — Не е пронајдено' })
  return (
    <div className="min-h-screen bg-[#071b3a] dark:bg-slate-950 flex flex-col items-center justify-center text-center px-4 pt-16">
      <p className="text-9xl font-bold text-white/5 select-none" aria-hidden="true">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-100">{MK.errors.notFound}</h1>
      <p className="mt-3 text-slate-300 max-w-sm">{MK.errors.notFoundDesc}</p>
      <Link to="/" className="mt-8">
        <Button variant="accent" size="lg">{MK.errors.backHome}</Button>
      </Link>
    </div>
  )
}
