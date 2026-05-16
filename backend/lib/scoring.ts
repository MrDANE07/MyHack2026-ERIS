import { Startup, Mentor } from './fakeData'

export function calculateCompatibility(startup: Startup, mentor: Mentor): number {
  const DOMAIN_WEIGHT = 40
  const STAGE_WEIGHT = 20
  const CAPABILITY_WEIGHT = 30
  const AVAILABILITY_WEIGHT = 10

  const domainOverlap = startup.domain.filter(d => mentor.expertise.includes(d)).length / Math.max(startup.domain.length, 1)
  const domainScore = domainOverlap * DOMAIN_WEIGHT

  const stageDiff = Math.abs(startup.stage - mentor.preferred_stage)
  const stageScore = stageDiff === 0 ? STAGE_WEIGHT : stageDiff === 1 ? STAGE_WEIGHT * 0.5 : 0

  const capabilityMatch = startup.needs.filter(n => mentor.expertise.includes(n)).length / Math.max(startup.needs.length, 1)
  const capabilityScore = capabilityMatch * CAPABILITY_WEIGHT

  const availabilityScore =
    mentor.availability === 'Weekly' ? AVAILABILITY_WEIGHT :
    mentor.availability === 'Bi-Weekly' ? AVAILABILITY_WEIGHT * 0.7 :
    AVAILABILITY_WEIGHT * 0.4

  return Math.round(domainScore + stageScore + capabilityScore + availabilityScore)
}
