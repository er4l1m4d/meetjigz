import { useEffect, useState } from 'react'

let catalogPromise = null

function loadCatalog() {
  if (!catalogPromise) {
    catalogPromise = import('../lib/skillIconCatalog.js').catch((err) => {
      catalogPromise = null
      throw err
    })
  }
  return catalogPromise
}

// Lazy-loads the react-icons catalog (own async chunk) so brand glyphs never
// bloat the main bundle. Returns null until ready, then { SKILL_ICONS,
// findSkillIcon, resolveSkillIcon }.
export function useSkillIconCatalog() {
  const [catalog, setCatalog] = useState(null)

  useEffect(() => {
    let active = true
    loadCatalog().then((mod) => {
      if (active) setCatalog(mod)
    }).catch(() => {})
    return () => { active = false }
  }, [])

  return catalog
}
