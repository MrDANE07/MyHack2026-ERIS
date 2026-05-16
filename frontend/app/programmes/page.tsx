'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { ProgrammeCard } from '@/components/ProgrammeCard'
import { VerificationBadge } from '@/components/VerificationBadge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getProgrammes } from '@/lib/api'
import type { Programme, Partner, ServiceProvider } from '@/lib/types'
import { ArrowLeft, Building2, Users, Briefcase, Globe, Sparkles, Zap, Activity, ArrowRight } from 'lucide-react'

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getProgrammes()
        if (response.success && response.data) {
          setProgrammes(response.data.programmes)
          setPartners(response.data.partners)
          setServiceProviders(response.data.serviceProviders)
        }
      } catch (error) {
        console.error('[ERIS] Failed to load programmes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
          <div className="flex flex-col justify-center items-center py-16 gap-4">
            <div className="relative">
              <Spinner className="h-10 w-10 text-primary" />
              <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
            </div>
            <p className="text-muted-foreground font-mono text-sm tracking-wider uppercase">Loading ecosystem data...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero Section - matching dashboard style */}
        <div className="mb-12 animate-circuircuit-line-h animate-fade-in">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bio-dot bio-dot-violet" />
            <span className="data-label glow-violet">Ecosystem Network</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-foreground">Programme </span>
            <span className="text-gradient">Overview</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore accelerator programmes, strategic partners, and service providers
            within the ERIS ecosystem.
          </p>
        </div>

        {/* Two-column card grid - matching dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="glass-card p-6 hover-glow animate-fade-in delay-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="bio-dot bio-dot-violet" />
              <h2 className="text-lg font-semibold tracking-wide">Network Statistics</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <StatBlock label="Active Programmes" value={programmes.length} color="teal" progress="85%" />
              <StatBlock label="Strategic Partners" value={partners.length} color="violet" progress="70%" />
              <StatBlock label="Service Providers" value={serviceProviders.length} color="amber" progress="60%" />
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
                <h2 className="text-lg font-semibold tracking-wide">Quick Navigation</h2>
                <span className="data-id">Explore ecosystem resources</span>
              </div>
            </div>

            <div className="space-y-4">
              <ActionCard
                title="View Programmes"
                description="Browse accelerator programmes and their cohorts"
                href="#programmes"
                icon={<Building2 className="h-5 w-5" />}
                color="teal"
              />
              <ActionCard
                title="Strategic Partners"
                description="Connect with verified ecosystem partners"
                href="#partners"
                icon={<Users className="h-5 w-5" />}
                color="violet"
              />
              <ActionCard
                title="Service Providers"
                description="Access specialized services and resources"
                href="#services"
                icon={<Briefcase className="h-5 w-5" />}
                color="amber"
              />
            </div>
          </div>
        </div>

        {/* Tabs Section - enhanced bioluminescent effects */}
        <div className="glass-card p-6 animate-fade-in delay-300">
          <Tabs defaultValue="programmes">
            <TabsList className="mb-6 bg-background/30 border border-border/30 p-1 h-auto">
              <TabsTrigger
                value="programmes"
                className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_20px_rgba(0,255,209,0.4)] transition-all font-mono uppercase tracking-wider text-xs"
              >
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Programmes</span>
                <Badge variant="secondary" className="ml-1 bg-primary/10 text-primary border-primary/30 font-mono glow-teal">
                  {programmes.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="partners"
                className="gap-2 data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary data-[state=active]:shadow-[0_0_20px_rgba(191,95,255,0.4)] transition-all font-mono uppercase tracking-wider text-xs"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Partners</span>
                <Badge variant="secondary" className="ml-1 bg-secondary/10 text-secondary border-secondary/30 font-mono glow-violet">
                  {partners.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="gap-2 data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:shadow-[0_0_20px_rgba(255,184,48,0.4)] transition-all font-mono uppercase tracking-wider text-xs"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Services</span>
                <Badge variant="secondary" className="ml-1 bg-accent/10 text-accent border-accent/30 font-mono glow-amber">
                  {serviceProviders.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent id="programmes" value="programmes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programmes.map((programme, index) => (
                  <div
                    key={programme.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProgrammeCard
                      id={programme.id}
                      name={programme.name}
                      country={programme.country}
                      focus_areas={programme.focus_areas}
                      status={programme.status}
                      cohort_size={programme.cohort_size}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent id="partners" value="partners" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partners.map((partner, index) => (
                  <div
                    key={partner.id}
                    className="glass-card p-6 animate-fade-in group hover:border-secondary/50 transition-all duration-300 hover-glow bracket-corners"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center border border-secondary/30 group-hover:shadow-[0_0_30px_rgba(191,95,255,0.5)] transition-all duration-300">
                          <Users className="h-6 w-6 text-secondary" />
                          <div className="absolute inset-0 bg-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-secondary transition-colors glow-effect-hover">
                            {partner.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                            <span className="bio-dot bio-dot-violet" />
                            <span className="uppercase tracking-wider text-xs glow-violet">{partner.type}</span>
                            <span className="text-border">|</span>
                            <span>{partner.country}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="data-label mb-2 block">Initiatives</span>
                      <div className="flex flex-wrap gap-2">
                        {partner.initiatives.map(initiative => (
                          <Badge
                            key={initiative}
                            variant="outline"
                            className="bg-secondary/5 border-secondary/30 text-secondary/90 hover:bg-secondary/15 hover:border-secondary/50 hover:shadow-[0_0_15px_rgba(191,95,255,0.3)] transition-all duration-300 font-mono text-xs"
                          >
                            {initiative}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 bio-progress bio-progress-violet">
                      <div className="bio-progress-fill" style={{ width: `${Math.random() * 40 + 60}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent id="services" value="services" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceProviders.map((provider, index) => (
                  <div
                    key={provider.id}
                    className="glass-card p-6 animate-fade-in group hover:border-accent/50 transition-all duration-300 hover-glow bracket-corners"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center border border-accent/30 group-hover:shadow-[0_0_25px_rgba(255,184,48,0.5)] transition-all duration-300">
                          <Sparkles className="h-5 w-5 text-accent" />
                          <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors glow-effect-hover">
                            {provider.name}
                          </h3>
                          <span className="data-id">ID: {provider.id.slice(0, 8).toUpperCase()}</span>
                        </div>
                      </div>
                      <VerificationBadge verified={provider.verified} />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {provider.services.map(service => (
                        <Badge
                          key={service}
                          variant="secondary"
                          className="bg-accent/5 border border-accent/30 text-accent/90 hover:bg-accent/15 hover:border-accent/50 hover:shadow-[0_0_15px_rgba(255,184,48,0.3)] transition-all duration-300 font-mono text-xs"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 bio-progress bio-progress-amber">
                      <div className="bio-progress-fill" style={{ width: `${Math.random() * 30 + 50}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom CTA Section - enhanced */}
        <div className="mt-8 glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in delay-500 hover-glow">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 bg-primary/30 blur-lg animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gradient-teal-violet">Ready to find your perfect mentor?</h3>
              <p className="text-sm text-muted-foreground">Use AI-powered matching to connect with the right mentors.</p>
            </div>
          </div>
          <Button asChild className="btn-bio">
            <Link href="/matching">
              <span className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Start Matching
              </span>
            </Link>
          </Button>
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
  color
}: {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  color: 'teal' | 'violet' | 'amber'
}) {
  const colorClasses = {
    teal: 'hover:border-[hsl(166,100%,50%)] group-hover:text-[hsl(166,100%,50%)] hover:shadow-[0_0_20px_rgba(0,255,209,0.2)]',
    violet: 'hover:border-[hsl(275,100%,69%)] group-hover:text-[hsl(275,100%,69%)] hover:shadow-[0_0_20px_rgba(191,95,255,0.2)]',
    amber: 'hover:border-[hsl(38,100%,59%)] group-hover:text-[hsl(38,100%,59%)] hover:shadow-[0_0_20px_rgba(255,184,48,0.2)]'
  }

  const glowClasses = {
    teal: 'group-hover:shadow-[0_0_25px_rgba(0,255,209,0.3)]',
    violet: 'group-hover:shadow-[0_0_25px_rgba(191,95,255,0.3)]',
    amber: 'group-hover:shadow-[0_0_25px_rgba(255,184,48,0.3)]'
  }

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-4 p-4 rounded-lg border border-border/30 bg-background/30 backdrop-blur transition-all duration-300 ${colorClasses[color]} ${glowClasses[color]} hover:bg-background/50 hover:-translate-y-1`}
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

function StatBlock({ label, value, color, progress }: { label: string; value: number; color: 'teal' | 'violet' | 'amber'; progress: string }) {
  const colorClasses = {
    teal: 'glow-teal bio-progress-teal',
    violet: 'glow-violet bio-progress-violet',
    amber: 'glow-amber bio-progress-amber'
  }

  const [progressColorClass] = colorClasses[color].split(' ')

  return (
    <div className="p-4 rounded-lg border border-border/30 bg-background/20 hover:bg-background/30 transition-all duration-300 hover-glow">
      <span className="data-label">{label}</span>
      <div className={`data-value number-pulse mt-1 ${progressColorClass}`}>
        {value.toLocaleString()}
      </div>
      <div className={`mt-3 bio-progress ${colorClasses[color]}`}>
        <div className="bio-progress-fill" style={{ width: progress }} />
      </div>
    </div>
  )
}
