const ALLOWED_PROTOCOL = /^(https?|mailto|tel):/i
const ANY_PROTOCOL = /^[a-z][a-z0-9+.-]*:/i
const DOMAIN_LIKE = /^[a-z0-9-]+(\.[a-z0-9-]+)+([/?#].*)?$/i

export function normalizeExternalHref(value) {
  if (typeof value !== 'string') return null
  const raw = value.trim()
  if (!raw || raw === '#') return null
  if (raw === 'null' || raw === 'undefined') return null
  if (ALLOWED_PROTOCOL.test(raw)) return raw
  if (ANY_PROTOCOL.test(raw)) return null
  if (raw.startsWith('//')) return `https:${raw}`
  if (DOMAIN_LIKE.test(raw)) return `https://${raw}`
  return null
}

export function externalHrefOf(entry) {
  return normalizeExternalHref(entry?.href)
}
