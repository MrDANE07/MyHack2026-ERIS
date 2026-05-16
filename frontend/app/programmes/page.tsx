'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { ProgrammeCard } from '@/components/ProgrammeCard'
import { VerificationBadge } from '@/components/VerificationBadge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getProgrammes } from '@/lib/api'
import type { Programme, Partner, ServiceProvider } from '@/lib/types'
import { ArrowLeft, Building2, Users, Briefcase } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
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
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Programme Overview
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore accelerator programmes, partners, and service providers in the ecosystem
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="programmes" className="animate-fadeIn stagger-1">
          <TabsList className="mb-6">
            <TabsTrigger value="programmes" className="gap-2">
              <Building2 className="h-4 w-4" />
              Programmes ({programmes.length})
            </TabsTrigger>
            <TabsTrigger value="partners" className="gap-2">
              <Users className="h-4 w-4" />
              Partners ({partners.length})
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Service Providers ({serviceProviders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="programmes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programmes.map((programme, index) => (
                <div
                  key={programme.id}
                  className="animate-fadeIn"
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
                <Card
                  key={partner.id}
                  className="border-border/50 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{partner.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="font-normal">
                            {partner.type}
                          </Badge>
                          <span>{partner.country}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <span className="text-sm text-muted-foreground">Initiatives</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {partner.initiatives.map(initiative => (
                          <Badge key={initiative} variant="outline">
                            {initiative}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceProviders.map((provider, index) => (
                <Card
                  key={provider.id}
                  className="border-border/50 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <VerificationBadge verified={provider.verified} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.services.map(service => (
                        <Badge key={service} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
