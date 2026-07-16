// Business-hours gate for the AI auto-reply.
//
// Consorcio Kick requires Fernanda to reply to customers ONLY during
// business hours (Mon–Fri 09:00–18:00 America/Mexico_City). Outside that
// window the auto-reply stands down and the inbound waits in the inbox
// for a human — the bot never sends after hours. Client requirement
// confirmed 2026-07-15 (inbound after-hours replies were NOT relaxed).

export const BUSINESS_TIMEZONE = 'America/Mexico_City'
export const BUSINESS_OPEN_HOUR = 9 // inclusive
export const BUSINESS_CLOSE_HOUR = 18 // exclusive — last reply goes out at 17:59

const WEEKDAYS = new Set(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])

/**
 * True when `date` falls within business hours in `timeZone`:
 * Monday–Friday, 09:00 up to (but not including) 18:00. Uses Intl so it
 * stays correct across any timezone/DST rules without a date library.
 */
export function isWithinBusinessHours(
  date: Date,
  timeZone: string = BUSINESS_TIMEZONE,
): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const rawHour = parts.find((p) => p.type === 'hour')?.value ?? ''
  // hour12:false renders midnight as "24" in some ICU versions; normalise.
  const hour = parseInt(rawHour, 10) % 24

  return (
    WEEKDAYS.has(weekday) &&
    hour >= BUSINESS_OPEN_HOUR &&
    hour < BUSINESS_CLOSE_HOUR
  )
}
