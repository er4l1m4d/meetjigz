import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SkillsSection from './SkillsSection.jsx'

const SKILLS = {
  categories: [
    {
      id: 'languages',
      label: 'Languages',
      items: [
        { name: 'TypeScript', level: 9, projectIds: [] },
        { name: 'Rust', proficiency: 'familiar', projectIds: [] },
        { name: 'Prototyping', projectIds: [] },
      ],
    },
  ],
}

describe('SkillsSection', () => {
  it('renders a tile with numeric level, migrated legacy level, and unset dash', () => {
    const { container } = render(<SkillsSection skills={SKILLS} />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('9/10')).toBeInTheDocument()
    expect(screen.getByText('4/10')).toBeInTheDocument()
    expect(screen.getByText('—')).toBeInTheDocument()
    expect(container.querySelectorAll('[class*="segOn"]')).toHaveLength(13)
    expect(container.querySelectorAll('[class*="seg"]')).toHaveLength(30)
  })

  it('renders nothing when there are no categories', () => {
    const { container } = render(<SkillsSection skills={{ categories: [] }} />)
    expect(container.firstChild).toBeNull()
  })
})
