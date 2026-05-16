'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import RelationshipOverview from '@/components/RelationshipOverview'
import SignalChart from '@/components/SignalChart'
import RelationshipSummaryCard from '@/components/RelationshipSummaryCard'
import LifecycleDropdown from '@/components/LifecycleDropdown'
import InteractionForm from '@/components/InteractionForm'
import { extractSignals, updateLifecycle, getRelationship } from '@/lib/api'

const initialData = {
  startupName: 'NeuroFlow AI',
  mentorName: 'Sarah Lim',
  compatibilityScore: 87,
  status: 'Created' as const,
  createdAt: '2026-05-14T10:00:00Z'
}

const seedGraph = [
  { week: 1, clarity: 3, uncertainty: 9, engagement: 5 },
  { week: 2, clarity: 5, uncertainty: 7, engagement: 6 }
]

export default function RelationshipDetailPage() {
  const params = useParams()
  const relationshipId = params.id as string

  const [relationship, setRelationship] = useState(initialData)
  const [graphData, setGraphData] = useState(seedGraph)
  const [summary, setSummary] = useState<string | null>(null)

  const handleStatusChange = (newStatus: string) => {
    setRelationship(prev => ({ ...prev, status: newStatus as any }))
  }

  const handleInteractionSubmit = (
    signals: { clarity: number; uncertainty: number; engagement: number },
    newSummary: string
  ) => {
    setGraphData(prev => [
      ...prev,
      { week: prev.length + 1, ...signals }
    ])
    setSummary(newSummary)
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
      <RelationshipOverview
        startupName={relationship.startupName}
        mentorName={relationship.mentorName}
        compatibilityScore={relationship.compatibilityScore}
        status={relationship.status}
        createdAt={relationship.createdAt}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <SignalChart graphData={graphData} />
          </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4">
          <RelationshipSummaryCard summary={summary} />
          <LifecycleDropdown
            currentStatus={relationship.status}
            relationshipId={relationshipId}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      <InteractionForm
        relationshipId={relationshipId}
        onSubmitSuccess={handleInteractionSubmit}
      />
    </main>
  )
}
