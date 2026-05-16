// GET /api/ecosystem-stats - Get live ecosystem statistics

import { NextResponse } from 'next/server'
import { getEcosystemStats } from '@/lib/store'
import type { EcosystemStatsResponse } from '@/lib/types'

export async function GET() {
  try {
    const stats = getEcosystemStats()

    return NextResponse.json({
      success: true,
      stats
    } as EcosystemStatsResponse)

  } catch (error) {
    console.error('[ERIS] Ecosystem stats error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve ecosystem statistics'
    } as EcosystemStatsResponse, { status: 500 })
  }
}
