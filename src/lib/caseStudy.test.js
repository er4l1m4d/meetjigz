import { describe, it, expect } from 'vitest'
import { hasRealCaseStudy } from './caseStudy.js'

describe('hasRealCaseStudy', () => {
  it('returns false when entry has no case study', () => {
    expect(hasRealCaseStudy({ id: 'x', caseStudy: null })).toBe(false)
    expect(hasRealCaseStudy({ id: 'x' })).toBe(false)
  })

  it('returns false when all sections are placeholder text', () => {
    const entry = {
      caseStudy: {
        sections: {
          context: '[Placeholder: Describe the landscape]',
          problem: '[placeholder: What problem]',
        },
      },
    }
    expect(hasRealCaseStudy(entry)).toBe(false)
  })

  it('returns true when at least one section has real content', () => {
    const entry = {
      caseStudy: {
        sections: {
          context: '[Placeholder: Describe the landscape]',
          problem: 'Market data from three providers disagreed on strike prices.',
        },
      },
    }
    expect(hasRealCaseStudy(entry)).toBe(true)
  })

  it('returns false when sections are empty strings', () => {
    const entry = { caseStudy: { sections: { context: '', problem: '   ' } } }
    expect(hasRealCaseStudy(entry)).toBe(false)
  })
})
