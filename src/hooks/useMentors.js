import { useState, useMemo } from 'react'
import { MOCK_MENTORS } from '../data/mentors'

// useMentors — filters in-memory from static data.
// TODO(Coder A/C): replace with Supabase query:
// supabase.from('mentor_public_profiles')
//   .select('*, mentor_subjects(subject_id, subjects(*))')
//   .eq('is_active', true)

export const DEFAULT_FILTERS = {
  subjectId: '',
  level: '',
  language: '',
}

export function useMentors(filters) {
  const mentors = useMemo(() => {
    let results = MOCK_MENTORS.filter((m) => m.isActive)
    if (filters.subjectId) {
      results = results.filter((m) =>
        m.subjects.some((s) => s.id === filters.subjectId)
      )
    }
    if (filters.level) {
      results = results.filter((m) =>
        m.teachingLevels.includes(filters.level)
      )
    }
    if (filters.language) {
      results = results.filter((m) =>
        m.teachingLanguages.includes(filters.language)
      )
    }
    return results
  }, [filters.subjectId, filters.level, filters.language])

  return { mentors, loading: false, total: mentors.length }
}

export function useAvailableLanguages() {
  return useMemo(() => {
    const langs = new Set()
    MOCK_MENTORS.forEach((m) => m.teachingLanguages.forEach((l) => langs.add(l)))
    return Array.from(langs).sort()
  }, [])
}

export function useMentorBySlug(slug) {
  const mentor = useMemo(
    () => MOCK_MENTORS.find((m) => m.slug === slug && m.isActive) ?? null,
    [slug]
  )
  return { mentor, loading: false }
}
