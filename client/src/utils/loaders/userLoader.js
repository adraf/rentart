export async function getUser() {
  const res = await fetch(`api/profile`)
  return res.json()
}
