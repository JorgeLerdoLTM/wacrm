import { describe, it, expect } from 'vitest'
import { shouldAdoptProfileName } from './profile-name'

describe('shouldAdoptProfileName', () => {
  it('keeps the name on file when the contact already has one', () => {
    expect(shouldAdoptProfileName('Alejandra Torres Pardo', 'Ale T')).toBe(false)
  })

  it('adopts the WhatsApp profile name when the contact has no name', () => {
    expect(shouldAdoptProfileName(null, 'Ale T')).toBe(true)
    expect(shouldAdoptProfileName('', 'Ale T')).toBe(true)
    expect(shouldAdoptProfileName('   ', 'Ale T')).toBe(true)
  })

  it('adopts the profile name when the name on file is just the phone number', () => {
    expect(shouldAdoptProfileName('5217226511231', 'Ale T')).toBe(true)
    expect(shouldAdoptProfileName('+52 1 722 651 1231', 'Ale T')).toBe(true)
  })

  it('never adopts an empty profile name', () => {
    expect(shouldAdoptProfileName(null, '')).toBe(false)
    expect(shouldAdoptProfileName(null, null)).toBe(false)
    expect(shouldAdoptProfileName('', '   ')).toBe(false)
  })

  it('does not rewrite an identical name', () => {
    expect(shouldAdoptProfileName('Ale T', 'Ale T')).toBe(false)
  })
})
