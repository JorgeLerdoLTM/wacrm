import { describe, it, expect } from 'vitest'
import { contactNameForAi } from './contact-name'

describe('contactNameForAi', () => {
  it('returns a real-looking full name as stored', () => {
    expect(contactNameForAi('Alejandra Torres Pardo')).toBe('Alejandra Torres Pardo')
    expect(contactNameForAi('Maria del Carmen Ruiz Soto')).toBe('Maria del Carmen Ruiz Soto')
    expect(contactNameForAi('José L. Ortega Pineda')).toBe('José L. Ortega Pineda')
  })

  it('rejects WhatsApp-style nicknames and handles', () => {
    expect(contactNameForAi('DMB')).toBeNull()
    expect(contactNameForAi('Caro!!!')).toBeNull()
    expect(contactNameForAi('anamartinez72')).toBeNull()
    expect(contactNameForAi('Moni')).toBeNull()
  })

  it('rejects empty or phone-like values', () => {
    expect(contactNameForAi(null)).toBeNull()
    expect(contactNameForAi('')).toBeNull()
    expect(contactNameForAi('5217226511231')).toBeNull()
  })

  it('trims and collapses whitespace', () => {
    expect(contactNameForAi('  Ana   Torres ')).toBe('Ana Torres')
  })
})
