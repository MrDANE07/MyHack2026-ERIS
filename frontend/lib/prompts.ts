// ERIS Gemini Prompt Templates

/**
 * Signal extraction prompt for Gemini 3.1
 * Extracts clarity, uncertainty, and engagement signals from interaction summaries
 */
export const SIGNAL_EXTRACTION_PROMPT = (summary: string) => `
You are an expert relationship analyst. Analyse the following mentor-startup interaction
summary and extract 3 relationship intelligence signals.

Interaction summary:
"${summary}"

Signal definitions:
- clarity (1–10): How much shared understanding was established. 10 = fully clear.
- uncertainty (1–10): How much uncertainty or open questions remain. 10 = highly uncertain.
- engagement (1–10): How actively engaged both parties were. 10 = highly engaged.

Respond ONLY with a JSON object. No markdown. No explanation. No commentary. No code fences.

{
  "clarity": <integer 1-10>,
  "uncertainty": <integer 1-10>,
  "engagement": <integer 1-10>
}
`

/**
 * Match explanation enhancement prompt
 * Generates more detailed explanations when needed
 */
export const MATCH_EXPLANATION_PROMPT = (
  startupName: string,
  startupDomains: string[],
  startupNeeds: string[],
  mentorName: string,
  mentorExpertise: string[],
  score: number
) => `
Generate a concise, professional explanation for why ${mentorName} is a good match for ${startupName}.

Startup context:
- Domains: ${startupDomains.join(', ')}
- Needs: ${startupNeeds.join(', ')}

Mentor expertise: ${mentorExpertise.join(', ')}
Compatibility score: ${score}/100

Write 1-2 sentences explaining the match. Be specific about overlapping expertise.
Do not include the score in your response. Be encouraging but honest.
`

/**
 * Relationship summary generation prompt
 */
export const RELATIONSHIP_SUMMARY_PROMPT = (
  clarity: number,
  uncertainty: number,
  engagement: number,
  interactionCount: number
) => `
Generate a brief relationship health summary based on these signals:

- Clarity: ${clarity}/10 (shared understanding level)
- Uncertainty: ${uncertainty}/10 (remaining open questions)
- Engagement: ${engagement}/10 (participation level)
- Total interactions: ${interactionCount}

Write 1-2 sentences summarizing the relationship's current state and trajectory.
Be professional and constructive. Focus on actionable insights.
`
