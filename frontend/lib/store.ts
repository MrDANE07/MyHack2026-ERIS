// ERIS In-Memory Store (simulates Firestore for hackathon MVP)

import type { Relationship, Interaction, EcosystemStats } from './types'
import { mockRelationships, mockInteractions, mentors } from './fakeData'

// In-memory storage (resets on server restart)
let relationships: Relationship[] = [...mockRelationships]
let interactions: Interaction[] = [...mockInteractions]

/**
 * Get all relationships
 */
export function getAllRelationships(): Relationship[] {
  return relationships
}

/**
 * Get a relationship by ID
 */
export function getRelationshipById(id: string): Relationship | undefined {
  return relationships.find(r => r.relationship_id === id)
}

/**
 * Create a new relationship
 */
export function createRelationship(
  startupId: string,
  mentorId: string,
  compatibilityScore: number
): Relationship {
  const relationship: Relationship = {
    relationship_id: `REL-${Date.now()}`,
    startup_id: startupId,
    mentor_id: mentorId,
    compatibility_score: compatibilityScore,
    status: 'Created',
    created_at: new Date().toISOString()
  }
  
  relationships.push(relationship)
  return relationship
}

/**
 * Update relationship status
 */
export function updateRelationshipStatus(
  relationshipId: string,
  newStatus: Relationship['status']
): Relationship | null {
  const index = relationships.findIndex(r => r.relationship_id === relationshipId)
  
  if (index === -1) return null
  
  relationships[index] = {
    ...relationships[index],
    status: newStatus
  }
  
  return relationships[index]
}

/**
 * Get all interactions for a relationship
 */
export function getInteractionsByRelationship(relationshipId: string): Interaction[] {
  return interactions.filter(i => i.relationship_id === relationshipId)
}

/**
 * Create a new interaction
 */
export function createInteraction(
  relationshipId: string,
  summary: string,
  clarity: number,
  uncertainty: number,
  engagement: number
): Interaction {
  const interaction: Interaction = {
    interaction_id: `INT-${Date.now()}`,
    relationship_id: relationshipId,
    summary,
    clarity,
    uncertainty,
    engagement,
    created_at: new Date().toISOString()
  }
  
  interactions.push(interaction)
  return interaction
}

/**
 * Get ecosystem statistics
 */
export function getEcosystemStats(): EcosystemStats {
  const totalRelationships = relationships.length
  const activeRelationships = relationships.filter(r => r.status === 'Active').length
  const totalInteractions = interactions.length
  
  // Calculate top mentor domains from active relationships
  const mentorDomainCounts: Record<string, number> = {}
  
  relationships.forEach(rel => {
    const mentor = mentors.find(m => m.id === rel.mentor_id)
    if (mentor) {
      mentor.expertise.forEach(exp => {
        mentorDomainCounts[exp] = (mentorDomainCounts[exp] || 0) + 1
      })
    }
  })
  
  const topDomains = Object.entries(mentorDomainCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([domain]) => domain)
  
  return {
    total_relationships: totalRelationships,
    active_relationships: activeRelationships,
    total_interactions: totalInteractions,
    top_mentor_domains: topDomains
  }
}

/**
 * Validate lifecycle transition
 */
export function isValidTransition(
  currentStatus: Relationship['status'],
  newStatus: Relationship['status']
): boolean {
  const validTransitions: Record<Relationship['status'], Relationship['status'][]> = {
    'Created': ['Active'],
    'Active': ['Completed', 'Failed'],
    'Completed': [], // Terminal state
    'Failed': [] // Terminal state
  }
  
  return validTransitions[currentStatus]?.includes(newStatus) ?? false
}
