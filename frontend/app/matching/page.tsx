'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { MatchResultCard } from '@/components/MatchResultCard'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { createRelationship, generateMatches } from '@/lib/api'
import { startups } from '@/lib/fakeData'
import type { MatchResult } from '@/lib/types'
import { toast } from 'sonner'
import { ArrowLeft, RefreshCw, Zap, Target, Users, Sparkles } from 'lucide-react'

export default function MatchingPage() {
  const router = useRouter()
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState<string | null>(null)
  const [startupId, setStartupId] = useState<string>(startups[0].id)

  useEffect(() => {
    const storedMatches = sessionStorage.getItem('eris_matches')
    const storedStartupId = sessionStorage.getItem('eris_startup_id')
    
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches))
      if (storedStartupId) setStartupId(storedStartupId)
      setIsLoading(false)
    } else {
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
  const strongMatches = matches.filter(m => m.compatibility_score >= 80).length
  const goodMatches = matches.filter(m => m.compatibility_score >= 60 && m.compatibility_score < 80).length
  const otherMatches = matches.filter(m => m.compatibility_score < 60).length

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
          </div>
          
          <div className="glass-card p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Mentor Matches
                  </h1>
                </div>
                <p className="text-muted-foreground text-lg">
                  AI-generated compatibility analysis for{' '}
                  <span className="glow-teal font-semibold">{startup.name}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2 font-mono">
                  STARTUP_ID: {startup.id}
                </p>
              </div>
              
              <Button
                onClick={loadMatches}
                disabled={isLoading}
                className="btn-bio"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Regenerate Matches
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {!isLoading && matches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-5 hover-glow">
              <div className="flex items-center gap-3">
                <div className="bio-dot bio-dot-teal" />
                <div>
                  <div className="data-label">Total Matches</div>
                  <div className="text-2xl font-bold glow-teal number-pulse">{matches.length}</div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-5 hover-glow">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <div className="data-label">Strong Matches</div>
                  <div className="text-2xl font-bold text-primary">{strongMatches}</div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-5 hover-glow">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-secondary" />
                <div>
                  <div className="data-label">Good Matches</div>
                  <div className="text-2xl font-bold text-secondary">{goodMatches}</div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-5 hover-glow">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-accent" />
                <div>
                  <div className="data-label">Other</div>
                  <div className="text-2xl font-bold text-accent">{otherMatches}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="glass-card p-16 flex flex-col items-center justify-center">
            <div className="relative">
              <Spinner className="h-12 w-12 text-primary" />
              <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
            </div>
            <p className="text-muted-foreground mt-6 font-mono text-sm">
              ANALYZING COMPATIBILITY VECTORS...
            </p>
            <div className="bio-progress w-64 mt-4">
              <div 
                className="bio-progress-fill bio-progress-teal" 
                style={{ width: '60%', animation: 'shimmer 1.5s infinite' }}
              />
            </div>
          </div>
        ) : matches.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <div className="text-6xl mb-4 opacity-30">🔍</div>
            <p className="text-muted-foreground mb-6">No matches found in the current dataset</p>
            <Button onClick={loadMatches} className="btn-bio">
              <span>Generate Matches</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            {matches.map((match, index) => (
              <div
                key={match.mentor_id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
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

        {/* Summary Section */}
        {!isLoading && matches.length > 0 && (
          <div className="mt-10 glass-card p-6 circuit-line circuit-line-h">
            <div className="flex items-center gap-3 mb-4">
              <div className="bio-dot bio-dot-violet" />
              <h3 className="text-lg font-semibold">Match Analysis Summary</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-3xl font-bold glow-teal mb-1">{strongMatches}</div>
                <div className="text-sm text-muted-foreground">Strong Compatibility (80%+)</div>
                <div className="bio-progress mt-3">
                  <div 
                    className="bio-progress-fill bio-progress-teal" 
                    style={{ width: `${(strongMatches / matches.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="text-3xl font-bold glow-violet mb-1">{goodMatches}</div>
                <div className="text-sm text-muted-foreground">Good Compatibility (60-79%)</div>
                <div className="bio-progress mt-3">
                  <div 
                    className="bio-progress-fill bio-progress-violet" 
                    style={{ width: `${(goodMatches / matches.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="text-3xl font-bold glow-amber mb-1">{otherMatches}</div>
                <div className="text-sm text-muted-foreground">Developing Matches (&lt;60%)</div>
                <div className="bio-progress mt-3">
                  <div 
                    className="bio-progress-fill bio-progress-amber" 
                    style={{ width: `${(otherMatches / matches.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-6 font-mono text-center">
              ALGORITHM: MULTI-DIMENSIONAL COMPATIBILITY SCORING v2.1 | CONFIDENCE: HIGH
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
