'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { MatchResultCard } from '@/components/MatchResultCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { createRelationship, generateMatches } from '@/lib/api'
import { startups } from '@/lib/fakeData'
import type { MatchResult } from '@/lib/types'
import { toast } from 'sonner'
import { ArrowLeft, RefreshCw } from 'lucide-react'

export default function MatchingPage() {
  const router = useRouter()
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState<string | null>(null)
  const [startupId, setStartupId] = useState<string>(startups[0].id)

  useEffect(() => {
    // Check for stored matches from dashboard
    const storedMatches = sessionStorage.getItem('eris_matches')
    const storedStartupId = sessionStorage.getItem('eris_startup_id')
    
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches))
      if (storedStartupId) setStartupId(storedStartupId)
      setIsLoading(false)
    } else {
      // Generate matches if none stored
      loadMatches()
    }
  }, [])

  const loadMatches = async () => {
    setIsLoading(true)
    try {
      const response = await generateMatches(startupId)
      if (response.success && response.matches) {
        setMatches(response.matches)
        sessionStorage.setItem('eris_matches', JSON.stringify(response.matches))
        sessionStorage.setItem('eris_startup_id', startupId)
      } else {
        toast.error(response.error || 'Failed to generate matches')
      }
    } catch (error) {
      console.error('[ERIS] Match generation error:', error)
      toast.error('Failed to generate matches')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateRelationship = async (match: MatchResult) => {
    setIsCreating(match.mentor_id)
    try {
      const response = await createRelationship(
        startupId,
        match.mentor_id,
        match.compatibility_score
      )
      
      if (response.success && response.relationship_id) {
        toast.success('Relationship created successfully!')
        router.push(`/relationship/${response.relationship_id}`)
      } else {
        toast.error(response.error || 'Failed to create relationship')
      }
    } catch (error) {
      console.error('[ERIS] Create relationship error:', error)
      toast.error('Failed to create relationship')
    } finally {
      setIsCreating(null)
    }
  }

  const startup = startups.find(s => s.id === startupId) || startups[0]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Mentor Matches
              </h1>
              <p className="text-muted-foreground">
                AI-generated compatibility matches for <span className="font-medium text-foreground">{startup.name}</span>
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={loadMatches}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Matches
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <Card className="border-border/50">
            <CardContent className="py-16 flex flex-col items-center justify-center">
              <Spinner className="h-8 w-8 mb-4" />
              <p className="text-muted-foreground">Analyzing compatibility...</p>
            </CardContent>
          </Card>
        ) : matches.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground mb-4">No matches found</p>
              <Button onClick={loadMatches}>Generate Matches</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {matches.map((match, index) => (
              <div
                key={match.mentor_id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MatchResultCard
                  mentorName={match.mentor_name}
                  compatibilityScore={match.compatibility_score}
                  explanation={match.explanation}
                  expertise={match.expertise}
                  availability={match.availability}
                  verified={match.verified}
                  onCreateRelationship={() => handleCreateRelationship(match)}
                  isCreating={isCreating === match.mentor_id}
                />
              </div>
            ))}
          </div>
        )}

        {/* Summary Card */}
        {!isLoading && matches.length > 0 && (
          <Card className="mt-8 border-border/50 animate-fadeIn bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">Match Summary</CardTitle>
              <CardDescription>
                Found {matches.length} potential mentors ranked by compatibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-chart-3">
                    {matches.filter(m => m.compatibility_score >= 80).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Strong Matches</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-chart-5">
                    {matches.filter(m => m.compatibility_score >= 60 && m.compatibility_score < 80).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Good Matches</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-muted-foreground">
                    {matches.filter(m => m.compatibility_score < 60).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Other Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
