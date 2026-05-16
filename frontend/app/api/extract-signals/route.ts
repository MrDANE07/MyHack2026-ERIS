// POST /api/extract-signals - Extract signals from interaction summary using AI

import { NextResponse } from 'next/server'
import { getRelationshipById, createInteraction, getInteractionsByRelationship } from '@/lib/store'
import { extractSignals } from '@/lib/gemini'
import { generateRelationshipSummary } from '@/lib/explanations'
import type { ExtractSignalsResponse, Signals } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { relationship_id, summary } = body

    // Validation
    if (!relationship_id) {
      return NextResponse.json({
        success: false,
        error: 'relationship_id is required'
      } as ExtractSignalsResponse, { status: 400 })
    }

    if (!summary || typeof summary !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'summary is required'
      } as ExtractSignalsResponse, { status: 400 })
    }

    if (summary.length < 10) {
      return NextResponse.json({
        success: false,
        error: 'summary must be at least 10 characters'
      } as ExtractSignalsResponse, { status: 400 })
    }

    // Verify relationship exists
    const relationship = getRelationshipById(relationship_id)
    if (!relationship) {
      return NextResponse.json({
        success: false,
        error: `Relationship with id "${relationship_id}" not found`
      } as ExtractSignalsResponse, { status: 404 })
    }

    // Extract signals using Gemini
    const signals = await extractSignals(summary)

    // Get previous interactions for summary context
    const previousInteractions = getInteractionsByRelationship(relationship_id)
    const previousSignals: Signals | undefined = previousInteractions.length > 0
      ? {
          clarity: previousInteractions[previousInteractions.length - 1].clarity,
          uncertainty: previousInteractions[previousInteractions.length - 1].uncertainty,
          engagement: previousInteractions[previousInteractions.length - 1].engagement
        }
      : undefined

    // Save interaction
    createInteraction(
      relationship_id,
      summary,
      signals.clarity,
      signals.uncertainty,
      signals.engagement
    )

    // Generate relationship summary
    const relationshipSummary = generateRelationshipSummary(signals, previousSignals)

    return NextResponse.json({
      success: true,
      signals,
      relationship_summary: relationshipSummary
    } as ExtractSignalsResponse)

  } catch (error) {
    console.error('[ERIS] Signal extraction error:', error)
    return NextResponse.json({
      success: false,
      error: 'Gemini extraction failed'
    } as ExtractSignalsResponse, { status: 500 })
  }
}
