// POST /api/match - Generate AI compatibility scores

import { NextResponse } from 'next/server'
import { startups, mentors, getStartupById } from '@/lib/fakeData'
import { generateMentorMatches } from '@/lib/scoring'
import { generateMatchExplanation } from '@/lib/explanations'
import type { MatchResult, MatchResponse } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { startup_id } = body

    // Validation
    if (!startup_id) {
      return NextResponse.json({
        success: false,
        error: 'startup_id is required'
      } as MatchResponse, { status: 400 })
    }

    const startup = getStartupById(startup_id)

    if (!startup) {
      return NextResponse.json({
        success: false,
        error: `Startup with id "${startup_id}" not found`
      } as MatchResponse, { status: 404 })
    }

    // Generate matches
    const matchResults = generateMentorMatches(startup, mentors)

    const matches: MatchResult[] = matchResults.map(({ mentor, breakdown }) => ({
      mentor_id: mentor.id,
      mentor_name: mentor.name,
      compatibility_score: breakdown.totalScore,
      explanation: generateMatchExplanation(startup, mentor, breakdown.totalScore),
      expertise: mentor.expertise,
      availability: mentor.availability,
      verified: mentor.verified
    }))

    return NextResponse.json({
      success: true,
      matches
    } as MatchResponse)

  } catch (error) {
    console.error('[ERIS] Match generation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to generate matches'
    } as MatchResponse, { status: 500 })
  }
}
