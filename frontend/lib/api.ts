const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001'

export async function generateMatches(startupId: string) {
  const res = await fetch(`${BASE_URL}/api/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startup_id: startupId }),
  })
  if (!res.ok) throw new Error('Failed to generate matches')
  return res.json() as Promise<{
    success: boolean
    matches: { mentor_id: string; compatibility_score: number; explanation: string }[]
  }>
}

export async function createRelationship(
  startupId: string,
  mentorId: string,
  compatibilityScore: number
) {
  const res = await fetch(`${BASE_URL}/api/create-relationship`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startup_id: startupId,
      mentor_id: mentorId,
      compatibility_score: compatibilityScore,
    }),
  })
  if (!res.ok) throw new Error('Failed to create relationship')
  return res.json() as Promise<{ success: boolean; relationship_id: string }>
}

export async function extractSignals(relationshipId: string, summary: string) {
  const res = await fetch(`${BASE_URL}/api/extract-signals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ relationship_id: relationshipId, summary }),
  })
  if (!res.ok) throw new Error('Gemini extraction failed')
  return res.json() as Promise<{
    success: boolean
    signals: { clarity: number; uncertainty: number; engagement: number }
    relationship_summary: string
  }>
}

export async function updateLifecycle(relationshipId: string, newStatus: string) {
  const res = await fetch(`${BASE_URL}/api/update-lifecycle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ relationship_id: relationshipId, new_status: newStatus }),
  })
  if (!res.ok) throw new Error('Failed to update lifecycle')
  return res.json() as Promise<{ success: boolean; updated_status: string }>
}

export async function getEcosystemStats() {
  const res = await fetch(`${BASE_URL}/api/ecosystem-stats`)
  if (!res.ok) throw new Error('Failed to fetch stats')
  return res.json() as Promise<{
    success: boolean
    stats: {
      total_relationships: number
      active_relationships: number
      total_interactions: number
      top_mentor_domains: string[]
    }
  }>
}

// getRelationship is not a real API endpoint in this MVP.
// Pages use hardcoded seed data instead. This stub exists to prevent import errors.
export async function getRelationship(relationshipId: string) {
  return Promise.resolve({
    success: true,
    relationship: {
      relationship_id: relationshipId,
      startup_id: 'startup_1',
      mentor_id: 'mentor_1',
      compatibility_score: 87,
      status: 'Created' as const,
      created_at: '2026-05-14T10:00:00Z',
    },
  })
}