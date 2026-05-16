// ERIS Compatibility Scoring Algorithm

import type { Startup, Mentor } from './types'

// Configurable scoring weights (auditable, adjustable without code changes)
const DOMAIN_WEIGHT = 40      // % of startup.domain matching mentor.expertise
const STAGE_WEIGHT = 20       // Alignment between startup.stage and mentor.preferred_stage
const CAPABILITY_WEIGHT = 30  // % of startup.needs matching mentor.expertise
const AVAILABILITY_WEIGHT = 10 // Mentor availability preference

interface ScoringBreakdown {
  domainScore: number
  stageScore: number
  capabilityScore: number
  availabilityScore: number
  totalScore: number
}

/**
 * Calculate the percentage overlap between two string arrays
 */
function calculateOverlap(arr1: string[], arr2: string[]): number {
  if (arr1.length === 0) return 0
  const lowerArr2 = arr2.map(s => s.toLowerCase())
  const matches = arr1.filter(item => 
    lowerArr2.some(exp => 
      exp.includes(item.toLowerCase()) || item.toLowerCase().includes(exp)
    )
  )
  return matches.length / arr1.length
}

/**
 * Calculate stage alignment score
 * 1.0 if stages match exactly
 * 0.5 if stages differ by ±1
 * 0.0 otherwise
 */
function calculateStageAlignment(startupStage: number, mentorPreferredStage: number): number {
  const diff = Math.abs(startupStage - mentorPreferredStage)
  if (diff === 0) return 1.0
  if (diff === 1) return 0.5
  return 0.0
}

/**
 * Calculate availability score
 * Weekly = 1.0 (most available)
 * Bi-Weekly = 0.7
 * Monthly = 0.4 (least available)
 */
function calculateAvailabilityScore(availability: string): number {
  switch (availability) {
    case 'Weekly': return 1.0
    case 'Bi-Weekly': return 0.7
    case 'Monthly': return 0.4
    default: return 0.5
  }
}

/**
 * Calculate compatibility score between a startup and mentor
 * Returns a score from 0-100 and a breakdown of component scores
 */
export function calculateCompatibilityScore(
  startup: Startup, 
  mentor: Mentor
): ScoringBreakdown {
  // Domain overlap: % of startup domains matching mentor expertise
  const domainOverlap = calculateOverlap(startup.domain, mentor.expertise)
  const domainScore = domainOverlap * DOMAIN_WEIGHT

  // Stage alignment
  const stageAlignment = calculateStageAlignment(startup.stage, mentor.preferred_stage)
  const stageScore = stageAlignment * STAGE_WEIGHT

  // Capability match: % of startup needs matching mentor expertise
  const capabilityMatch = calculateOverlap(startup.needs, mentor.expertise)
  const capabilityScore = capabilityMatch * CAPABILITY_WEIGHT

  // Availability score
  const availabilityMatch = calculateAvailabilityScore(mentor.availability)
  const availabilityScore = availabilityMatch * AVAILABILITY_WEIGHT

  // Total score (0-100)
  const totalScore = Math.round(domainScore + stageScore + capabilityScore + availabilityScore)

  return {
    domainScore: Math.round(domainScore),
    stageScore: Math.round(stageScore),
    capabilityScore: Math.round(capabilityScore),
    availabilityScore: Math.round(availabilityScore),
    totalScore: Math.min(100, Math.max(0, totalScore))
  }
}

/**
 * Generate all mentor matches for a startup, sorted by score descending
 */
export function generateMentorMatches(
  startup: Startup, 
  mentors: Mentor[]
): Array<{ mentor: Mentor; breakdown: ScoringBreakdown }> {
  const matches = mentors.map(mentor => ({
    mentor,
    breakdown: calculateCompatibilityScore(startup, mentor)
  }))

  // Sort by total score descending
  return matches.sort((a, b) => b.breakdown.totalScore - a.breakdown.totalScore)
}
