import { useEffect } from 'react'

const SITE_NAME = 'PeerUp'

export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = `${title} — ${SITE_NAME}`
    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }
    return () => {
      document.title = `${SITE_NAME} — Учи со врсниците`
    }
  }, [title, description])
}
