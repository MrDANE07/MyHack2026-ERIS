// ERIS Explanation Generators

import type { Startup, Mentor, Signals } from './types'

/**
 * Generate a natural-language explanation for a mentor-startup match
 */
export function generateMatchExplanation(
  startup: Startup,
  mentor: Mentor,
  score: number
): string {
  const strengths: string[] = []
  const considerations: string[] = []

  // Check domain overlap
  const domainMatches = startup.domain.filter(d => 
    mentor.expertise.some(e => 
      e.toLowerCase().includes(d.toLowerCase()) || 
      d.toLowerCase().includes(e.toLowerCase())
    )
  )
  
  if (domainMatches.length > 0) {
    strengths.push(`expertise in ${domainMatches.join(' and ')}`)
  }

  // Check needs alignment
  const needsMatches = startup.needs.filter(n =>
    mentor.expertise.some(e =>
      e.toLowerCase().includes(n.toLowerCase()) ||
      n.toLowerCase().includes(e.toLowerCase())
    )
  )

  if (needsMatches.length > 0) {
    strengths.push(`experience with ${needsMatches.join(' and ')}`)
  }

  // Check stage alignment
  if (mentor.preferred_stage === startup.stage) {
    strengths.push(`preference for Stage ${startup.stage} startups`)
  } else if (Math.abs(mentor.preferred_stage - startup.stage) === 1) {
    considerations.push(`typically works with Stage ${mentor.preferred_stage} startups`)
  }

  // Check availability
  if (mentor.availability === 'Weekly') {
    strengths.push('high availability for regular check-ins')
  } else if (mentor.availability === 'Monthly') {
    considerations.push('limited to monthly sessions')
  }

  // Build explanation
  let explanation = ''

  if (score >= 80) {
    explanation = `Strong match. ${mentor.name} brings `
  } else if (score >= 60) {
    explanation = `Good match. ${mentor.name} offers `
  } else {
    explanation = `Potential match. ${mentor.name} has `
  }

  if (strengths.length > 0) {
    explanation += strengths.slice(0, 2).join(' and ')
  } else {
    explanation += 'relevant background for your startup journey'
  }

  explanation += '.'

  if (considerations.length > 0 && score < 80) {
    explanation += ` Note: ${mentor.name} ${considerations[0]}.`
  }

  return explanation
}

/**
 * Generate a relationship summary based on signals
 */
export function generateRelationshipSummary(
  signals: Signals,
  previousSignals?: Signals
): string {
  const { clarity, uncertainty, engagement } = signals
  
  const summaryParts: string[] = []

  // Assess clarity
  if (clarity >= 8) {
    summaryParts.push('demonstrates excellent clarity and shared understanding')
  } else if (clarity >= 5) {
    summaryParts.push('shows developing clarity on key topics')
  } else {
    summaryParts.push('indicates room for improved clarity')
  }

  // Assess uncertainty
  if (uncertainty <= 3) {
    summaryParts.push('with minimal remaining uncertainties')
  } else if (uncertainty >= 7) {
    summaryParts.push('with several open questions to address')
  }

  // Assess engagement
  if (engagement >= 8) {
    summaryParts.push('and highly active engagement from both parties')
  } else if (engagement >= 5) {
    summaryParts.push('and consistent engagement levels')
  } else {
    summaryParts.push('though engagement could be strengthened')
  }

  // Compare with previous if available
  if (previousSignals) {
    const clarityDelta = clarity - previousSignals.clarity
    const uncertaintyDelta = previousSignals.uncertainty - uncertainty
    const engagementDelta = engagement - previousSignals.engagement

    if (clarityDelta > 2 || uncertaintyDelta > 2 || engagementDelta > 2) {
      summaryParts.push('Significant positive progress observed.')
    } else if (clarityDelta < -2 || uncertaintyDelta < -2 || engagementDelta < -2) {
      summaryParts.push('Consider revisiting recent discussion points.')
    }
  }

  return `Relationship currently ${summaryParts.join(', ')}.`
}

/**
 * Generate ecosystem insight descriptions
 */
export function generateEcosystemInsights(
  totalRelationships: number,
  activeRelationships: number,
  totalInteractions: number
): string[] {
  const insights: string[] = []

  // Activity insight
  if (totalRelationships > 0) {
    const activeRate = Math.round((activeRelationships / totalRelationships) * 100)
    insights.push(`${activeRate}% of relationships are currently active`)
  }

  // Engagement insight
  if (totalInteractions > 0 && activeRelationships > 0) {
    const avgInteractions = Math.round(totalInteractions / activeRelationships * 10) / 10
    insights.push(`Average ${avgInteractions} interactions per active relationship`)
  }

  // Growth insight
  if (totalRelationships >= 10) {
    insights.push('Ecosystem growing steadily with strong mentor participation')
  } else if (totalRelationships >= 5) {
    insights.push('Ecosystem building momentum with increasing connections')
  } else {
    insights.push('Ecosystem in early growth phase — great time to build connections')
  }

  return insights
}
