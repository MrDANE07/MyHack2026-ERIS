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
import { ArrowLeft, Building2, Users, Briefcase, Globe, Sparkles, Zap, Activity } from 'lucide-react'

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
        <div className="mb-12 animate-fade-in">
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

        {/* Stats Cards Row - matching dashboard style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 hover-glow animate-fade-in delay-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Building2 className="h-6 w-6 text-primary" />
                <div className="absolute inset-0 bg-primary/30 blur-lg" />
              </div>
              <span className="data-label">Active Programmes</span>
            </div>
            <div className="data-value number-pulse glow-teal">{programmes.length}</div>
            <div className="mt-3 bio-progress bio-progress-teal">
              <div className="bio-progress-fill" style={{ width: '85%' }} />
            </div>
          </div>

          <div className="glass-card p-6 hover-glow animate-fade-in delay-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Users className="h-6 w-6 text-secondary" />
                <div className="absolute inset-0 bg-secondary/30 blur-lg" />
              </div>
              <span className="data-label">Strategic Partners</span>
            </div>
            <div className="data-value number-pulse glow-violet">{partners.length}</div>
            <div className="mt-3 bio-progress bio-progress-violet">
              <div className="bio-progress-fill" style={{ width: '70%' }} />
            </div>
          </div>

          <div className="glass-card p-6 hover-glow animate-fade-in delay-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Briefcase className="h-6 w-6 text-accent" />
                <div className="absolute inset-0 bg-accent/30 blur-lg" />
              </div>
              <span className="data-label">Service Providers</span>
            </div>
            <div className="data-value number-pulse glow-amber">{serviceProviders.length}</div>
            <div className="mt-3 bio-progress bio-progress-amber">
              <div className="bio-progress-fill" style={{ width: '60%' }} />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="glass-card p-6 animate-fade-in delay-400">
          <Tabs defaultValue="programmes">
            <TabsList className="mb-6 bg-background/30 border border-border/30 p-1 h-auto">
              <TabsTrigger 
                value="programmes" 
                className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_20px_rgba(0,255,209,0.3)] transition-all font-mono uppercase tracking-wider text-xs"
              >
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Programmes</span>
                <Badge variant="secondary" className="ml-1 bg-primary/10 text-primary border-primary/30 font-mono">
                  {programmes.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="partners" 
                className="gap-2 data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary data-[state=active]:shadow-[0_0_20px_rgba(191,95,255,0.3)] transition-all font-mono uppercase tracking-wider text-xs"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Partners</span>
                <Badge variant="secondary" className="ml-1 bg-secondary/10 text-secondary border-secondary/30 font-mono">
                  {partners.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="gap-2 data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:shadow-[0_0_20px_rgba(255,184,48,0.3)] transition-all font-mono uppercase tracking-wider text-xs"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Services</span>
                <Badge variant="secondary" className="ml-1 bg-accent/10 text-accent border-accent/30 font-mono">
                  {serviceProviders.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="programmes" className="space-y-4">
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

            <TabsContent value="partners" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partners.map((partner, index) => (
                  <div
                    key={partner.id}
                    className="glass-card p-6 animate-fade-in group hover:border-secondary/50 transition-all duration-300 hover-glow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {/* Avatar with gradient - matching dashboard style */}
                        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center border border-secondary/30 group-hover:shadow-[0_0_25px_rgba(191,95,255,0.4)] transition-all duration-300">
                          <Users className="h-6 w-6 text-secondary" />
                          <div className="absolute inset-0 bg-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-secondary transition-colors">
                            {partner.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                            <span className="bio-dot bio-dot-violet" />
                            <span className="uppercase tracking-wider text-xs">{partner.type}</span>
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
                            className="bg-secondary/5 border-secondary/30 text-secondary/90 hover:bg-secondary/15 hover:border-secondary/50 transition-all duration-300 font-mono text-xs"
                          >
                            {initiative}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceProviders.map((provider, index) => (
                  <div
                    key={provider.id}
                    className="glass-card p-6 animate-fade-in group hover:border-accent/50 transition-all duration-300 hover-glow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar with gradient - matching dashboard style */}
                        <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center border border-accent/30 group-hover:shadow-[0_0_20px_rgba(255,184,48,0.4)] transition-all duration-300">
                          <Sparkles className="h-5 w-5 text-accent" />
                          <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
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
                          className="bg-accent/5 border border-accent/30 text-accent/90 hover:bg-accent/15 hover:border-accent/50 transition-all duration-300 font-mono text-xs"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-8 glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in delay-500">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 bg-primary/30 blur-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Ready to find your perfect mentor?</h3>
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
