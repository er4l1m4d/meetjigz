const PLACEHOLDER_PREFIX = '[placeholder'

export function isPlaceholderSection(text) {
  return (
    typeof text !== 'string' ||
    text.trim().length === 0 ||
    text.trim().toLowerCase().startsWith(PLACEHOLDER_PREFIX)
  )
}

export function hasRealCaseStudy(entry) {
  if (!entry?.caseStudy) return false
  const sections = entry.caseStudy.sections || {}
  return Object.values(sections).some((text) => !isPlaceholderSection(text))
}
