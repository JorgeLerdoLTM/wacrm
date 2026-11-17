// ============================================================
// Inbound contact naming.
//
// The business imports its clients with the names it uses for them
// (the authoritative name on file). WhatsApp also sends the sender's
// profile display name with every inbound message, which is often a
// nickname, a handle or decorated text ("Laura!!!", "DMB"). The profile
// name must never replace a usable name on file: it is adopted only when
// the contact has no name at all, or when the stored name is just the
// phone number used as a placeholder.
// ============================================================

/**
 * True when the WhatsApp profile name should be written to the contact.
 */
export function shouldAdoptProfileName(
  existingName: string | null | undefined,
  profileName: string | null | undefined,
): boolean {
  const profile = (profileName ?? '').trim()
  if (!profile) return false
  const existing = (existingName ?? '').trim()
  if (!existing) return true
  if (existing === profile) return false
  // Only digits and phone punctuation: a placeholder, not a name.
  return /^[\d\s()+.-]+$/.test(existing)
}
