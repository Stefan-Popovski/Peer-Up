import { useState, useCallback } from 'react'

export function useBookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mentor, setMentor] = useState(null)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const open = useCallback((m) => {
    setMentor(m)
    setFormData({})
    setSubmitted(false)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setMentor(null)
    setFormData({})
    setIsSubmitting(false)
    setSubmitted(false)
  }, [])

  const updateField = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Static build: simulate submit (no-op)
  // TODO(Coder B + Coder A): wire to Supabase booking API
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsSubmitting(false)
    setSubmitted(true)
  }, [])

  return {
    isOpen,
    mentor,
    formData,
    isSubmitting,
    submitted,
    open,
    close,
    updateField,
    handleSubmit,
  }
}
