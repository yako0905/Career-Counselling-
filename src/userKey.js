// Makes a storage key that belongs to the logged-in person,
// e.g. "careerpath-result:me@example.com"
export function userKey(base) {
  try {
    const session = JSON.parse(localStorage.getItem('careerpath-session'))
    if (session && session.email) return `${base}:${session.email}`
  } catch {
    /* fall back to the shared key */
  }
  return base
}