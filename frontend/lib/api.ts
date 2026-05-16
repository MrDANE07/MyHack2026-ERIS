// ERIS Frontend API Client
// All fetch() calls go through this file - no raw fetch in components

import type {
  MatchResponse,
  CreateRelationshipResponse,
  ExtractSignalsResponse,
  UpdateLifecycleResponse,
  EcosystemStatsResponse,
  ProgrammesResponse
} from './types'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

/**
 * Generate mentor matches for a startup
 */
export async function generateMatches(startupId: string): Promise<MatchResponse> {
  const res = await fetch(`${BASE_URL}/api/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startup_id: startupId })
  })
  return res.json()
}

/**
 * Create a new relationship
 */
export async function createRelationship(
  startupId: string,
  mentorId: string,
  compatibilityScore: number
): Promise<CreateRelationshipResponse> {
  const res = await fetch(`${BASE_URL}/api/create-relationship`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startup_id: startupId,
      mentor_id: mentorId,
      compatibility_score: compatibilityScore
    })
  })
  return res.json()
}

/**
 * Extract signals from an interaction summary
 */
export async function extractSignals(
  relationshipId: string,
  summary: string
): Promise<ExtractSignalsResponse> {
  const res = await fetch(`${BASE_URL}/api/extract-signals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      relationship_id: relationshipId,
      summary
    })
  })
  return res.json()
}

/**
 * Update relationship lifecycle status
 */
export async function updateLifecycle(
  relationshipId: string,
  newStatus: string
): Promise<UpdateLifecycleResponse> {
  const res = await fetch(`${BASE_URL}/api/update-lifecycle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      relationship_id: relationshipId,
      new_status: newStatus
    })
  })
  return res.json()
}

/**
 * Get ecosystem statistics
 */
export async function getEcosystemStats(): Promise<EcosystemStatsResponse> {
  const res = await fetch(`${BASE_URL}/api/ecosystem-stats`)
  return res.json()
}

/**
 * Get all programmes, partners, and service providers
 */
export async function getProgrammes(): Promise<ProgrammesResponse> {
  const res = await fetch(`${BASE_URL}/api/programmes`)
  return res.json()
}

/**
 * Get relationship details by ID
 */
export async function getRelationship(id: string) {
  const res = await fetch(`${BASE_URL}/api/relationship/${id}`)
  return res.json()
}
