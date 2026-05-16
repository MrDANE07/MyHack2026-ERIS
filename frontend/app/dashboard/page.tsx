'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { StartupCard } from '@/components/StartupCard'
import { EcosystemInsights } from '@/components/EcosystemInsights'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { startups } from '@/lib/fakeData'
import { generateMatches, getEcosystemStats } from '@/lib/api'
import type { EcosystemStats } from '@/lib/types'
import { toast } from 'sonner'
import { Zap, Cpu, Database, ArrowRight, Activity, Users } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [stats, setStats] = useState<EcosystemStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getEcosystemStats()
        if (response.success && response.stats) {
          setStats(response.stats)
        }
      } catch (error) {
        console.error('[ERIS] Failed to load ecosystem stats:', error)
      } finally {
        setIsLoadingStats(false)
      }
    }
    loadStats()
  }, [])

  const handleGenerateMatches = async () => {
    setIsGenerating(true)
    try {
      const response = await generateMatches(startups[0].id)
      if (response.success && response.matches) {
        sessionStorage.setItem('eris_matches', JSON.stringify(response.matches))
        sessionStorage.setItem('eris_startup_id', startups[0].id)
        router.push('/matching')
      } else {
        toast.error(response.error || 'Failed to generate matches')
      }
    } catch (error) {
      console.error('[ERIS] Match generation error:', error)
      toast.error('Failed to generate matches')
    } finally {
      setIsGenerating(false)
    }
  }

  const currentStartup = startups[0]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section - Left-weighted */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <span className="bio-dot bio-dot-teal" />
            <span className="data-label glow-teal">System Online</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-foreground">Welcome to </span>
            <span className="text-gradient">ERIS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Ecosystem Relationship Intelligence System — AI-powered mentor matching 
            for accelerator success.
          </p>
        </div>

        {/* Two-column card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Startup Profile Card */}
          <div className="glass-card p-6 hover-glow animate-fade-in delay-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Cpu className="h-6 w-6 text-primary" />
                <div className="absolute inset-0 bg-primary/30 blur-lg" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-wide">Your Startup</h2>
                <span className="data-id">ID: {currentStartup.id.slice(0, 8).toUpperCase()}</span>
              </div>
            </div>
            
            <StartupCard
              id={currentStartup.id}
              name={currentStartup.name}
              domain={currentStartup.domain}
              stage={currentStartup.stage}
              needs={currentStartup.needs}
              goals={currentStartup.goals}
              verified={currentStartup.verified}
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={handleGenerateMatches}
                disabled={isGenerating}
                className="btn-bio"
              >
                <span className="flex items-center gap-2">
                  {isGenerating ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Generate Matches
                    </>
                  )}
                </span>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-border/50 hover:border-primary/50 hover:bg-primary/5">
                <Link href="/programmes">
                  <Database className="mr-2 h-4 w-4" />
                  View Programmes
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="glass-card p-6 hover-glow animate-fade-in delay-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Activity className="h-6 w-6 text-secondary" />
                <div className="absolute inset-0 bg-secondary/30 blur-lg" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-wide">Quick Actions</h2>
                <span className="data-id">Navigate the ecosystem</span>
              </div>
            </div>

            <div className="space-y-4">
              <ActionCard
                title="Find Mentors"
                description="AI-powered matching based on your startup needs"
                href="/matching"
                icon={<Users className="h-5 w-5" />}
                color="teal"
                onClick={(e) => {
                  e.preventDefault()
                  handleGenerateMatches()
                }}
              />
              <ActionCard
                title="View Programmes"
                description="Explore accelerator programmes and partners"
                href="/programmes"
                icon={<Database className="h-5 w-5" />}
                color="violet"
              />
              <ActionCard
                title="Ecosystem Insights"
                description="View real-time ecosystem analytics and trends"
                href="/dashboard"
                icon={<Activity className="h-5 w-5" />}
                color="amber"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="glass-card p-6 hover-glow animate-fade-in delay-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="bio-dot bio-dot-violet" />
              <h2 className="text-lg font-semibold tracking-wide">Live Statistics</h2>
            </div>

            {isLoadingStats ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <Spinner className="h-6 w-6 text-primary" />
                <span className="data-label">Loading stats...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <StatBlock label="Active Mentors" value={stats?.totalMentors || 0} color="teal" />
                <StatBlock label="Startups" value={stats?.totalStartups || 0} color="violet" />
                <StatBlock label="Relationships" value={stats?.active_relationships || 0} color="amber" />
                <StatBlock label="Programmes" value={stats?.programmes || 0} color="teal" />
              </div>
            )}
          </div>

          {/* Ecosystem Insights */}
          <div className="animate-fade-in delay-400">
            <EcosystemInsights
              liveStats={stats || undefined}
              staticInsights={[
                "Growing ecosystem with active mentor participation",
                "Multi-country programmes spanning Malaysia and Singapore",
                "Verified partners and service providers available"
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function ActionCard({
  title,
  description,
  href,
  icon,
  color,
  onClick
}: {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  color: 'teal' | 'violet' | 'amber'
  onClick?: (e: React.MouseEvent) => void
}) {
  const colorClasses = {
    teal: 'hover:border-[hsl(166,100%,50%)] group-hover:text-[hsl(166,100%,50%)]',
    violet: 'hover:border-[hsl(275,100%,69%)] group-hover:text-[hsl(275,100%,69%)]',
    amber: 'hover:border-[hsl(38,100%,59%)] group-hover:text-[hsl(38,100%,59%)]'
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex items-center gap-4 p-4 rounded-lg border border-border/30 bg-background/30 backdrop-blur transition-all duration-300 ${colorClasses[color]} hover:bg-background/50`}
    >
      <div className="text-muted-foreground transition-colors duration-300 group-hover:text-inherit">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-foreground transition-colors duration-300 group-hover:text-inherit">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:translate-x-1 transition-all" />
    </Link>
  )
}

function StatBlock({ label, value, color }: { label: string; value: number; color: 'teal' | 'violet' | 'amber' }) {
  const colorClasses = {
    teal: 'glow-teal',
    violet: 'glow-violet',
    amber: 'glow-amber'
  }

  return (
    <div className="p-4 rounded-lg border border-border/30 bg-background/20">
      <span className="data-label">{label}</span>
      <div className={`data-value number-pulse mt-1 ${colorClasses[color]}`}>
        {value.toLocaleString()}
      </div>
    </div>
  )
}
