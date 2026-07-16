import { describe, it, expect } from 'vitest'
import { isWithinBusinessHours } from './business-hours'

// America/Mexico_City is UTC-6 year-round (Mexico dropped DST in 2023).
// So 15:00 UTC == 09:00 CDMX. Reference weekdays in July 2026:
//   2026-07-15 Wed, 2026-07-18 Sat, 2026-07-19 Sun, 2026-07-20 Mon.
describe('isWithinBusinessHours (America/Mexico_City)', () => {
  it('open at 09:00 CDMX on a weekday (inclusive lower bound)', () => {
    expect(isWithinBusinessHours(new Date('2026-07-15T15:00:00Z'))).toBe(true)
  })

  it('open at 17:59 CDMX on a weekday', () => {
    expect(isWithinBusinessHours(new Date('2026-07-15T23:59:00Z'))).toBe(true)
  })

  it('closed at 18:00 CDMX (exclusive upper bound)', () => {
    // 00:00Z on 07-16 == 18:00 CDMX on 07-15 (Wed)
    expect(isWithinBusinessHours(new Date('2026-07-16T00:00:00Z'))).toBe(false)
  })

  it('closed at 08:59 CDMX (before opening)', () => {
    expect(isWithinBusinessHours(new Date('2026-07-15T14:59:00Z'))).toBe(false)
  })

  it('closed at 20:00 CDMX (evening)', () => {
    // 02:00Z on 07-16 == 20:00 CDMX on 07-15
    expect(isWithinBusinessHours(new Date('2026-07-16T02:00:00Z'))).toBe(false)
  })

  it('closed all day Saturday', () => {
    // 18:00Z on 07-18 == 12:00 CDMX Saturday
    expect(isWithinBusinessHours(new Date('2026-07-18T18:00:00Z'))).toBe(false)
  })

  it('closed all day Sunday', () => {
    expect(isWithinBusinessHours(new Date('2026-07-19T18:00:00Z'))).toBe(false)
  })

  it('open Monday 09:00 CDMX', () => {
    expect(isWithinBusinessHours(new Date('2026-07-20T15:00:00Z'))).toBe(true)
  })
})
