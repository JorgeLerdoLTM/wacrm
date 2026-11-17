import { describe, it, expect } from 'vitest'
import { buildSystemPrompt } from './defaults'

describe('buildSystemPrompt — customer name on file', () => {
  it('tells the model the customer name on file when one is provided', () => {
    const p = buildSystemPrompt({
      userPrompt: 'Eres Fernanda.',
      mode: 'auto_reply',
      contactName: 'Alejandra Torres Pardo',
    })
    expect(p).toContain('Alejandra Torres Pardo')
    expect(p).toMatch(/name on file/i)
  })

  it('says nothing about a name when none is provided', () => {
    const p = buildSystemPrompt({ userPrompt: 'Eres Fernanda.', mode: 'auto_reply' })
    expect(p).not.toMatch(/name on file/i)
    const p2 = buildSystemPrompt({ userPrompt: 'Eres Fernanda.', mode: 'auto_reply', contactName: null })
    expect(p2).not.toMatch(/name on file/i)
  })
})
