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
  it('renders skill tiles with name and icon', () => {
    render(<SkillsSection skills={SKILLS} />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Rust')).toBeInTheDocument()
    expect(screen.getByText('Prototyping')).toBeInTheDocument()
  })

  it('renders nothing when there are no categories', () => {
    const { container } = render(<SkillsSection skills={{ categories: [] }} />)
    expect(container.firstChild).toBeNull()
  })
})
