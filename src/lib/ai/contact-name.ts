// ============================================================
// Customer name handed to the AI assistant.
//
// The auto-reply never sees the opening template, so without this the
// model has no idea who it is talking to and may invent a name. We pass
// the name on file only when it looks like a real person name (two or
// more alphabetic words); WhatsApp handles and nicknames are withheld so
// the model does not address a client as "DMB" or "Laura!!!".
// ============================================================

const WORD = /^[\p{L}][\p{L}'’-]*\.?$/u

/**
 * The contact's name on file if it looks like a real name, else null.
 * Whitespace is trimmed and collapsed; the words themselves are kept
 * as stored (accents, capitalisation, abbreviations like "L.").
 */
export function contactNameForAi(
  name: string | null | undefined,
): string | null {
  if (!name) return null
  const cleaned = name.trim().replace(/\s+/g, ' ')
  if (!cleaned) return null
  const words = cleaned.split(' ')
  if (words.length < 2) return null
  if (!words.every((w) => WORD.test(w))) return null
  return cleaned
}
