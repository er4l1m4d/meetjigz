export const LEGACY_LEVEL = {
  'daily-driver': 9,
  comfortable: 6,
  familiar: 4,
}

export function normalizeName(name) {
  return String(name || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function resolveLevel(skill) {
  const n = Number(skill.level)
  if (Number.isFinite(n) && n > 0) return Math.min(10, Math.round(n))
  if (skill.proficiency && LEGACY_LEVEL[skill.proficiency]) return LEGACY_LEVEL[skill.proficiency]
  return null
}
