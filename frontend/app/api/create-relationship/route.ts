// POST /api/create-relationship - Create a new relationship

import { NextResponse } from 'next/server'
import { getStartupById, getMentorById } from '@/lib/fakeData'
import { createRelationship } from '@/lib/store'
import type { CreateRelationshipResponse } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { startup_id, mentor_id, compatibility_score } = body

    // Validation
    if (!startup_id || !mentor_id || compatibility_score === undefined) {
      return NextResponse.json({
        success: false,
        error: 'All fields (startup_id, mentor_id, compatibility_score) are required'
      } as CreateRelationshipResponse, { status: 400 })
    }

    // Verify startup exists
    if (!getStartupById(startup_id)) {
      return NextResponse.json({
        success: false,
        error: `Startup with id "${startup_id}" not found`
      } as CreateRelationshipResponse, { status: 404 })
    }

    // Verify mentor exists
    if (!getMentorById(mentor_id)) {
      return NextResponse.json({
        success: false,
        error: `Mentor with id "${mentor_id}" not found`
      } as CreateRelationshipResponse, { status: 404 })
    }

    // Validate compatibility_score
    if (typeof compatibility_score !== 'number' || compatibility_score < 0 || compatibility_score > 100) {
      return NextResponse.json({
        success: false,
        error: 'compatibility_score must be a number between 0 and 100'
      } as CreateRelationshipResponse, { status: 400 })
    }

    // Create relationship
    const relationship = createRelationship(startup_id, mentor_id, Math.round(compatibility_score))

    return NextResponse.json({
      success: true,
      relationship_id: relationship.relationship_id
    } as CreateRelationshipResponse)

  } catch (error) {
    console.error('[ERIS] Create relationship error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create relationship'
    } as CreateRelationshipResponse, { status: 500 })
  }
}
