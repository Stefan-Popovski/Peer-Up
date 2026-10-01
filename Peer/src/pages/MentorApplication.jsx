import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/Supabaseclient'

export default function MentorApplication() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [experience, setExperience] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const { error } = await supabase.from('mentor_applications').insert({
      full_name: fullName,
      email,
      phone,
      experience,
    })
    setBusy(false)
    if (error) {
      setMsg({ type: 'error', text: error.message })
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="max-w-sm w-full rounded border border-line bg-paperDim p-6 text-center">
          <h1 className="font-display font-semibold tracking-tight text-2xl">Thanks!</h1>
          <p className="text-sm text-inkSoft mt-3">
            Your mentor application is in — we review these by hand and will follow up at {email}.
          </p>
          <Link to="/" className="inline-block mt-5 text-sm" style={{ color: 'var(--teal-mid)' }}>
            ← Back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="max-w-sm w-full rounded border border-line bg-paperDim p-6">
        <Link to="/" className="text-xs text-inkSoft hover:text-ink">
          ← back
        </Link>
        <h1 className="font-display font-semibold tracking-tight text-2xl mt-3">Want to be a mentor?</h1>
        <p className="text-sm text-inkSoft mt-2">
          Tell us a bit about yourself. We'll review it and reach out.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 mt-5">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            required
            className="rounded px-3 py-2 text-sm w-full"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="rounded px-3 py-2 text-sm w-full"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            required
            className="rounded px-3 py-2 text-sm w-full"
          />
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="What can you teach, and what's your experience with it?"
            required
            rows={4}
            className="rounded px-3 py-2 text-sm w-full resize-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded px-5 py-2.5 text-sm font-medium w-full disabled:opacity-60"
            style={{ background: 'var(--gradient)', color: '#04252b' }}
          >
            {busy ? 'Sending…' : 'Submit application'}
          </button>
        </form>

        {msg && (
          <p className="text-sm mt-3" style={{ color: '#b3541e' }}>
            {msg.text}
          </p>
        )}
      </div>
    </div>
  )
}