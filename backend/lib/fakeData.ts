// Static synthetic seed data (immutable)

export interface Startup {
  id: string
  name: string
  domain: string[]
  stage: number
  needs: string[]
  goals: string[]
  verified: boolean
}

export interface Mentor {
  id: string
  name: string
  expertise: string[]
  preferred_stage: number
  availability: 'Weekly' | 'Bi-Weekly' | 'Monthly'
  verified: boolean
}

export interface Programme {
  id: string
  name: string
  country: string
  focus_areas: string[]
  status: 'Active' | 'Completed' | 'Upcoming'
  cohort_size: number
}

export interface Partner {
  id: string
  name: string
  type: 'Corporate' | 'Government' | 'Academic' | 'NGO'
  initiatives: string[]
  country: string
}

export interface ServiceProvider {
  id: string
  name: string
  services: string[]
  verified: boolean
}

export interface GraphDataPoint {
  week: number
  clarity: number
  uncertainty: number
  engagement: number
}

export const startups: Startup[] = [
  {
    id: 'startup_1',
    name: 'NeuroFlow AI',
    domain: ['AI', 'Healthcare'],
    stage: 2,
    needs: ['Fundraising', 'B2B Sales'],
    goals: ['Product-Market Fit'],
    verified: true
  }
]

export const mentors: Mentor[] = [
  {
    id: 'mentor_1',
    name: 'Sarah Lim',
    expertise: ['Fundraising', 'Enterprise Sales'],
    preferred_stage: 2,
    availability: 'Weekly',
    verified: true
  },
  {
    id: 'mentor_2',
    name: 'David Tan',
    expertise: ['Product Strategy', 'B2B Sales'],
    preferred_stage: 2,
    availability: 'Bi-Weekly',
    verified: true
  }
]

export const programmes: Programme[] = [
  {
    id: 'prog_1',
    name: 'Cradle CIP Accelerate 2026 — Malaysia',
    country: 'Malaysia',
    focus_areas: ['AI', 'Healthcare', 'FinTech'],
    status: 'Active',
    cohort_size: 12
  },
  {
    id: 'prog_2',
    name: 'Cradle GENESIS 2025 — — Singapore',
    country: 'Singapore',
    focus_areas: ['SaaS', 'B2B', 'Enterprise'],
    status: 'Completed',
    cohort_size: 8
  }
]

export const partners: Partner[] = [
  {
    id: 'partner_1',
    name: 'Sunway Group',
    type: 'Corporate',
    initiatives: ['Sunway iLabs Cohort 2026'],
    country: 'Malaysia'
  },
  {
    id: 'partner_2',
    name: 'MDEC',
    type: 'Government',
    initiatives: ['MyDIGITAL Accelerator'],
    country: 'Malaysia'
  }
]

export const serviceProviders: ServiceProvider[] = [
  {
    id: 'sp_1',
    name: 'LegalEase MY',
    services: ['Company Incorporation', 'IP Filing'],
    verified: true
  },
  {
    id: 'sp_2',
    name: 'CloudScale Asia',
    services: ['Cloud Infrastructure', 'DevOps'],
    verified: true
  }
]

export const seededRelationshipHistory: GraphDataPoint[] = [
  { week: 1, clarity: 3, uncertainty: 9, engagement: 5 },
  { week: 2, clarity: 5, uncertainty: 7, engagement: 6 }
]
