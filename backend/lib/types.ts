// Shared TypeScript interfaces (source of truth)
// Frontend copy is in frontend/lib/types.ts

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

export interface Relationship {
  relationship_id: string
  startup_id: string
  mentor_id: string
  compatibility_score: number
  status: 'Created' | 'Active' | 'Completed' | 'Failed'
  created_at: string
}

export interface Interaction {
  interaction_id: string
  relationship_id: string
  summary: string
  clarity: number
  uncertainty: number
  engagement: number
  friction_level: number
  expectation_mismatch: number
  alignment_speed: number
  ambiguity_tolerance: number
  created_at: string
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

export interface CompanyProgramme {
  assignment_id: string
  startup_id: string
  programme_id: string
  assigned_at: string
  status: 'Active' | 'Completed' | 'Withdrawn'
}

export interface GraphDataPoint {
  week: number
  clarity: number
  uncertainty: number
  engagement: number
}

export interface EcosystemStats {
  total_relationships: number
  active_relationships: number
  total_interactions: number
  top_mentor_domains: string[]
  totalMentors: number
  totalStartups: number
  programmes: number
}
