import { describe, it, expect } from 'vitest'
import { SOCIAL_ICONS, findSocialIcon } from './socialIcons.js'

describe('findSocialIcon', () => {
  it('returns the entry for a known key', () => {
    const result = findSocialIcon('github')
    expect(result).not.toBeNull()
    expect(result.key).toBe('github')
    expect(result.label).toBe('GitHub')
    expect(result.Icon).toBeTruthy()
  })

  it('returns null for an unknown key', () => {
    expect(findSocialIcon('unknown-icon')).toBeNull()
  })

  it('returns null for empty or null input', () => {
    expect(findSocialIcon('')).toBeNull()
    expect(findSocialIcon(null)).toBeNull()
    expect(findSocialIcon(undefined)).toBeNull()
  })

  it('includes all expected keys in the palette', () => {
    const keys = SOCIAL_ICONS.map((entry) => entry.key)
    expect(keys).toContain('x')
    expect(keys).toContain('github')
    expect(keys).toContain('telegram')
    expect(keys).toContain('discord')
    expect(keys).toContain('linkedin')
    expect(keys).toContain('email')
    expect(keys).toContain('website')
  })

  it('every entry has a key, label, and Icon', () => {
    SOCIAL_ICONS.forEach((entry) => {
      expect(entry.key).toBeTruthy()
      expect(entry.label).toBeTruthy()
      expect(entry.Icon).toBeTruthy()
    })
  })
})
