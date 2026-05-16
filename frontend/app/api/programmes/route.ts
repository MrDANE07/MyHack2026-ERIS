// GET /api/programmes - Get all programmes, partners, and service providers

import { NextResponse } from 'next/server'
import { programmes, partners, serviceProviders } from '@/lib/fakeData'
import type { ProgrammesResponse } from '@/lib/types'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        programmes,
        partners,
        serviceProviders
      }
    } as ProgrammesResponse)

  } catch (error) {
    console.error('[ERIS] Programmes fetch error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve programmes'
    } as ProgrammesResponse, { status: 500 })
  }
}
