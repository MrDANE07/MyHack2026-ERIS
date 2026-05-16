// POST /api/update-lifecycle - Update relationship status

import { NextResponse } from 'next/server'
import { getRelationshipById, updateRelationshipStatus, isValidTransition } from '@/lib/store'
import type { UpdateLifecycleResponse, Relationship } from '@/lib/types'

const VALID_STATUSES = ['Created', 'Active', 'Completed', 'Failed'] as const

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { relationship_id, new_status } = body

    // Validation
    if (!relationship_id) {
      return NextResponse.json({
        success: false,
        error: 'relationship_id is required'
      } as UpdateLifecycleResponse, { status: 400 })
    }

    if (!new_status) {
      return NextResponse.json({
        success: false,
        error: 'new_status is required'
      } as UpdateLifecycleResponse, { status: 400 })
    }

    // Validate status value
    if (!VALID_STATUSES.includes(new_status)) {
      return NextResponse.json({
        success: false,
        error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`
      } as UpdateLifecycleResponse, { status: 400 })
    }

    // Get existing relationship
    const relationship = getRelationshipById(relationship_id)
    if (!relationship) {
      return NextResponse.json({
        success: false,
        error: `Relationship with id "${relationship_id}" not found`
      } as UpdateLifecycleResponse, { status: 404 })
    }

    // Validate transition
    if (!isValidTransition(relationship.status, new_status as Relationship['status'])) {
      return NextResponse.json({
        success: false,
        error: `Invalid transition: ${relationship.status} → ${new_status} is not allowed`
      } as UpdateLifecycleResponse, { status: 400 })
    }

    // Update status
    const updated = updateRelationshipStatus(relationship_id, new_status as Relationship['status'])

    if (!updated) {
      return NextResponse.json({
        success: false,
        error: 'Failed to update relationship status'
      } as UpdateLifecycleResponse, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      updated_status: updated.status
    } as UpdateLifecycleResponse)

  } catch (error) {
    console.error('[ERIS] Update lifecycle error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update lifecycle status'
    } as UpdateLifecycleResponse, { status: 500 })
  }
}
