// GET /api/relationship/[id] - Get relationship details

import { NextResponse } from 'next/server'
import { getRelationshipById, getInteractionsByRelationship } from '@/lib/store'
import { getStartupById, getMentorById, seededRelationshipHistory } from '@/lib/fakeData'
import type { GraphDataPoint } from '@/lib/types'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const relationship = getRelationshipById(id)

    if (!relationship) {
      return NextResponse.json({
        success: false,
        error: `Relationship with id "${id}" not found`
      }, { status: 404 })
    }

    const startup = getStartupById(relationship.startup_id)
    const mentor = getMentorById(relationship.mentor_id)

    if (!startup || !mentor) {
      return NextResponse.json({
        success: false,
        error: 'Related startup or mentor not found'
      }, { status: 404 })
    }

    // Get interactions and build graph data
    const interactions = getInteractionsByRelationship(id)
    
    // Start with seeded history, then add actual interactions
    const graphData: GraphDataPoint[] = [...seededRelationshipHistory]
    
    interactions.forEach((interaction, index) => {
      graphData.push({
        week: seededRelationshipHistory.length + index + 1,
        clarity: interaction.clarity,
        uncertainty: interaction.uncertainty,
        engagement: interaction.engagement
      })
    })

    return NextResponse.json({
      success: true,
      data: {
        relationship,
        startup: {
          id: startup.id,
          name: startup.name,
          domain: startup.domain,
          stage: startup.stage,
          verified: startup.verified
        },
        mentor: {
          id: mentor.id,
          name: mentor.name,
          expertise: mentor.expertise,
          availability: mentor.availability,
          verified: mentor.verified
        },
        graphData,
        interactions
      }
    })

  } catch (error) {
    console.error('[ERIS] Get relationship error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve relationship'
    }, { status: 500 })
  }
}
