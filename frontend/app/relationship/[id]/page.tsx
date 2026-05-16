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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-center items-center py-16">
            <Spinner className="h-8 w-8" />
          </div>
        </main>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <Card className="border-border/50">
            <CardContent className="py-16 text-center">
              <p className="text-destructive mb-4">{error || 'Relationship not found'}</p>
              <Button asChild>
                <Link href="/dashboard">Return to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/matching">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Matches
              </Link>
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Relationship Intelligence
          </h1>
          <p className="text-muted-foreground">
            Track and analyze your mentor-startup relationship progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Relationship Overview */}
            <div className="animate-fadeIn stagger-1">
              <RelationshipOverview
                startupName={data.startup.name}
                mentorName={data.mentor.name}
                compatibilityScore={data.relationship.compatibility_score}
                status={currentStatus}
                createdAt={data.relationship.created_at}
              />
            </div>

            {/* Signal Chart */}
            <Card className="border-border/50 animate-fadeIn stagger-2">
              <CardHeader>
                <CardTitle className="text-lg">Relationship Signals</CardTitle>
                <CardDescription>
                  Track clarity, uncertainty, and engagement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignalChart graphData={graphData} />
              </CardContent>
            </Card>

            {/* Interaction Form */}
            <Card className="border-border/50 animate-fadeIn stagger-3">
              <CardHeader>
                <CardTitle className="text-lg">Log Interaction</CardTitle>
                <CardDescription>
                  Record a meeting summary to extract relationship signals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InteractionForm
                  relationshipId={id}
                  onSubmitSuccess={handleInteractionSubmit}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lifecycle Status */}
            <Card className="border-border/50 animate-fadeIn stagger-2">
              <CardHeader>
                <CardTitle className="text-lg">Lifecycle Status</CardTitle>
                <CardDescription>
                  Update the relationship stage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LifecycleDropdown
                  currentStatus={currentStatus}
                  relationshipId={id}
                  onStatusChange={handleStatusChange}
                />
              </CardContent>
            </Card>

            {/* Relationship Summary */}
            {relationshipSummary && (
              <div className="animate-fadeIn stagger-3">
                <RelationshipSummaryCard summary={relationshipSummary} />
              </div>
            )}

            {/* Mentor Info */}
            <Card className="border-border/50 animate-fadeIn stagger-4">
              <CardHeader>
                <CardTitle className="text-lg">Mentor Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Name</span>
                  <p className="font-medium">{data.mentor.name}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Expertise</span>
                  <p className="font-medium">{data.mentor.expertise.join(', ')}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Availability</span>
                  <p className="font-medium">{data.mentor.availability}</p>
                </div>
              </CardContent>
            </Card>
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
