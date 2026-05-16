const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export async function generateMatches(startupId: string) {
  const res = await fetch(`${BASE_URL}/api/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startup_id: startupId })
  })
  return res.json()
}

export async function createRelationship(params: {
  startup_id: string
  mentor_id: string
  compatibility_score: number
}) {
  const res = await fetch(`${BASE_URL}/api/create-relationship`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
  return res.json()
}

export async function extractSignals(params: {
  relationship_id: string
  summary: string
}) {
  const res = await fetch(`${BASE_URL}/api/extract-signals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
  return res.json()
}

export async function updateLifecycle(params: {
  relationship_id: string
  new_status: string
}) {
  const res = await fetch(`${BASE_URL}/api/update-lifecycle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
  return res.json()
}

export async function getEcosystemStats() {
  const res = await fetch(`${BASE_URL}/api/ecosystem-stats`)
  return res.json()
}

export async function getRelationship(relationshipId: string) {
  const res = await fetch(`${BASE_URL}/api/relationships/${relationshipId}`)
  return res.json()
}