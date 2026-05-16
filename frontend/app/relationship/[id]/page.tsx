'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { RelationshipOverview } from '@/components/RelationshipOverview'
import { SignalChart } from '@/components/SignalChart'
import { InteractionForm } from '@/components/InteractionForm'
import { LifecycleDropdown } from '@/components/LifecycleDropdown'
import { RelationshipSummaryCard } from '@/components/RelationshipSummaryCard'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { getRelationship } from '@/lib/api'
import type { Relationship, GraphDataPoint, Signals } from '@/lib/types'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'

interface RelationshipData {
  relationship: Relationship
  startup: {
    id: string
    name: string
    domain: string[]
    stage: number
    verified: boolean
  }
  mentor: {
    id: string
    name: string
    expertise: string[]
    availability: string
    verified: boolean
  }
  graphData: GraphDataPoint[]
}

export default function RelationshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [data, setData] = useState<RelationshipData | null>(null)
  const [graphData, setGraphData] = useState<GraphDataPoint[]>([])
  const [relationshipSummary, setRelationshipSummary] = useState<string>('')
  const [currentStatus, setCurrentStatus] = useState<Relationship['status']>('Created')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRelationship = async () => {
      try {
        const response = await getRelationship(id)
        if (response.success && response.data) {
          setData(response.data)
          setGraphData(response.data.graphData)
          setCurrentStatus(response.data.relationship.status)

          // Generate initial summary based on latest graph data
          if (response.data.graphData.length > 0) {
            const latest = response.data.graphData[response.data.graphData.length - 1]
            setRelationshipSummary(generateInitialSummary(latest))
          }
        } else {
          setError(response.error || 'Failed to load relationship')
        }
      } catch (err) {
        console.error('[ERIS] Failed to load relationship:', err)
        setError('Failed to load relationship data')
      } finally {
        setIsLoading(false)
      }
    }
    loadRelationship()
  }, [id])

  const handleInteractionSubmit = (signals: Signals, summary: string) => {
    // Append new data point to graph
    const newDataPoint: GraphDataPoint = {
      week: graphData.length + 1,
      clarity: signals.clarity,
      uncertainty: signals.uncertainty,
      engagement: signals.engagement
    }
    setGraphData(prev => [...prev, newDataPoint])

    // Update relationship summary
    setRelationshipSummary(summary || generateSummaryFromSignals(signals))

    toast.success('Interaction recorded successfully!')
  }

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus as Relationship['status'])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
          <div className="flex flex-col justify-center items-center py-16 gap-4">
            <div className="relative">
              <Spinner className="h-10 w-10 text-primary" />
              <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
            </div>
            <p className="text-muted-foreground font-mono text-sm tracking-wider uppercase">Loading relationship data...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
          <div className="glass-card p-16 text-center">
            <p className="text-destructive mb-4">{error || 'Relationship not found'}</p>
            <Button asChild className="btn-bio">
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/matching" className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Matches</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="bio-dot bio-dot-teal" />
            <span className="data-label glow-teal">Relationship Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-foreground">Track Your </span>
            <span className="text-gradient">Connection</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Monitor mentor-startup relationship progress through AI-powered signal extraction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Relationship Overview */}
            <div className="animate-fade-in delay-100">
              <RelationshipOverview
                startupName={data.startup.name}
                mentorName={data.mentor.name}
                compatibilityScore={data.relationship.compatibility_score}
                status={currentStatus}
                createdAt={data.relationship.created_at}
              />
            </div>

            {/* Signal Chart */}
            <div className="glass-card p-6 hover-glow animate-fade-in delay-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="bio-dot bio-dot-violet" />
                <div>
                  <h2 className="text-lg font-semibold tracking-wide">Relationship Signals</h2>
                  <span className="data-label">Track key metrics over time</span>
                </div>
              </div>
              <SignalChart graphData={graphData} />
            </div>

            {/* Interaction Form */}
            <div className="glass-card p-6 hover-glow animate-fade-in delay-300">
              <div className="flex items-center gap-3 mb-6">
                <span className="bio-dot bio-dot-amber" />
                <div>
                  <h2 className="text-lg font-semibold tracking-wide">Log Interaction</h2>
                  <span className="data-label">Extract signals from meeting notes</span>
                </div>
              </div>
              <InteractionForm
                relationshipId={id}
                onSubmitSuccess={handleInteractionSubmit}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lifecycle Status */}
            <div className="glass-card p-6 hover-glow animate-fade-in delay-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="bio-dot bio-dot-teal" />
                <div>
                  <h2 className="text-lg font-semibold tracking-wide">Lifecycle Status</h2>
                  <span className="data-label">Update relationship stage</span>
                </div>
              </div>
              <LifecycleDropdown
                currentStatus={currentStatus}
                relationshipId={id}
                onStatusChange={handleStatusChange}
              />
            </div>

            {/* Relationship Summary */}
            {relationshipSummary && (
              <div className="animate-fade-in delay-300">
                <RelationshipSummaryCard summary={relationshipSummary} />
              </div>
            )}

            {/* Mentor Info */}
            <div className="glass-card p-6 hover-glow animate-fade-in delay-400">
              <div className="flex items-center gap-3 mb-6">
                <span className="bio-dot bio-dot-violet" />
                <h2 className="text-lg font-semibold tracking-wide">Mentor Profile</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="data-label mb-1 block">Name</span>
                  <p className="font-medium text-foreground">{data.mentor.name}</p>
                </div>
                <div>
                  <span className="data-label mb-1 block">Expertise</span>
                  <p className="font-medium text-foreground">{data.mentor.expertise.join(', ')}</p>
                </div>
                <div>
                  <span className="data-label mb-1 block">Availability</span>
                  <p className="font-medium text-foreground">{data.mentor.availability}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function generateInitialSummary(latest: GraphDataPoint): string {
  const { clarity, uncertainty, engagement } = latest

  if (clarity >= 7 && uncertainty <= 4 && engagement >= 7) {
    return 'Relationship shows strong progress with high clarity and engagement.'
  } else if (clarity >= 5 && engagement >= 5) {
    return 'Relationship developing well with room for continued growth.'
  } else {
    return 'Relationship in early stages — regular interactions will help build momentum.'
  }
}

function generateSummaryFromSignals(signals: Signals): string {
  const { clarity, uncertainty, engagement } = signals

  if (clarity >= 8 && engagement >= 8) {
    return 'Excellent interaction! Strong clarity and engagement observed.'
  } else if (uncertainty >= 7) {
    return 'Several open questions remain — consider a follow-up session to address uncertainties.'
  } else if (engagement <= 4) {
    return 'Engagement levels could be improved — consider more interactive discussion formats.'
  } else {
    return 'Solid progress made in this interaction.'
  }
}
