import { useMemo } from 'react'

export const DEFAULT_FILTERS = {
  subjectId: '',
  level: '',
  language: '',
}

export function useMentors(filters) {
  return { mentors: [], loading: false, total: 0 }
}

export function useAvailableLanguages() {
  return []
}

export function useMentorBySlug(slug) {
  return { mentor: null, loading: false }
}
