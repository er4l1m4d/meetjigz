import { describe, it, expect } from 'vitest'
import { normalizeExternalHref, externalHrefOf } from './externalHref.js'

describe('normalizeExternalHref', () => {
  it('keeps absolute http(s) urls untouched', () => {
    expect(normalizeExternalHref('https://clipmatic.vercel.app')).toBe(
      'https://clipmatic.vercel.app',
    )
    expect(normalizeExternalHref('http://example.com/path?a=1')).toBe(
      'http://example.com/path?a=1',
    )
  })

  it('prepends https to bare domains', () => {
    expect(normalizeExternalHref('clipmatic.vercel.app')).toBe(
      'https://clipmatic.vercel.app',
    )
    expect(normalizeExternalHref('  www.example.com/path  ')).toBe(
      'https://www.example.com/path',
    )
  })

  it('upgrades protocol-relative urls', () => {
    expect(normalizeExternalHref('//example.com')).toBe('https://example.com')
  })

  it('rejects values that would resolve back to this site', () => {
    expect(normalizeExternalHref('#')).toBeNull()
    expect(normalizeExternalHref('')).toBeNull()
    expect(normalizeExternalHref('   ')).toBeNull()
    expect(normalizeExternalHref('/project/ciphra')).toBeNull()
    expect(normalizeExternalHref('/')).toBeNull()
    expect(normalizeExternalHref('null')).toBeNull()
    expect(normalizeExternalHref(undefined)).toBeNull()
    expect(normalizeExternalHref(null)).toBeNull()
    expect(normalizeExternalHref('localhost:3000')).toBeNull()
    expect(normalizeExternalHref('javascript:alert(1)')).toBeNull()
  })

  it('allows mailto and tel', () => {
    expect(normalizeExternalHref('mailto:hi@example.com')).toBe('mailto:hi@example.com')
    expect(normalizeExternalHref('tel:+2348012345678')).toBe('tel:+2348012345678')
  })
})

describe('externalHrefOf', () => {
  it('reads href off an entry', () => {
    expect(externalHrefOf({ href: 'clipmatic.vercel.app' })).toBe(
      'https://clipmatic.vercel.app',
    )
    expect(externalHrefOf({ href: '#' })).toBeNull()
    expect(externalHrefOf(undefined)).toBeNull()
  })
})
