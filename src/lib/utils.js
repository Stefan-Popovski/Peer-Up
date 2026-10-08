import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SCHOOL_LEVEL_LABELS } from '../types/index'

/** Merge Tailwind classes safely */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** Format MKD price or return em-dash if not yet published */
export function formatPrice(amount, currency = 'MKD') {
  if (amount === null || amount === undefined) return '—'
  return `${Number(amount).toLocaleString('mk-MK')} ${currency}`
}

/** Convert UTC ISO string to Europe/Skopje display time */
export function formatSlotTime(utcString) {
  return new Date(utcString).toLocaleString('mk-MK', {
    timeZone: 'Europe/Skopje',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Get initials from a display name */
export function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getAvatarColor(name) {
  const colors = [
    'bg-primary text-white',
    'bg-accent text-dark',
    'bg-green text-white',
    'bg-dark text-white',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

/** Human-readable label for a school level key */
export function getLevelLabel(level) {
  return SCHOOL_LEVEL_LABELS[level] ?? level
}

/** Format first–last level range */
export function formatLevelRange(levels) {
  if (!levels || levels.length === 0) return ''
  if (levels.length === 1) return getLevelLabel(levels[0])
  return `${getLevelLabel(levels[0])} – ${getLevelLabel(levels[levels.length - 1])}`
}

/** Truncate with ellipsis */
export function truncate(str, maxLength) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trim() + '…'
}
