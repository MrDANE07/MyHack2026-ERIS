import { Startup, Mentor } from './fakeData'

export function generateMatchExplanation(
  startup: Startup,
  mentor: Mentor,
  score: number
): string {
  const domainMatch = startup.domain.some(d => mentor.expertise.includes(d))
  const stageMatch = startup.stage === mentor.preferred_stage
  const needMatch = startup.needs.some(n => mentor.expertise.includes(n))

  if (score >= 80) {
    return 'Strong match due to aligned expertise and compatible startup stage.'
  }

  if (score >= 60) {
    return 'Moderate match with some expertise overlap.'
  }

  return 'Limited compatibility based on current startup needs.'
}

export function generateRelationshipSummary(signals: {
  clarity: number
  uncertainty: number
  engagement: number
}): string {
  const { clarity, uncertainty, engagement } = signals

  if (clarity >= 7 && uncertainty <= 4 && engagement >= 7) {
    return 'Relationship demonstrates strong clarity, sustained engagement, and low uncertainty.'
  }

  if (clarity <= 4) {
    return 'Relationship shows clarity gaps — recommend focus session on goals.'
  }

  if (engagement <= 4) {
    return 'Engagement levels are declining — consider check-in with both parties.'
  }

  return 'Relationship progressing normally with balanced signals.'
}
